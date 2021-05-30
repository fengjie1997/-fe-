<template>
  <div class="app-container">
    <el-form
      ref="addDeviceForm"
      :model="deviceForm"
      status-icon
      :rules="rules"
      :show-message="false"
      label-width="120px"
      class="demo-deviceForm"
      label-position="left"
    >
      <el-row>
        <el-col :span="12">
          <el-form-item
            label="分   组"
            prop="group"
            required
            label-width="100px"
            show-message="false"
          >
            <el-select
              v-model="deviceForm.group"
              placeholder="请选择分组"
              style="width:80%"
              @change="selectedGroup(deviceForm.group)"
            >
              <el-option
                v-for="(item,index) in groupData"
                :key="index"
                :label="item.name"
                :value="index"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="子分组" prop="groupId" required label-width="100px">
            <el-select v-model="deviceForm.groupId" style="width:80%">
              <el-option
                v-for="item in childrenData"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item label="设备型号" prop="model" required label-width="100px">
            <el-input v-model="deviceForm.model" style="width:80%" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="设备ID" prop="guid" required label-width="100px">
            <el-input v-model="deviceForm.guid" style="width:80%" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="应用版本" prop="version" label-width="100px">
            <el-select v-model="deviceForm.deviceVersion" style="width:80%">
              <el-option label="WeTest2.0" value="WeTest2.0" />
              <el-option label="WeTest1.0" value="WeTest1.0" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="设备IMEI" prop="imei" required label-width="100px">
            <el-input v-model="deviceForm.imei" style="width:80%" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <br>
    <div slot="footer" class="dialog-footer" float="right" />
  </div>
</template>

<script>
import { DeviceBind } from '@/api/WeTest/device.js'
import { fetchGroupList } from '../../../../../api/device/device'
export default {
  name: 'DeviceBindView',
  components: {},
  data() {
    return {
      groupData: [],
      childrenData: [],
      deviceForm: {
        group: null,
        groupId: '',
        guid: '',
        model: '',
        imei: '',
        version: []
      },
      multipleSelection: []
    }
  },
  created() {
    this.getGroupList()
  },
  methods: {
    getGroupList() {
      // eslint-disable-next-line no-undef
      fetchGroupList().then(response => {
        const res = response.data
        if (res.code === 1) {
          this.groupData = res.data
        }
      })
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          DeviceBind(this.deviceForm).then(response => {
            if (response.data.code === 1) {
              this.$notify({
                title: this.$t('common.success'),
                message: this.$t('common.createSuccess'),
                type: 'success',
                duration: 2000
              })
            }
          })
          this.$parent.dialogBindVisible = false
          this.resetForm()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(addDeviceForm) {
      this.$refs[addDeviceForm].resetFields()
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    selectedGroup(index) {
      this.deviceForm.groupId = ''
      this.childrenData = this.groupData[index].children
      this.deviceForm.groupId = this.childrenData[0].name
    }
  }
}
</script>
