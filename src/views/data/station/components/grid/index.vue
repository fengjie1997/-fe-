<template>
  <div class="grid-form">
    <el-form ref="form" :model="form" label-width="110px">
      <el-row>
        <el-col :span="24" class="grid-title">
          <i class="el-icon-s-fold title-icon" />
          <span class="title-name">网络参数</span>
        </el-col>
        <el-divider />
        <el-form-item
          label="运营商"
          class="grid-form-item"
          :rules="[
            { required: true, message: '运营商', trigger: 'blur' },
          ]"
        >
          <el-select v-model="form.region" :placeholder="$t('common.pleaseSelect')" class="grid-form-field">
            <el-option label="区域一" value="shanghai" />
            <el-option label="区域二" value="beijing" />
          </el-select>
        </el-form-item>
        <el-form-item
          label="网络类型"
          class="grid-form-item"
          :rules="[
            { required: true, message: '网络类型', trigger: 'blur' },
          ]"
        >
          <el-select v-model="form.region" :placeholder="$t('common.pleaseSelect')" class="grid-form-field">
            <el-option label="区域一" value="shanghai" />
            <el-option label="区域二" value="beijing" />
          </el-select>
        </el-form-item>
        <el-form-item
          label="栅格参数"
          class="grid-form-item"
          :rules="[
            { required: true, message: '栅格参数', trigger: 'blur' },
          ]"
        >
          <el-select v-model="form.region" :placeholder="$t('common.pleaseSelect')" class="grid-form-field">
            <el-option label="区域一" value="shanghai" />
            <el-option label="区域二" value="beijing" />
          </el-select>
        </el-form-item>
      </el-row>
      <el-row class="grid-row">
        <el-col :span="24" class="grid-title">
          <i class="el-icon-aim title-icon" />
          <span class="title-name">项目过滤</span>
        </el-col>
        <el-divider />
        <el-form-item
          class="grid-form-item"
          label="添加项目"
          :rules="[
            { required: true, message: '添加项目', trigger: 'blur' },
          ]"
        >
          <el-select v-model="form.region" placeholder="添加项目" class="grid-form-field">
            <el-option label="区域一" value="shanghai" />
            <el-option label="区域二" value="beijing" />
          </el-select>
        </el-form-item>
      </el-row>
      <el-row class="grid-row">
        <el-col :span="24" class="grid-title">
          <i class="el-icon-aim title-icon" />
          <span class="title-name">时间过滤</span>
        </el-col>
        <el-divider />
        <el-col :span="24">
          <el-form-item label="选择时间" class="grid-form-item">
            <el-date-picker
              v-model="value1"
              style="width:100%"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class="grid-row">
        <el-col :span="24" class="grid-title">
          <i class="el-icon-aim title-icon" />
          <span class="title-name">区域过滤</span>
        </el-col>
        <el-divider />
        <el-form-item label="选择区域" class="grid-form-item">
          <el-select v-model="form.region" placeholder="请选择活动区域" class="grid-form-field">
            <el-option label="区域一" value="shanghai" />
            <el-option label="区域二" value="beijing" />
          </el-select>
        </el-form-item>
      </el-row>
      <el-row class="grid-row">
        <el-col :span="24" class="grid-title">
          <i class="el-icon-aim title-icon" />
          <span class="title-name">文件过滤</span>
        </el-col>
        <el-divider />
        <el-form-item label="剔除异常数据" class="grid-form-item">
          <el-switch v-model="value1" />
        </el-form-item>
        <el-form-item label="文件端口" class="grid-form-item">
          <el-select v-model="form.region" :placeholder="$t('common.pleaseSelect')" class="grid-form-field">
            <el-option label="区域一" value="shanghai" />
            <el-option label="区域二" value="beijing" />
          </el-select>
        </el-form-item>
        <el-form-item label="测试业务" class="grid-form-item">
          <el-select v-model="form.region" :placeholder="$t('common.pleaseSelect')" class="grid-form-field">
            <el-option label="区域一" value="shanghai" />
            <el-option label="区域二" value="beijing" />
          </el-select>
        </el-form-item>
        <el-form-item label="设备类型" class="grid-form-item">
          <el-select v-model="form.region" :placeholder="$t('common.pleaseSelect')" class="grid-form-field">
            <el-option label="区域一" value="shanghai" />
            <el-option label="区域二" value="beijing" />
          </el-select>
        </el-form-item>
        <el-form-item label="设备名称" class="grid-form-item">
          <el-select v-model="form.region" :placeholder="$t('common.pleaseSelect')" class="grid-form-field">
            <el-option label="区域一" value="shanghai" />
            <el-option label="区域二" value="beijing" />
          </el-select>
        </el-form-item>
      </el-row>
      <el-row class="grid-row">
        <el-col :span="24" class="grid-title">
          <i class="el-icon-aim title-icon" />
          <span class="title-name">统计方式</span>
        </el-col>
        <el-divider />
        <el-form-item label="栅格粒度" class="grid-form-item">
          <el-select v-model="form.region" :placeholder="$t('common.pleaseSelect')" class="grid-form-field">
            <el-option label="区域一" value="shanghai" />
            <el-option label="区域二" value="beijing" />
          </el-select>
        </el-form-item>
        <el-form-item label="统计方式" class="grid-form-item">
          <el-select v-model="form.region" :placeholder="$t('common.pleaseSelect')" class="grid-form-field">
            <el-option label="区域一" value="shanghai" />
            <el-option label="区域二" value="beijing" />
          </el-select>
        </el-form-item>
      </el-row>
    </el-form>
  </div>
</template>
<script>
import js from './index'
export default {
  ...js
}
</script>
<style lang="less" scoped>
.grid-row{
  margin-top: 15px;
}
.grid-title{
  color: #555555;
  font-size: 16px;
  .title-icon{
    padding-left: 10px;
  }
  .title-name{
    color: #000000;
    line-height: 16px;
    font-weight: 500;
  }
}

</style>
<style>
.grid-form-item label{
  color: #000000;
  font-weight: 500;
}
.grid-form-field{
  width: 100%;
}
</style>
