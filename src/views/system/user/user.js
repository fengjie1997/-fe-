import {
  fetchList,
  create,
  update,
  deleteOne,
  freeze,
  unfreeze,
  updateRole,
  updatePassword
} from '@/api/system/user'
import waves from '@/directive/waves'
import Pagination from '@/components/Pagination'
import FleetCardTable from '@/components/FleetCardTable'
import {
  resetTemp
} from '@/utils'
import {
  fetchList as fetchRoleList
} from '@/api/system/role'
import { getCacheDict } from '@/utils/dictCache'

export default {
  name: 'TableUser',
  components: {
    Pagination,
    FleetCardTable
  },
  directives: {
    waves
  },
  data() {
    return {

      filterFieldList: [
        { label: this.$t('user.account'), type: 'input', value: 'account', width: '150px' },
        { label: this.$t('user.name'), type: 'input', value: 'name', width: '150px' }
      ],

      treeProps: {
        children: 'children',
        label: 'name',
        value: 'id'
      },
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        account: undefined,
        name: undefined,
        field: 'id',
        isAsc: 1
      },
      filterDefaultData: {
        page: 1,
        limit: 20,
        account: '',
        name: '',
        field: 'id',
        isAsc: 1
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
        account: '',
        password: '',
        email: '',
        phone: '',
        roleName: this.$t('common.select'),
        timezone: this.$store.getters.timezone,
        name: '',
        company: '',
        passwordTow: ''
      },
      createRoleVisible: false,
      timezoneDict: getCacheDict('timeZone'),
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: this.$t('common.edit'),
        create: this.$t('common.create')
      },
      downloadLoading: false,
      /**
       * 重置密码
       */
      restPwdFormVisible: false,
      tempPwdData: {
        userId: undefined,
        tempPwd: '',
        restPwd: ''
      },
      /**
       * 分配角色
       */
      TreeProps: {
        label: 'name',
        children: 'children'
      },
      roleSelectData: [],
      assignRoleFormVisible: false,
      assignRoleData: {
        userId: undefined,
        roleId: undefined,
        roleName: undefined
      },
      resetRules: {
        tempPwd: [{ required: true, message: this.$t('common.inputPassword'), trigger: 'blur' }, { min: 6, message: this.$t('common.minPassword'), trigger: 'blur' }],
        restPwd: [{ required: true, message: this.$t('common.inputRestPassword'), trigger: 'blur' }, {
          validator: (rule, value, callback) => {
            if (value === '') {
              callback(new Error(this.$t('common.confirmPassword')))
            } else if (value !== this.tempPwdData.tempPwd) {
              callback(new Error(this.$t('common.errPassword')))
            } else {
              callback()
            }
          }, trigger: 'blur'
        }]
      },
      rules: {
        account: [{ required: true, message: this.$t('common.inputAccount'), trigger: 'blur' }],
        password: [{ required: true, message: this.$t('common.inputPassword'), trigger: 'blur' }, { min: 6, message: this.$t('common.minPassword'), trigger: 'blur' }],
        passwordTow: [{ required: true, message: this.$t('common.confirmPassword'), trigger: 'blur' },
          {
            validator: (rule, value, callback) => {
              if (value === '') {
                callback(new Error(this.$t('common.confirmPassword')))
              } else if (value !== this.temp.password) {
                callback(new Error(this.$t('common.errPassword')))
              } else {
                callback()
              }
            }, trigger: 'blur'
          }]
      }
    }
  },
  watch: {
    'temp.passwordTow': {
      handler: function() {
        if (this.temp.password !== this.temp.passwordTow) {
          console.log('women buyiyang')
        }
      }
    }
  },
  created() {
    this.getList()
  },
  computed: {
    roleTree() {
      return this.$store.getters.roleTree
    }
  },
  methods: {
    /** 搜索 */
    handleFilter(row) {
      this.listQuery = { ...this.listQuery, ...row }
      this.getList()
    },
    /** 树选中 */
    handleNodeClick(data) {
      this.listQuery.roleId = data.id
      this.getList()
    },
    /** 刷新左侧菜单 */
    handleRefresh() {
      this.$store.dispatch('refreshRoleTree')
      this.listQuery.roleId = undefined
      this.getList()
    },
    handleSelectRole() {
      const data = this.$refs.roleSelectView.getCurrentNode()
      if (data == null) return
      this.temp.roleName = data.name
      this.temp.roleId = data.id
      this.createRoleVisible = false
    },
    comparedPassword() {
      if (this.temp.password !== this.temp.passwordTow) {
        this.$notify.error({
          title: this.$t('common.error'),
          message: this.$t('common.errPassword')
        })
      }
    },
    getList() {
      this.listLoading = true
      this.list = []
      fetchList(this.listQuery).then(response => {
        if (response.data.code === 1) {
          this.list = response.data.data.records
          this.total = response.data.data.total
        }
      }).finally(() => {
        this.listLoading = false
      })
    },
    async fetchRoleTree() {
      fetchRoleList().then(res => {
        if (res.data.code === 1) {
          this.roleSelectData = res.data.data
        }
      })
    },
    handleCreate() {
      resetTemp(this.temp)
      this.fetchRoleTree()
      this.temp.timezone = this.$store.getters.timezone
      this.dialogStatus = 'create'
      this.temp.roleName = this.$t('common.select')
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['temp'].clearValidate()
      })
    },
    createData() {
      this.$refs['temp'].validate((valid) => {
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
        } else {
          this.$alert(this.$t('common.errParams'), this.$t('common.tip'), {
            confirmButtonText: this.$t('common.confirm'),
            callback: action => {
            }
          })
        }
      })
    },
    handleUpdate(row) {
      this.fetchRoleTree()
      this.temp = Object.assign({}, row) // copy obj
      if (this.temp.roleId === undefined || this.temp.roleId === null) {
        this.temp.roleName = this.$t('common.select')
      }
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['temp'].clearValidate()
      })
    },
    updateData() {
      this.$refs['temp'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          update(tempData.id, tempData).then(response => {
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
      this.downloadLoading = false
    },
    handleSwitch(status, id) {
      if (status === '0' || status === false) {
        unfreeze(id).then(response => {
          if (response.data.code === 1) {
            this.$notify({
              title: this.$t('common.success'),
              message: this.$t('common.updateSuccess'),
              type: 'success',
              duration: 2000
            })
          }
          this.getList()
        })
      } else {
        freeze(id).then(response => {
          if (response.data.code === 1) {
            this.$notify({
              title: this.$t('common.success'),
              message: this.$t('common.updateSuccess'),
              type: 'success',
              duration: 2000
            })
          }
          this.getList()
        })
      }
    },
    /**
     * 分配密码
     */
    handleRestPwd(userId) {
      resetTemp(this.tempPwdData)
      this.tempPwdData.userId = userId
      this.restPwdFormVisible = true
    },
    restPassword() {
      this.$refs['tempPwdData'].validate((valid) => {
        if (valid) {
          if (this.tempPwdData.tempPwd !== undefined && this.tempPwdData.tempPwd === this.tempPwdData.restPwd) {
            // 提交重置密码请求
            // 规则限定，不能为空以及长度限制，数据校验部分应当有统一的规则，方便复用
            updatePassword(this.tempPwdData.userId, this.tempPwdData.restPwd).then(res => {
              if (res.data.code === 1) {
                this.$notify({
                  title: this.$t('common.success'),
                  message: this.$t('common.updateSuccess'),
                  type: 'success',
                  duration: 2000
                })
              }
            })
          } else {
            alert(this.$t('common.errPassword'))
          }
          this.restPwdFormVisible = false
        } else {
          this.$confirm(this.$t('common.deleteTip'), this.$t('common.tip'), {
            confirmButtonText: this.$t('common.confirm'),
            cancelButtonText: this.$t('common.cancel'),
            callback: action => {
            }
          })
        }
      })
    },
    /**
     * 分配角色
     */
    handleAssignRole(data) {
      console.log(data)
      this.assignRoleData.userId = data.id
      this.assignRoleData.roleName = data.roleName
      this.assignRoleData.roleId = data.roleId
      fetchRoleList().then(res => {
        if (res.data.code === 1) {
          this.roleSelectData = res.data.data
          this.assignRoleFormVisible = true
        }
      })
    },
    assignRole() {
      updateRole(this.assignRoleData.userId, this.assignRoleData.roleId).then(res => {
        if (res.data.code === 1) {
          this.getList()
          this.$notify({
            title: this.$t('common.success'),
            message: this.$t('common.updateSuccess'),
            type: 'success',
            duration: 2000
          })
        }
      })
      this.assignRoleFormVisible = false
    },
    handleRoleTreeNodeClick(data) {
      this.assignRoleData.roleId = data.id
      this.assignRoleData.roleName = data.name
    },
    closeTempDialog() {
      this.$refs['temp'].resetFields()
    },
    closeTempPwdDataDialog() {
      this.$refs['tempPwdData'].resetFields()
    }
  }
}
