<template>
  <div class="app-container">
    <el-form
      ref="monitorPhoneDeviceForm"
      :model="deviceForm"
      status-icon
      :show-message="false"
      label-width="120px"
      class="demo-deviceForm"
      label-position="left"
    >
      <el-row>
        <el-col :span="12">
          <el-form-item :label="$t('device.group')" prop="group" required label-width="105px" :show-message="false">
            <el-select
              v-model="deviceForm.group"
              :placeholder="$t('device.seleGroup')"
              style="width:80%"
              @change="selectedGroup(deviceForm.group)"
            >
              <el-option v-for="(item,index) in groupData" :key="index" :label="item.name" :value="index" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="$t('device.subgroup')" prop="groupId" required label-width="90px">
            <el-select v-model="deviceForm.groupId" style="width:100%">
              <el-option v-for="item in childrenData" :key="item.id" :label="item.name" :value="item.id" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item :label="$t('device.deviceName')" prop="name" required label-width="105px">
            <el-input v-model="deviceForm.name" style="width:80%" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="$t('device.deviceID')" prop="guid" required label-width="90px">
            <el-input v-model="deviceForm.guid" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item :label="$t('device.PhoneModel')" prop="imeiKey" label-width="105px">
            <el-select v-model="deviceForm.phoneModel" style="width:80%">
              <el-option v-for="item in phoneModelData" :key="item.id" :label="item.name" :value="item.id" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="$t('device.imsi')" prop="imsi" label-width="90px">
            <el-input v-model="deviceForm.imsi" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item :label="$t('device.firmwareVersion')" prop="firmwareVersion" label-width="105px">
            <el-input v-model="deviceForm.firmwareVersion" style="width:80%" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="$t('device.kernelVersion')" prop="kernalVersion" label-width="90px">
            <el-input v-model="deviceForm.kernalVersion" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item :label="$t('device.osVersion')" prop="osVersion" label-width="105px">
            <el-input v-model="deviceForm.osVersion" style="width:80%" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="$t('device.description')" prop="description" label-width="90px">
            <el-input v-model="deviceForm.description" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import { createMonitorMobileDevice, fetchDeviceInfo, updateMonitorMobileDevice } from '@/api/device/device.js'
import { fetchGroupList } from '@/api/system/group'

export default {
  // props: ['typeId', 'parent'],
  props: { typeId: { type: [String, Number], default: -1 }, parent: { type: Object, default: function() { return this } }},
  data() {
    return {
      groupData: [],
      childrenData: [],
      phoneModelData: [],
      deviceForm: {
        type: '',
        group: '',
        groupId: '',
        deviceId: '',
        guid: '',
        name: '',
        imsi: '',
        imeiKey: '',
        phoneModel: '',
        firmwareVersion: '',
        kernalVersion: '',
        osVersion: '',
        description: ''
      }
    }
  },
  created() {
    this.getGroupList()
  },
  methods: {
    getGroupList() {
      fetchGroupList().then(response => {
        const res = response.data
        if (res.code === 1) {
          this.groupData = res.data
        }
      })
    },
    selectedGroup(index) {
      this.deviceForm.groupId = ''
      this.childrenData = this.groupData[index].children
      this.deviceForm.groupId = this.childrenData[0].id
    },
    resetForm() {
      this.$refs['monitorPhoneDeviceForm'].resetFields()
      this.parent.deviceDialog2 = false
    },
    handelSaveDevice() {
      this.deviceForm.type = this.typeId
      this.$refs['monitorPhoneDeviceForm'].validate((valid) => {
        if (valid) {
          createMonitorMobileDevice(this.deviceForm).then(response => {
            if (response.data.code === 1) {
              this.$notify({
                title: this.$t('common.success'),
                message: this.$t('common.createSuccess'),
                type: 'success',
                duration: 2000
              })
              this.resetForm()
              this.parent.getDeviceList()
              this.parent.deviceDialog2 = false
            }
          })
        }
      })
    },
    getMonitorMobileDevice(type, id) {
      if (this.groupData.length === 0) {
        this.getGroupList()
      }
      fetchDeviceInfo(type, id).then(response => {
        if (response.data.code === 1) {
          this.deviceForm = response.data.data
          for (var i = 0; i < this.groupData.length; i++) {
            if (response.data.data.parentGroupId === this.groupData[i].id) {
              this.deviceForm.group = this.groupData[i].name
              this.childrenData = this.groupData[i].children
            }
          }
          for (var j = 0; j < this.childrenData.length; j++) {
            if (response.data.data.groupId === this.childrenData[j].id) {
              this.deviceForm.groupId = this.childrenData[j].id
            }
          }
          this.deviceForm.deviceId = id
        }
      })
    },
    handelUpdateDevice() {
      this.$refs['monitorPhoneDeviceForm'].validate((valid) => {
        if (valid) {
          updateMonitorMobileDevice(this.deviceForm).then(response => {
            if (response.data.code === 1) {
              this.$notify({
                title: this.$t('common.success'),
                message: this.$t('common.updateSuccess'),
                type: 'success',
                duration: 2000
              })
              this.resetForm()
              this.parent.getDeviceList()
              this.parent.deviceDialog2 = false
            }
          })
        }
      })
    }
  }
}
</script>
