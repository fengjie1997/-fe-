import { resetTemp } from '@/utils'
import waves from '@/directive/waves'
import Pagination from '@/components/Pagination'
import FleetCardTable from '@/components/FleetCardTable'
import { handleSearch } from '@/utils/jsonTreeUtil'
import { create, fetchGroupAndTopList, update, deleteOne } from '@/api/system/group'
import store from '@/store/index'
export default {
  name: 'TableGroup',
  components: { Pagination, FleetCardTable },
  directives: { waves },
  data() {
    return {
      isShowBtn: true,
      groupData: [],
      listQuery: {
        condition: ''
      },
      listLoading: true,
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: this.$t('common.edit'),
        create: this.$t('common.create')
      },

      filterFieldList: [
        { label: this.$t('group.name'), type: 'input', value: 'condition', width: '200px' }
      ],

      temp: {
        id: '',
        name: '',
        parentId: '',
        description: '',
        rank: ''
      }
    }
  },
  created() {
    this.getList()
    this.ifShowBtn()
  },
  methods: {
    /** 搜索 */
    handleFilter(row) {
      const search = row.condition
      if (search == null || typeof search === 'undefined' || search.trim() === '') {
        this.getList()
        return
      }
      if (this.tmpList) {
        const tmp = JSON.parse(JSON.stringify(this.tmpList))
        handleSearch(tmp, search)
        this.groupData = tmp
        return
      }
      this.groupData = []
    },
    ifShowBtn() {
      if (store.getters.isAdmin === true) {
        this.isShowBtn = true
      }
    },
    /**
     * 有disabled的时候，将子的添加disabled
     * 是children的，标识为children
     */
    eachAssignDisabled(row) {
      if (row.children !== undefined && row.children instanceof Array) {
        row.children.forEach(child => {
          child.pageChild = true
          if (row.disabled === true) {
            child.disabled = true
          }
        })
      }

      return row.disabled === true
    },
    async getList() {
      this.listLoading = true
      fetchGroupAndTopList().then(response => {
        const res = response.data
        if (res.code === 1) {
          this.isShowBtn = res.data.allowTop
          this.groupData = res.data.data
          this.tmpList = JSON.parse(JSON.stringify(this.groupData))
        }
      }).finally(() => {
        this.listLoading = false
        return true
      })
    },
    copyTemp(data) {
      this.temp.id = data.id
      this.temp.name = data.name
      this.temp.description = data.description
      this.temp.parentId = data.parentId
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
              this.$notify({
                title: this.$t('common.success'),
                message: this.$t('common.createSuccess'),
                type: 'success',
                duration: 2000
              })
            }
          })
          this.dialogFormVisible = false
        }
      })
    },
    handleUpdate(row) {
      this.copyTemp(row) // copy obj
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs.dataForm.clearValidate()
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
      this.$confirm(this.$t('common.deleteClearTip'), this.$t('common.tip'), {
        confirmButtonText: this.$t('common.confirm'),
        cancelButtonText: this.$t('common.cancel'),
        type: 'warning',
        center: false
      }).then(() => {
        if (row.id !== '') {
          deleteOne(row.id).then(response => {
            if (response.data.code === 1) {
              this.$notify({
                title: this.$t('common.success'),
                message: this.$t('common.deleteSuccess'),
                type: 'success',
                duration: 2000
              })
              this.getList()
            }
          })
        }
      })
    }
  }
}
