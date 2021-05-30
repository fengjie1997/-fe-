<template>
  <div class="task-form-box">
    <!--    <el-col :span="24">-->
    <!--      <el-divider>{{ $t('taskPlan.title.randomDurationSetting') }}</el-divider>-->
    <!--    </el-col>-->
    <div class="filter-container">
      <el-form ref="useRandomTimeDial" :inline="true" :model="useRandomTimeDial" class="demo-form-inline">
        <el-col :span="8">
          <el-form-item :label="$t('taskPlan.label.testDurationSegmentationSettings')" style="margin-left: 55px;">
            <el-switch v-model="useRandomTimeDial.isAvailable" @change="isChange()" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="$t('taskPlan.label.maximumDuration')">
            <el-input-number v-model="useRandomTimeDial.maxDuration" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="$t('taskPlan.label.minimumDuration')">
            <el-input-number v-model="useRandomTimeDial.minDuration" />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item
            v-for="domain in useRandomTimeDial.randomTimeSection.sectionInfo"
            :key="domain.key"
            label="timeRange"
            style="margin-left: 62px;margin-top: 10px;"
          >
            <el-input v-model.number="domain.minDuration" style="width: 164px;" :disabled="state" /> ~ <el-input v-model.number="domain.maxDuration" style="width: 164px;margin-right: 42px;" :disabled="state" />
            count
            <el-input-number v-model="domain.count" style="margin-right: 20px" :disabled="state" />
            <el-button type="primary" :disabled="state" @click="addDomain">{{ $t('common.add') }}</el-button>
            <el-button type="danger" :disabled="state" @click.prevent="removeDomain(domain)">{{ $t('common.delete') }}</el-button>
          </el-form-item>
        </el-col>
        <!--        <el-col :span="8">-->
        <!--          <el-form-item>-->
        <!--            <el-button type="primary" @click="addDomain">{{ $t('common.add') }}</el-button>-->
        <!--          </el-form-item>-->
        <!--        </el-col>-->
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  name: 'RandomTimeSection',
  components: { },
  props: {
    list: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      state: false,
      useRandomTimeDial: {
        isAvailable: true,
        maxDuration: 0,
        minDuration: 0,
        randomTimeSection: {
          isAvailable: true,
          sectionInfo: [
            {
              count: 0,
              maxDuration: 0,
              minDuration: 0
            }
          ]
        }
      }
    }
  },
  watch: {
    list: {
      handler(newData, oldData) {
        console.log(newData)
        console.log(oldData)
        this.useRandomTimeDial = this.list.useRandomTimeDial
        this.state = !this.useRandomTimeDial.isAvailable
        // console.log(this.useRandomTimeDial)
      },
      deep: true,
      immediate: true
    },
    useRandomTimeDial: {
      handler(newData) {
        console.log(newData)
        this.$emit('update', newData)
      },
      deep: true
    }
    // list(newList) {
    //   console.log(newList)
    // }
    // tableData(newData) {
    //   this.$emit('update', newData)
    // },
    // list(newList) {
    //   this.tableData = JSON.parse(JSON.stringify(newList.pingAddress))
    // }
  },
  created() {
    this.$nextTick(() => {
      this.useRandomTimeDial = this.list.useRandomTimeDial
      this.state = !this.useRandomTimeDial.isAvailable
      console.log(this.useRandomTimeDial)
    })
    // console.log(this.$t('taskPlan.label.testDurationSegmentationSettings'))
    // this.tableData = this.list.pingAddress
  },
  methods: {
    removeDomain(item) {
      const index = this.useRandomTimeDial.randomTimeSection.sectionInfo.indexOf(item)
      console.log(index)
      if (index === 0) {
        this.$alert(this.$t('taskPlan.message.timePeriod'), this.$t('common.tip'), {
          confirmButtonText: this.$t('common.confirm'),
          callback: action => {
          }
        })
      } else if (index !== -1) {
        this.useRandomTimeDial.randomTimeSection.sectionInfo.splice(index, 1)
      }
    },
    addDomain() {
      this.useRandomTimeDial.randomTimeSection.sectionInfo.push({
        count: '',
        maxDuration: '',
        minDuration: ''
      })
    },
    isChange() {
      this.state = !this.useRandomTimeDial.isAvailable
    }
    // handleAdd() {
    //   if (this.url.length <= 0) {
    //     return false
    //   }
    //   var param = {
    //     url: this.url
    //   }
    //   this.tableData.push(param)
    // },
    // handleDel(index) {
    //   this.tableData.splice(index, 1)
    // }
  }
}
</script>
<style lang="less" scoped>
  .demo-form-inline /deep/ .el-select,.demo-form-inline /deep/ .el-input__inner, .demo-form-inline /deep/ .el-input-number--small, .demo-form-inline /deep/ .el-input--small{
    display: block;
    margin-right: 0;
    width: 100%;
  }
</style>
