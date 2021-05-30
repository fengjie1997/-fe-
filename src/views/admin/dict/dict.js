import { fetchList, create, update, deleteOne, clearDict, fetchDetail } from '@/api/admin/dict'
import waves from '@/directive/waves'
import i18n from '../../../lang'
import Pagination from '@/components/Pagination'
export default {
  name: 'Tabledict',
  components: { Pagination },
  directives: { waves },
  data() {
    return {
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        search: undefined,
        field: 'id',
        isAsc: 1
      },
      tip: i18n.t('taskPlan.title.tip'),
      fieldOptions: [{ label: 'ID', key: 'id' }],
      isAscOptions: [{ label: this.$t('common.asc'), key: 1 }, { label: this.$t('common.desc'), key: 0 }],
      temp: {
        id: '',
        name: '',
        code: '',
        sort: '',
        subDicts: []
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: this.$t('common.edit'),
        create: this.$t('common.create')
      },
      downloadLoading: false
    }
  },
  created() {
    this.getList()
    console.log(this.tip)
  },
  methods: {
    getList() {
      this.listLoading = true
      fetchList(this.listQuery).then(response => {
        this.list = response.data.data.records
        this.total = response.data.data.total
        // 数据读取完毕
        this.listLoading = false
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    resetTemp() {
      this.temp = {
        id: '',
        name: '',
        code: '',
        sort: '',
        subDicts: [{ name: '', code: '', sort: '', tip: '' }]
      }
    },
    handleElementDelete(itemIndex) {
      this.temp.subDicts.splice(itemIndex, 1)
    },
    handleElementAdd(itemIndex) {
      this.temp.subDicts.splice(itemIndex + 1, 0, { name: '', code: '', sort: '', tip: '' })
    },
    /**
     * 清理缓存
     */
    handleClearCache() {
      clearDict().then(res => {
        if (res.data.code === 1) {
          this.$notify({
            title: this.$t('common.success'),
            message: this.$t('common.updateSuccess'),
            type: 'success',
            duration: 2000
          })
        }
      })
    },
    handleCreate() {
      this.resetTemp()
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
      fetchDetail(row.id).then(response => {
        if (response.data.code === 1) {
          this.temp = Object.assign({}, response.data.data) // copy obj
          this.dialogStatus = 'update'
          this.dialogFormVisible = true
          this.$nextTick(() => {
            this.$refs['dataForm'].clearValidate()
          })
        }
      })
      this.dialogFormVisible = false
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
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
    }
  }
}
