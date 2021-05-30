<template>
  <div class="part-baseconf">
    <!-- <el-row>
      <div class="filter-container">
        <el-button-group class="filter-item fr">
          <el-button icon="el-icon-check" type="primary" size="md">保存配置</el-button>
        </el-button-group>
      </div>
    </el-row> -->
    <el-row :gutter="10">
      <el-col :span="8">
        <el-card class="box-card">
          <el-form ref="form" :model="form" label-width="90px">
            <el-row>
              <el-col :span="24" class="grid-title">
                <i class="el-icon-s-fold title-icon" />
                <span class="title-name">网络参数</span>
              </el-col>
              <el-divider style="margin-top:10px" />
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
          </el-form>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="box-card">
          <el-form ref="form" :model="form" label-width="90px">
            <el-row>
              <el-col :span="24" class="grid-title">
                <i class="el-icon-s-fold title-icon" />
                <span class="title-name">网络参数</span>
              </el-col>
              <el-divider style="margin-top:10px" />
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
          </el-form>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="box-card">
          <el-form ref="form" :model="form" label-width="90px">
            <el-row>
              <el-col :span="24" class="grid-title">
                <i class="el-icon-s-fold title-icon" />
                <span class="title-name">网络参数</span>
              </el-col>
              <el-divider style="margin-top:10px" />
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
          </el-form>
        </el-card>
      </el-col>
    </el-row>
    <el-row style="padding-top:15px">
      <center>
        <el-button icon="el-icon-check" type="primary" size="md">保存配置</el-button>
      </center>
    </el-row>
  </div>
  <!-- <div style="height:700px;overflow-y: auto;overflow-x: hidden">
    <form-create v-model="modelForm" :rule="rules" :option="options" />
  </div> -->
</template>

<script>
import js from './baseConf.js'
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

