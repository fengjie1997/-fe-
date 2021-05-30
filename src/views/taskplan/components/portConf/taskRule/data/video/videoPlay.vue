<template>
  <el-collapse v-model="active" class="form-collapse">
    <el-collapse-item name="1">
      <template slot="title"><el-divider>{{ title }}</el-divider></template>
      <el-form ref="playForm" :model="playForm" :rules="rules" label-width="180px">
        <el-row>
          <el-col :span="12">
            <el-form-item :label="$t('taskPlan.voice.testType')">
              <el-select v-model="playForm.psCallMode" :placeholder="$t('common.pleaseSelect')">
                <el-option v-for="(item,idx) in modeList" :key="idx" :label="item.name" :value="item.code" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('taskPlan.ftpUpload.noDataTimeout')" prop="noDataTimeout">
              <el-input v-model="playForm.noDataTimeout" :min="0" style="width: 100%"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item :label="$t('taskPlan.httpWeb.websiteType')" prop="websiteType">
              <el-select v-model="playForm.websiteType" :placeholder="$t('common.pleaseSelect')">
                <el-option v-for="(item,idx) in websiteTypeList" :key="idx" :label="item.name" :value="item.code" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('taskPlan.videoPlay.mediaQuality')" prop="mediaQuality">
              <el-select v-model="playForm.mediaQuality" :placeholder="$t('common.pleaseSelect')">
                <el-option v-for="(item,idx) in mediaQualityList" :key="idx" :label="item.name" :value="item.code" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="URL">
              <el-col :span="22">
                <el-input v-model="urlInfo.url" clearable class="filter-item" style="width:99%" />
              </el-col>
              <el-col :span="2">
                <el-tooltip :content="$t('common.add')">
                  <el-button type="primary" icon="el-icon-plus" @click="handleAdd" />
                </el-tooltip>
              </el-col>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="21">
            <el-form-item label="URL List">
              <el-table
                ref="urlTable"
                v-col-width-limit
                :data="playForm.urlList.urlInfos"
                style="width: 100%"
                border
              >
                <el-table-column type="index" width="60" :label="$t('common.num')" fixed show-overflow-tooltip />
                <el-table-column prop="url" label="URL" min-width="200" show-overflow-tooltip />
                <el-table-column :label="$t('common.actions')" width="80">
                  <template slot-scope="scope">
                    <el-tooltip :content="$t('common.delete')">
                      <el-button plain type="danger" icon="el-icon-delete" @click="handleDel(scope.$index)" />
                    </el-tooltip>
                  </template>
                </el-table-column>
              </el-table>

            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-collapse-item>
  </el-collapse>
</template>

