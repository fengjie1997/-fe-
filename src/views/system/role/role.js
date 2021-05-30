import { checkNodeEquals, resetTemp } from '@/utils'
import {
  roleCell,
  roleArea,
  addCellPower,
  addAreaPower,
  cellTree,
  areaTree,
  addRoleMenu,
  create,
  deleteOne,
  fetchList,
  fetchMenuByRoleId,
  fetchMenuTreeByRoleId,
  update,
  fetchGroupTreeByRoleId,
  addRoleGroup,
  fetchGroupByRoleId
} from '@/api/system/role'
import waves from '@/directive/waves'
import store from '@/store/index'
import { copy } from 'copy-anything'
import Pagination from '@/components/Pagination'
import { handleSearch } from '@/utils/jsonTreeUtil'
import FleetCardTable from '@/components/FleetCardTable'
export default {
  name: 'Tablerole',
  components: {
    Pagination,
    FleetCardTable
  },
  directives: {
    waves
  },
  computed: {
    language() {
      return this.$store.getters.language
    }
  },
  data() {
    return {

      filterFieldList: [
        { label: this.$t('role.name'), type: 'input', value: 'search', width: '200px' }
      ],

      rules: {
        name: [
          { required: true, message: this.$t('role.tips.roleNameIsRequired'), trigger: 'blur' },
          {
            trigger: 'blur',
            validator: (rule, value, callback) => {
              // 内容不能为空（内容只包含空格时为空）
              if (!/([^\s])/.test(value)) {
                callback(new Error(this.$t('role.tips.roleNameIsRequired')))
              } else {
                callback()
              }
            }
          }
        ]
      },
      isShowMenu: null,
      isShowProjects: true,
      isShowCell: true,
      isShowArea: true,
      newArr: [],
      cellData: null,
      cellDataTrue: ['上海市', '深圳市'],
      areaData: null,
      areaDataTrue: [],
      isShowBtn: null,
      list: [],
      tmpList: [],
      search: undefined,
      listLoading: true,
      listQuery: {
        search: undefined
      },
      fieldOptions: [{
        label: 'ID',
        key: 'id'
      }],
      isAscOptions: [{
        label: this.$t('common.asc'),
        key: 1
      }, {
        label: this.$t('common.desc'),
        key: 0
      }],
      temp: {
        id: '',
        name: '',
        description: '',
        company: '',
        department: '',
        deptLevel: '',
        roleLevel: '',
        parentId: 0
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: this.$t('common.edit'),
        create: this.$t('common.create'),
        assign: this.$t('common.assignPem')
      },
      downloadLoading: false,
      dialogAssignFormVisible: false,
      menuData: [],
      defaultProps: {
        children: 'children',
        label: 'id'
      },
      defaultPropsCell: {
        children: 'children',
        label: 'city'
      },
      menuFilterText: '',
      operateRoleId: undefined,
      /**
       * 组
       */
      groupData: []
    }
  },
  created() {
    this.getPower()
    this.getList()
    this.getAssignButtonPerm()
  },
  watch: {
    /**
     * 编辑框触发过滤方法
     */
    menuFilterText(val) {
      this.$refs.menuTree.filter(val)
    }
  },
  methods: {
    /** 搜索 */
    handleFilter(row) {
      const search = row.search
      if (search == null || typeof search === 'undefined' || search.trim() === '') {
        this.getList()
        return
      }
      if (this.tmpList) {
        const tmp = JSON.parse(JSON.stringify(this.tmpList))
        handleSearch(tmp, search)
        this.list = tmp
        return
      }
      this.list = []
    },
    /** 重置 */
    handleReset(row) {
      console.log(row)
    },
    /** 刷新左侧菜单 */
    handleRefresh() {
      console.log('Refresh')
    },
    filterNode(value, data) {
      if (!value) return true
      return checkNodeEquals(data, value)
    },
    getAssignButtonPerm() {
      const isAdmin = store.getters.isAdmin
      const buttons = store.getters.buttonPerms
      this.isShowMenu = isAdmin || buttons.includes('/role/assign/menu')
      this.isShowCell = isAdmin || buttons.includes('/role/assign/cell')
      this.isShowArea = isAdmin || buttons.includes('/role/assign/area')
      this.isShowProjects = isAdmin || buttons.includes('/role/assign/projects')
    },
    removeDuplicates(arr) {
      this.newArr = []
      var temp = {}; var r = []
      for (var i in arr) { temp[arr[i]] = true }
      for (var k in temp) { r.push(k) }
      r.map(item => {
        this.newArr.push({ province: item, citys: [] })
      })
    },
    getTree() {
      if (this.isShowCell === true) {
        cellTree(this.operateRoleId).then(res => {
          console.log(res)
          this.cellData = res.data.data
          var index = 1
          this.cellData.map(item => {
            item.city = index += 1
          })
          console.log(this.cellData)
          console.log(this.cellDataTrue)
        })
      }
      if (this.isShowArea === true) {
        areaTree(this.operateRoleId).then(res => {
          console.log(res)
          this.areaData = res.data.data
        })
        roleArea(this.operateRoleId).then(res => {
          this.areaDataTrue = res.data.data
        })
      }
    },
    getPower() {
      if (store.getters.isAdmin === true) {
        this.isShowBtn = true
      } else {
        this.isShowBtn = false
      }
    },
    getList() {
      this.listLoading = true
      console.log(this.listQuery)
      fetchList(this.listQuery).then(response => {
        this.list = response.data.data
        this.tmpList = copy(this.list)
        // 数据读取完毕
        this.listLoading = false
      })
    },
    handleCreate(pid) {
      resetTemp(this.temp)
      this.temp.parentId = pid
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          create(this.temp).then(response => {
            if (response.data.code === 1) {
              this.getList()
              this.dialogFormVisible = false
              this.$notify({
                title: this.$t('common.success'),
                message: this.$t('common.createSuccess'),
                type: 'success',
                duration: 2000
              })
            }
          })
        }
      })
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          update(this.temp.id, this.temp).then(response => {
            if (response.data.code === 1) {
              this.getList()
              this.dialogFormVisible = false
              this.$notify({
                title: this.$t('common.success'),
                message: this.$t('common.updateSuccess'),
                type: 'success',
                duration: 2000
              })
            }
          })
        }
      })
    },
    handleDelete(row) {
      this.downloadLoading = true
      this.$confirm(this.$t('common.deleteTip'), this.$t('common.tip'), {
        confirmButtonText: this.$t('common.confirm'),
        cancelButtonText: this.$t('common.cancel'),
        type: 'warning',
        center: false
      }).then(() => {
        if (row.id !== '') {
          deleteOne(row.id).then(response => {
            if (response.data.code === 1) {
              this.getList()
              this.$notify({
                title: this.$t('common.success'),
                message: this.$t('common.deleteSuccess'),
                type: 'success',
                duration: 2000
              })
            }
          })
        }
      })
      this.downloadLoading = false
    },
    currentChange(data, disabled) {
      console.log(data, disabled)
      if (data.children !== undefined) {
        data.children.forEach(element => {
          this.addDisabled(element, disabled)
        })
      }
    },

    /**
     * 遍历，给自己以及子添加 disabled
     * @param {*} data 数据
     * @param {boolean} disabled 是否禁止
     */
    addDisabled(data, disabled) {
      if (data.id !== -1) {
        this.$set(data, 'disabled', disabled)
      }
      if (data.children !== undefined) {
        data.children.forEach(element => {
          this.addDisabled(element, disabled)
        })
      }
    },

    /**
     * 权限分配
     */
    handleAssign(row) {
      this.cellDataTrue = []
      this.menuFilterText = ''
      this.dialogStatus = 'assign'
      this.dialogAssignFormVisible = true
      this.operateRoleId = row.id
      if (this.isShowCell === true) {
        roleCell(this.operateRoleId).then(res => {
          res.data.data.map(item => {
            item.children.map(item2 => {
              this.cellDataTrue.push(item2)
            })
          })
          this.getTree()
        })
      }
      this.getGroupList(row.id)
      if (this.isShowMenu === true) {
        fetchMenuTreeByRoleId(row.id).then(response => {
          if (response.data.code === 1) {
            this.menuData = response.data.data
            console.log(this.menuData, 'menuData')
            // 后面合成一个接口
            fetchMenuByRoleId(row.id).then(response => {
              if (response.data.code === 1) {
                // 设置菜单id
                // 需要清空选中
                this.$refs.menuTree.setCheckedKeys([])
                this.$refs.menuTree.setCheckedKeys(response.data.data)
              }
            })
            fetchGroupByRoleId(row.id).then(response => {
              if (response.data.code === 1) {
                // 设置菜单id
                this.$refs.projectGroupTree.setCheckedKeys([])
                this.$refs.projectGroupTree.setCheckedKeys(response.data.data)
              }
            })
          }
        })
      }
    },
    assignMenu() {
      if (this.$refs.cellTree !== undefined) {
        const newarr = this.$refs.cellTree.getCheckedNodes().map(item => {
          return item.province
        })
        this.removeDuplicates(newarr)
        this.$refs.cellTree.getCheckedNodes().map(item => {
          if (!item.hasOwnProperty('children')) {
            this.newArr.map(item2 => {
              if (item.province === item2.province) {
                item2.citys.push(item.city)
              }
            })
          }
        })

        const promiseArr = []
        promiseArr.push(addCellPower(this.operateRoleId, this.newArr))

        // this.newArr = newarr
        if (this.$refs.areaTree !== undefined) {
          promiseArr.push(addAreaPower(this.operateRoleId, this.$refs.areaTree.getCheckedKeys().concat(this.$refs.areaTree.getHalfCheckedKeys())))
        }
        if (this.$refs.menuTree !== undefined) {
          promiseArr.push(addRoleMenu(this.operateRoleId, this.$refs.menuTree.getCheckedKeys().concat(this.$refs.menuTree.getHalfCheckedKeys())))
        }
        if (this.$refs.projectGroupTree !== undefined) {
          promiseArr.push(addRoleGroup(this.operateRoleId, this.$refs.projectGroupTree.getCheckedKeys().concat(this.$refs.projectGroupTree.getHalfCheckedKeys())))
        }

        Promise.all(promiseArr).then((resArr) => {
          let count = 0

          resArr.forEach(res => {
            if (res.data.code === 0) {
              this.$notify.error({
                title: this.$t('common.error'),
                message: this.$t('common.updateFailed'),
                duration: 2000
              })
            } else {
              count++
            }
          })

          if (count === resArr.length) {
            this.$notify({
              title: this.$t('common.success'),
              message: this.$t('common.updateSuccess'),
              type: 'success',
              duration: 2000
            })
          }
        })

        this.dialogAssignFormVisible = false
      }
    },
    getGroupList(id) {
      if (this.isShowProjects === true) {
        fetchGroupTreeByRoleId(id).then(response => {
          if (response.data.code === 1) {
            this.groupData = response.data.data
          }
        })
      }
    }
  }
}
