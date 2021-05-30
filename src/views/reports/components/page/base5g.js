import ReportForm from './reportForm/index.vue'
import { fetchList, fetchTemplate, reportTask } from '@/api/report/file' // reportTask
import { DataSourceView, DataFileView, DataFilterView, GroupFilterView } from '../index'
import moment from 'moment-timezone'
import { uuid } from '@/utils/uuid'
export default {
  components: {
    DataSourceView,
    DataFileView,
    DataFilterView,
    GroupFilterView,
    ReportForm
  },
  props: {
    tasks: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      loading: true,
      activeName: '',
      display: false,
      saveFromData: null,
      // report form
      reportForm: {
        name: this.tasks.name + ' ' + moment(new Date().getTime()).format('YYYY-MM-DD'),
        sources: {},
        task: {
          consts: {},
          data: {},
          type: 0
        }
      },
      physicsSplit: false,
      scenes: [],
      // send to listView
      sourceGroupId: [],
      activeNames: ['1', '2', '3', '4']
    }
  },
  created() {
    this.initSchene(this.tasks.type)
    this.reportForm.task.type = this.tasks.type // 表单
  },
  methods: {
    // 初始化场景
    initSchene(type) {
      fetchTemplate(type).then(res => {
        if (res.data.code === 1) {
          const data = res.data.data

          if (data.hasOwnProperty('scenes')) {
            // data.scenes.physicsSplit = true
            // 这里有一个逻辑， physicsSplit 下是true才做物理分割
            this.physicsSplit = data.scenes.physicsSplit === true
            if (data.scenes.physicsSplit === true) {
              data.scenes.scene.forEach((item) => {
                item.itemName = uuid()
                this.scenes.push(item)
              })
              this.activeName = this.scenes[0].itemName

              return
            }
          }

          // 单场景默认
          this.scenes.push({ name: 'SJDL_DEFAULT_TEMPLATE', itemName: uuid() })
          this.activeName = this.scenes[0].itemName
        }
      }).finally(() => {
        this.loading = false
      })
      console.log(this.scenes)
    },
    /**
     * 折叠面板
     */
    handleChange(val) {
      console.log(val)
    },
    // 接收数据源
    waitSourceNotify(list) {
      console.log('receive sources:', list)

      const sourceListVos = []
      if (list.length > 0) {
        list.forEach(item => {
          // 有效数据
          if (item.groupIds.length > 0) {
            const row = Object.assign({}, item)
            const groups = []
            row.groupIds.forEach(el => {
              groups.push(el[el.length - 1])
            })
            row['groupIds'] = groups
            sourceListVos.push(row)
            console.log(sourceListVos)
            this.reportForm.sources = Object.assign([], sourceListVos) // 数据源
            // 获取列表数据
            if (sourceListVos.length > 0) {
              fetchList(sourceListVos).then(res => {
                this.sourceGroupId = res.data.data
              })
              // this.$refs.fileView.getList(sourceListVos)
            }
          } else {
            this.$notify.error({
              title: this.$t('common.error'),
              message: this.$t('common.nodata'),
              duration: 2000
            })
          }
        })
      }
    },
    // 提交报表
    onSubmitReportTask() {
      var formData = JSON.parse(JSON.stringify(this.reportForm))
      // 校验名称
      var scenesForm = Object.assign([], this.$refs.ReportForm)
      var arr = []
      scenesForm.forEach((item, idx) => {
        arr.push(idx)
        if (item.scene.dataSourceType === 'SJDL_DEFAULT_DATABASE') {
          item.$refs.ruleForm.validate((valid) => {
            if (valid) {
              formData.task.consts = item.ruleForm
              formData.sources[item.scene.name] = []
              formData.task.data[item.scene.name] = {}
            } else {
              this.$notify({
                title: this.$t('common.error'),
                message: this.$t('reportList.noPara'),
                type: 'warning',
                duration: 2000
              })
              return false
            }
          })
        } else {
          formData.sources[item.scene.name] = item.sourcesForm
          formData.task.data[item.scene.name] = item.dataForm
        }
        if (arr.length === scenesForm.length) {
          this.onSubmit(formData)
        }
      })
    },
    onSubmit(formData) {
      this.saveFromData = formData
      this.$refs.ReportForm.forEach(reportFrom => {
        reportFrom.closeAllTags()
      })
      reportTask(formData).then(res => {
        if (res.data.code === 1) {
          this.$confirm(this.$t('common.submitSuccess'), this.$t('common.tip'), {
            confirmButtonText: this.$t('common.confirm'),
            cancelButtonText: this.$t('report.repeatSubmit'),
            type: 'success'
          }).then(() => {
            this.closeReport()
          }).catch(() => {
            this.repeatSubmit()
          })
        }
      })
    },
    closeReport() {
      this.$emit('submit-success', true)
    },
    repeatSubmit() {
      this.onSubmit(this.saveFromData)
    }
  }
}