<script>
import { getCacheDict } from '@/utils/dictCache'
import { commonOptions } from '../../common/common'
export default {
  name: 'VideoPlay',
  props: {
    data: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      active: ['1'],
      title: this.$t('taskPlan.videoPlay.title'),
      modelForm: {},
      option: commonOptions,
      urlInfo: {
        isCheck: true,
        url: ''
      },
      protocolList: getCacheDict('videoplayProtocol'),
      bufferTimeByList: getCacheDict('videoplayBufferTimeBy'),
      modeList: getCacheDict('PSCallMode'),
      playTimeList: getCacheDict('videoplayPlayTimeBy'),
      websiteTypeList: getCacheDict('videoplayWebsiteType'),
      playForm: {
        bufferTimeBy: getCacheDict('videoplayBufferTimeBy')[0].code,
        bufferTotalTime: 0,
        bufferingPercent: 0,
        bufferingTime: 0,
        connectTimeOut: 0,
        isSaveVideo: true,
        maxBufferCounts: 5,
        maxBufferPercentage: 100,
        maxBufferTimeout: 60,
        mediaQuality: '',
        noDataTimeout: 30,
        playDuration: 60,
        playPercentage: 100,
        playThreshold: 2000,
        playTimeBy: getCacheDict('videoplayPlayTimeBy')[0].code,
        playTimeout: 0,
        playVideo: true,
        playerType: 'DingliPlayer',
        preBufferTime: 0,
        protocol: getCacheDict('videoplayProtocol')[0].code,
        psCallMode: getCacheDict('PSCallMode')[0].code,
        reconnectCounts: 0,
        saveDirectory: '',
        useBufferingPercent: '',
        useMediaPlayPercent: '',
        websiteType: getCacheDict('videoplayWebsiteType')[0].code,
        websiteTypeValue: 0,
        custonPioneer: {
          bufferOption: true
        },
        urlList: {
          urlInfos: []
        }
      },
      rules: {
        noDataTimeout: [
          { required: true, message: this.$t('common.pleaseSelect'), trigger: 'trigger' }
        ],
        websiteType: [
          { required: true, message: this.$t('common.pleaseSelect'), trigger: 'change' }
        ],
        mediaQuality: [
          { required: true, message: this.$t('common.pleaseSelect'), trigger: 'change' }
        ]
      }
    }
  },
  computed: {
    mediaQualityList() {
      switch (this.playForm.websiteType) {
        case 'Youtube':
          // eslint-disable-next-line vue/no-side-effects-in-computed-properties
          this.playForm.mediaQuality = getCacheDict('videoplayMediaQualityValueYoutube', true)[0].code
          return getCacheDict('videoplayMediaQualityValueYoutube', true)
          // eslint-disable-next-line no-unreachable
          break
        case 'Youku':
          // eslint-disable-next-line vue/no-side-effects-in-computed-properties
          this.playForm.mediaQuality = getCacheDict('videoplayMediaQualityValueYouku', true)[0].code
          return getCacheDict('videoplayMediaQualityValueYouku', true)
          // eslint-disable-next-line no-unreachable
          break
        case 'Facebook':
          // eslint-disable-next-line vue/no-side-effects-in-computed-properties
          this.playForm.mediaQuality = getCacheDict('videoplayMediaQualityValueFacebook', true)[0].code
          return getCacheDict('videoplayMediaQualityValueFacebook', true)
          // eslint-disable-next-line no-unreachable
          break
        case 'ifeng':
          // eslint-disable-next-line vue/no-side-effects-in-computed-properties
          this.playForm.mediaQuality = getCacheDict('videoplayMediaQualityValuIfeng', true)[0].code
          return getCacheDict('videoplayMediaQualityValuIfeng', true)
          // eslint-disable-next-line no-unreachable
          break
        case 'Sohu':
          // eslint-disable-next-line vue/no-side-effects-in-computed-properties
          this.playForm.mediaQuality = getCacheDict('videoplayMediaQualityValueSohu', true)[0].code
          return getCacheDict('videoplayMediaQualityValueSohu', true)
          // eslint-disable-next-line no-unreachable
          break
        case 'iQIYI':
          // eslint-disable-next-line vue/no-side-effects-in-computed-properties
          this.playForm.mediaQuality = getCacheDict('videoplayMediaQualityValueiqiyi', true)[0].code
          return getCacheDict('videoplayMediaQualityValueiqiyi', true)
          // eslint-disable-next-line no-unreachable
          break
        default:
          // eslint-disable-next-line vue/no-side-effects-in-computed-properties
          this.playForm.mediaQuality = getCacheDict('videoplayMediaQualityValueYoutube', true)[0].code
          return getCacheDict('videoplayMediaQualityValueYoutube', true)
          // eslint-disable-next-line no-unreachable
          break
      }
    }
  },
  watch: {
    // 初始化编辑值
    data(n) {
      this.playForm = n
    },
    // 实时更新表单
    playForm: {
      handler(n) {
        this.$emit('updateForm', n)
      },
      deep: true
    }

  },
  created() {
    console.log(this.playForm.noDataTimeout)
  },
  methods: {
    handleAdd() {
      if (this.urlInfo.url.length <= 0) {
        return false
      } else {
        var info = Object.assign({}, this.urlInfo)
        this.playForm.urlList.urlInfos.push(info)
      }
    },
    handleDel(idx) {
      this.playForm.urlList.urlInfos.splice(idx, 1)
    }
  }
}
</script>
<style scoped>
  .form-collapse >>> .el-table .el-button, .el-table .el-button--mini {
    padding: 5px;
  }
</style>
