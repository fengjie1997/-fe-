<template>
  <div class="app-main-container">
    <!-- 本页面所有弹窗 -->
    <!-- 描述弹框 -->
    <el-dialog :title="$t('sysConfig.updateDescribe')" :visible.sync="dialogFormVisible">
      <el-input
        v-model="saveRunDto.description"
        type="textarea"
        :rows="10"
        :placeholder="$t('common.inputTip')"
      />
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{ $t('common.cancel') }}</el-button>
        <el-button type="primary" @click="getsaveDescribe">{{ $t('common.save') }}</el-button>
      </div>
    </el-dialog>
    <el-dialog :title="$t('sysConfig.dataSaveConf')" :visible.sync="dialogFormVisible1">
      {{ $t('sysConfig.value') }}：<el-input
        v-model="dataUpdataDto.keepCount"
      />
      {{ $t('sysConfig.weekUpdate') }}：
      <el-select v-model="dataUpdataDto.keepType">
        <el-option :label="$t('common.year')" value="0" />
        <el-option :label="$t('common.month')" value="1" />
        <el-option :label="$t('common.week')" value="2" />
        <el-option :label="$t('common.day')" value="3" />
      </el-select>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible1 = false">{{ $t('common.cancel') }}</el-button>
        <el-button type="primary" @click="getDataUpdate">{{ $t('common.save') }}</el-button>
      </div>
    </el-dialog>
    <el-dialog :title="$t('sysConfig.aloConfig')" :visible.sync="dialogFormVisibletow">
      <el-table
        :data="detailData"
        style="width: 100%"
      >
        <el-table-column
          prop="conditionNameCh"
          :label="$t('sysConfig.condition')"
          width="280"
        />
        <el-table-column
          prop="conditionLogic"
          :label="$t('sysConfig.logicalSign')"
          width="300"
        >
          <template slot-scope="fuhao">
            <el-select v-model="fuhao.row.conditionLogic" :placeholder="$t('common.pleaseSelect')">
              <el-option label=">" value="&git" />
              <el-option label="<" value="&lt" />
              <el-option label=">=" value=">=" />
              <el-option label="<=" value="<=" />
              <el-option label="<>" value="<>" />
              <el-option label="=" value="=" />
              <el-option label="[]" value="[]" />
              <el-option label="()" value="()" />
              <el-option label="[)" value="[)" />
              <el-option label="(]" value="(}" />
            </el-select>
          </template>
        </el-table-column>
        <el-table-column
          prop="unit"
          :label="$t('sysConfig.unit')"
        />
        <el-table-column
          prop="conditionValue"
          :label="$t('sysConfig.value')"
        >
          <!-- 还真的用拼音啊 -->
          <template slot-scope="zhi">
            <el-input-number v-model="zhi.row.conditionValue" :min="1" :max="100" :label="$t('sysConfig.describe')" />
            <!-- @change="tosaveOpenfuhao(zhi.row)"  -->
          </template>
        </el-table-column>
      </el-table>
      <el-row>
        <el-col :offset="20">
          <el-button type="primary" style="margin-top:2rem" @click="tosaveOpenfuhao()">{{ $t('common.save') }}</el-button>
          <el-button style="margin-top:1rem" @click="dialogFormVisibletow=false"> {{ $t('common.cancel') }} </el-button>
        </el-col>
      </el-row>
    </el-dialog>
    <!-- 弹窗over -->

    <!--    这边是实际业务-->

    <el-row>
      adasdasiudjiasdjisadjklswjksbhjwbhi
      <el-col :span="5">
        <el-card class="tree-box-card" shadow="never">
          <div slot="header" class="clearfix">
            <span>{{ $t('sysConfig.sysConfig') }}</span>
            <el-button style="float: right; padding: 3px 0" type="text">{{ $t('common.actions') }}</el-button>
          </div>

          <el-scrollbar class="sys-config-tree">
            <el-tree :data="data" :props="defaultProps" @node-click="topage_cs">
              <span slot-scope="{ node }">
                <span>{{ node.label }}</span>
              </span>
            </el-tree>
          </el-scrollbar>
        </el-card>
      </el-col>

      <!--      上面是左侧的树-->

      <el-col :span="19">
        <el-card style="height: calc(100vh - 84px - 20px);">
          <el-tabs v-model="pageName" border @tab-click="close">
            <el-tab-pane :name="$t('sysConfig.fileConfig')" class="tab-pane">

              <!--              这是一个table-->
              <el-table
                :data="fileConfigList"
                stripe
                border
                style="width: 100%; margin-bottom: 15px;"
              >
                <el-table-column :label="$t('sysConfig.fileConfig')">
                  <el-table-column
                    type="index"
                    :label="$t('common.num')"
                    width="90"
                  />
                  <el-table-column
                    prop="nameCh"
                    :label="$t('common.name')"
                    width="180"
                  />
                  <el-table-column
                    :label="$t('sysConfig.value')"
                    width="180"
                  >
                    <template slot-scope="scope">
                      <!-- <span>{{ scope.row.value }}</span> -->
                      <el-switch
                        v-model="scope.row.value"
                        :active-value="1"
                        :inactive-value="0"
                        @change="fileStorage(scope.row)"
                      />
                    </template>

                  </el-table-column>
                  <el-table-column
                    prop="updator"
                    :label="$t('sysConfig.updator')"
                    width="180"
                  />
                  <el-table-column
                    :label="$t('sysConfig.updateDt')"
                  >
                    <template slot-scope="scope">
                      {{ formatDate(scope.row.updateDt) }}
                    </template>
                  </el-table-column>
                </el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane :name="$t('sysConfig.fileAloConfig')" class="tab-pane">
              <el-row style="margin-bottom: 10px;">
                <el-col :span="8">
                  {{ $t('sysConfig.errType') }}：
                  <el-select v-model="fileOperayionListDto.filterClass" @change="getfileConfigOperation">
                    <el-option
                      v-for="item in operationOptions"
                      :key="item.classCh"
                      :label="item.classCh"
                      :value="item.classEn"
                    />
                  </el-select>
                </el-col>
                <el-col :span="11">
                  <el-input v-model="fileOperayionListDto.keyword" :placeholder="$t('common.inputTip')">
                    <template slot="prepend">{{ $t('device.key') }}</template>
                  </el-input>
                </el-col>
                <el-col :span="4">
                  <el-button icon="el-icon-search" @click="getfileConfigOperation">{{ $t('common.search') }}</el-button>
                </el-col>
              </el-row>
              <el-table
                border
                :data="fileOperayionList"
                style="width: 100%"
                height="100%"
              >
                <el-table-column :label="$t('sysConfig.aloConfig')">
                  <el-table-column
                    :label="$t('sysConfig.errType')"
                    prop="classCh"
                  />
                  <el-table-column
                    :label="$t('sysConfig.errItem')"
                    prop="itemNameCh"
                  />
                  <el-table-column
                    :label="$t('sysConfig.updator')"
                    prop="updator"
                  />
                  <el-table-column
                    :label="$t('sysConfig.updateDt')"
                    prop="updateDt"
                  >
                    <template slot-scope="scope">
                      {{ formatDate(scope.row.updateDt) }}
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('sysConfig.takeUp')">
                    <template slot-scope="scope">
                      <!-- <span>{{ scope.row.value }}</span> -->
                      <el-switch
                        v-model="scope.row.enable"
                        :active-value="1"
                        :inactive-value="0"
                        @change="enableChange(scope.row)"
                      />
                    </template>
                  </el-table-column>
                  <el-table-column
                    :label="$t('sysConfig.describe')"
                  >
                    <template slot-scope="describe">
                      <el-button size="mini" type="primary" @click="handleClickDetail(describe.row)">{{ $t('sysConfig.updateParas') }}</el-button>
                      <el-button size="mini" type="warning" @click="handleClick(describe.row)">{{ $t('sysConfig.describe') }}</el-button>
                    </template>
                  </el-table-column>
                </el-table-column>
              </el-table>
              <pagination
                :total="fileOperayionListSum"
                min-width="3.375rem"
                :page.sync="fileOperayionListDto.page"
                :limit.sync="fileOperayionListDto.limit"
                class="dialog-pagination"
                @pagination="getfileConfigOperation"
              />
            </el-tab-pane>
            <el-tab-pane :name="$t('sysConfig.paras')" class="tab-pane">
              <el-row>
                <el-col :span="7">
                  <el-input v-model="dataRangePage.keyWord" :placeholder="$t('common.inputTip')" class="input-with-select">
                    <el-select slot="prepend" v-model="dataRangePage.isId" :placeholder="$t('common.pleaseSelect')" class="selectChoose">
                      <el-option :label="$t('common.name')" :value="false" />
                      <el-option label="ID" :value="true" />
                    </el-select>
                    <el-button slot="append" icon="el-icon-search" @click="getGetDataTow" />
                  </el-input>
                </el-col>
              </el-row>
              <el-table
                border
                :data="dataRangList"
                style="width: 100%;margin-top:1rem"
                :height="styleNH.height"
                @cell-dblclick="getGetDataOne"
              >
                <el-table-column :label="$t('sysConfig.paras')">
                  <el-table-column
                    prop="name"
                    :label="$t('common.name')"
                    width="180"
                  />
                  <el-table-column
                    prop="groupName"
                    :label="$t('device.group')"
                    width="180"
                  />
                  <el-table-column
                    prop="code"
                    label="ID"
                    width="180"
                  />
                  <el-table-column
                    prop="defaultColor"
                    :label="$t('sysConfig.color')"
                    width="180"
                  >
                    <template slot-scope="scope">
                      <span>{{ getRGB(scope.row.defaultColor) }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    :label="$t('sysConfig.monitor')"
                  >
                    <template slot-scope="seeEverytime">
                      <!-- <span>{{ scope.row.value }}</span> -->
                      <el-switch
                        v-model="seeEverytime.row.afMonitor"

                        :active-value="1"
                        :inactive-value="0"
                        @change="saveReportAndMonitorOne(seeEverytime.row)"
                      />
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('sysConfig.list')">
                    <template slot-scope="form">
                      <!-- <span>{{ scope.row.value }}</span> -->
                      <el-switch
                        v-model="form.row.enableReport"
                        :active-value="1"
                        :inactive-value="0"
                        @change="sendReAadAf(form.row)"
                      />
                    </template>
                  </el-table-column>
                </el-table-column>
              </el-table>
              <pagination
                :total="dataRangeSum"
                min-width="3.375rem"
                :page.sync="dataRangePage.page"
                :limit.sync="dataRangePage.limit"
                class="dialog-pagination"
                @pagination="getGetDataTow"
              />
              <!-- 双击弹出框 -->
              <el-row>
                <el-col :span="12">
                  <el-card v-show="detailCard" class="boxcard">
                    <div slot="header" class="clearfix">
                      <span>{{ $t('sysConfig.parasInfo') }} asdasdasd</span>
                      <el-button style="float: right; padding: 3px 0" type="text" @click="submit">{{ $t('common.save') }}</el-button>
                      <!-- <el-button style="float: right; padding: 3px 0" type="text">复制</el-button> -->
                    </div>
                    <el-tabs v-model="activeName" @tab-click="changIndex">
                      <!-- <template
                        v-for="(item,index) in detailDataDto[index]"
                      > -->
                      <el-tab-pane v-for="(item,index) in detailDataDtoMap" :key="index" :label="Change(item.threshold)" :name="Change(item.threshold)">
                        <el-table
                          :data="baseyzDtoList[index]"
                          border
                          height="100%"
                          style="width: 100%"
                        >
                          <el-table-column
                            type="index"
                            width="50"
                          />
                          <el-table-column
                            :label="$t('sysConfig.color')"
                            width="180"
                          >
                            <template slot-scope="color">
                              <el-row>
                                <el-col :span="15">
                                  <span :style="{ color: color.row.Color, fontSize: 16 + 'px' }">{{ color.row.Color }}</span>
                                </el-col>
                                <el-col :span="5">
                                  <el-color-picker v-model="color.row.Color" :disabled="detailDataDto[index].thresholdType === 1 && color.row.RightValue >900000000000000 || detailDataDto[index].thresholdType===2? true: false" size="small" />
                                </el-col>
                              </el-row></template>
                          </el-table-column>
                          <el-table-column
                            :label="$t('sysConfig.regionalSegmentation')"
                            width="150"
                          >
                            <template slot-scope="color">
                              <span v-if="detailDataDto[index].thresholdType === 0">
                                <span v-if="color.row.IncludeLeft === 0">(</span> <span v-if="color.row.IncludeLeft === 1">[</span><span>{{ color.row.LeftValue }},{{ color.row.RightValue }}</span>
                                <span v-if="color.row.IncludeRight === 0">)</span> <span v-if="color.row.IncludeRight === 1">]</span>
                              </span>
                              <span v-if="detailDataDto[index].thresholdType === 1">
                                = {{ color.row.RightValue }}
                              </span>
                              <span v-if="detailDataDto[index].thresholdType === 2">
                                -
                              </span>
                            </template>
                          </el-table-column>
                          <el-table-column
                            :label="$t('sysConfig.alias')"
                          >
                            <template slot-scope="color">
                              <!-- {{ color.row }} -->
                              <el-input v-model="color.row.ThrStr" :disabled="detailDataDto[index].thresholdType === 1 && color.row.RightValue >900000000000000 || detailDataDto[index].thresholdType===2? true: false" />
                              <!-- <el-input v-if="color.row.Note !== ''" v-model="color.row.ThrStr" :disabled="detailDataDto[index].thresholdType === 1 && color.row.RightValue >900000000000000 || detailDataDto[index].thresholdType===2? true: false" /> -->
                              <!-- <el-input v-if="color.row.Note === ''" v-model="color.row.ThrStr" :disabled="detailDataDto[index].thresholdType === 1 && color.row.RightValue >900000000000000 ||detailDataDto[index].thresholdType===2? true: false" /> -->
                            </template>
                          </el-table-column>
                        </el-table>
                      </el-tab-pane>
                      <!-- </template> -->

                    </el-tabs>
                  </el-card>
                </el-col>
                <el-col :span="12">
                  <el-card v-show="detailCard" class="box-cardT">
                    <div slot="header" class="clearfix">
                      <span>{{ $t('sysConfig.baseInfo') }}</span>
                      <el-button style="float: right; padding: 3px 0" type="text" @click="styleNH.height='500',styleH.height='85vh',detailCard=false">{{ $t('tagsView.close') }}</el-button>
                    </div>
                    <div class="cardSty">
                      <el-form ref="formdata" :model="detailDataDto[num]" label-position="left" size="mini">
                        <el-row class="nameAndId">
                          <el-col :span="10">
                            <el-form-item :label="$t('common.name')">
                              <el-input v-model="passDetailData.name" />
                            </el-form-item>
                          </el-col>
                          <el-col :span="10" :offset="2">
                            <el-form-item label="ID">
                              <el-input v-model="passDetailData.id" :disabled="true" />
                            </el-form-item>
                          </el-col>
                        </el-row>
                        <el-form-item :label="$t('sysConfig.parasBurst')">
                          <template>
                            <el-row>
                              <el-col :span="15">
                                <el-input v-model="baseyzShowInt[num]" />
                              </el-col>
                              <el-col :span="5">  <el-button type="primary" @click="updateDto(num)">{{ $t('tagsView.refresh') }}</el-button></el-col>
                            </el-row>
                          </template>
                        </el-form-item>
                        <el-row>
                          <el-col :span="10">
                            <el-form-item :label="$t('common.sort')">
                              <el-select v-model="valueSlot" :placeholder="$t('common.pleaseSelect')" @change="slotChange(num)">
                                <el-option
                                  :label="$t('common.positiveSequence')"
                                  :value="$t('common.positiveSequence')"
                                />
                                <el-option
                                  :label="$t('common.reverseOrder')"
                                  :value="$t('common.reverseOrder')"
                                />
                              </el-select>
                            </el-form-item>
                          </el-col>
                          <el-col :span="10" :offset="2">
                            <el-form-item :label="$t('sysConfig.unit')">
                              <el-select v-model="detailDataDto[num].displayUnitCode" :placeholder="$t('common.pleaseSelect')">
                                <el-option
                                  v-for="item in dw"
                                  :key="item.Value"
                                  :label="item.Name"
                                  :value="item.Value"
                                />
                              </el-select>
                            </el-form-item>
                          </el-col>
                        </el-row>
                        <el-row>
                          <el-col :span="10">
                            <el-form-item :label="$t('sysConfig.rule')">
                              <el-select v-model="symbol" :placeholder="$t('common.pleaseSelect')" @change="TypeChange">
                                <el-option
                                  :label="$t('sysConfig.leftRight')"
                                  :value="0"
                                />
                                <el-option
                                  :label="$t('sysConfig.rightLeft')"
                                  :value="1"
                                />
                              </el-select>
                            </el-form-item>
                          </el-col>
                          <el-col :span="10" :offset="2">
                            <el-form-item :label="$t('sysConfig.grid')">
                              <el-input-number v-model="detailDataDto[num].paintSize" :label="$t('sysConfig.grid')" />
                            </el-form-item>
                          </el-col>
                        </el-row>
                        <el-form-item :label="$t('sysConfig.type')">
                          <el-select v-model="detailDataDto[num].thresholdType" @change="valueChange">
                            <el-option
                              v-for="item in thresholdTypeDto"
                              :key="item.Value"
                              :label="item.Name"
                              :value="item.Value"
                            />
                          </el-select></el-form-item>
                      </el-form>
                    </div>
                  </el-card>
                </el-col>
              </el-row>
            </el-tab-pane>
            <el-tab-pane :name="$t('sysConfig.deviceAlarm')" class="tab-pane">
              <el-row>
                <el-col :span="7">
                  {{ $t('sysConfig.alarm') }}：
                  <el-select v-model="listset.name">
                    <el-option
                      v-for="item in allalarmDataList"
                      :key="item.id"
                      :label="item.alarmContentZh"
                      :value="item.alarmContentZh"
                    />
                  </el-select>
                </el-col>
                <el-col :span="7">
                  {{ $t('sysConfig.alarmType') }}：
                  <el-select v-model="listset.alarmType">
                    <el-option :label="$t('sysConfig.all')" :value="null" />
                    <el-option label="RCU" value="1" />
                    <el-option label="ATU" value="2" />
                  </el-select></el-col>
                <el-col :span="7">
                  警告级别：
                  <el-select v-model="listset.level">
                    <el-option :label="$t('sysConfig.all')" :value="null" />
                    <el-option :label="$t('common.clear')" value="-1" />
                    <el-option :label="$t('common.tip')" value="0" />
                    <el-option :label="$t('common.secondary')" value="1" />
                    <el-option :label="$t('common.important')" value="2" />
                    <el-option :label="$t('common.urgent')" value="3" />
                  </el-select></el-col>
                <el-col :span="3">
                  <el-button type="primary" @click="getalarmlist">{{ $t('common.query') }}</el-button>
                </el-col>
              </el-row>
              <el-table
                :data="alarmDataList"
                style="width: 100% ;margin-top:1rem"
                border
                height="100%"
              >
                <el-table-column :label="$t('sysConfig.deviceAlarm')">
                  <el-table-column
                    prop="alarmContentZh"
                    :label="$t('sysConfig.alarm')"
                    width="180"
                  />
                  <el-table-column
                    prop="alarmType"
                    :label="$t('sysConfig.alarmType')"
                    width="180"
                    :formatter="alarmTypeSw"
                  />
                  <el-table-column
                    prop="alarmLevel"
                    :label="$t('sysConfig.alarmLevel')"
                    width="180"
                    :formatter="alarmLevelSw"
                  />
                  <el-table-column
                    prop="address"
                    :label="$t('sysConfig.isDisable')"
                  >     <template slot-scope="show">
                    <!-- <span>{{ scope.row.value }}</span> -->
                    <el-switch
                      v-model="show.row.isDisplay"
                      :active-value="true"
                      :inactive-value="false"
                      @change="chooseIFShow(show.row)"
                    />
                  </template>
                  </el-table-column>
                  <el-table-column
                    prop="address"
                    :label="$t('sysConfig.isMess')"
                  >
                    <template slot-scope="SMS">
                      <span>{{ SMS.row.value }}</span>
                      <el-switch
                        v-model="SMS.row.enableSms"
                        :active-value="true"
                        :inactive-value="false"
                        @change="chooseIfSMS(SMS.row)"
                      />
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="address"
                    :label="$t('sysConfig.isMail')"
                  >
                    <template slot-scope="Em">
                      <span>{{ Em.row.value }}</span>
                      <el-switch
                        v-model="Em.row.enableMail"
                        :active-value="true"
                        :inactive-value="false"
                        @change="chooseIfEm(Em.row)"
                      />
                    </template>
                  </el-table-column>
                </el-table-column>
              </el-table>
              <pagination
                :total="sum"
                min-width="3.375rem"
                :page.sync="listset.page"
                :limit.sync="listset.limit"
                class="dialog-pagination"
                @pagination="getalarmlist"
              />
            </el-tab-pane>
            <el-tab-pane :name="$t('sysConfig.dataConfig')" class="tab-pane">
              <el-table
                :data="getDataList"
                style="width: 100%;margin-bottom: 15px;"
                border
                height="100%"
              >
                <el-table-column :label="$t('sysConfig.dataConfig')">
                  <el-table-column
                    type="index"
                    :label="$t('common.num')"
                    width="90"
                  />
                  <el-table-column
                    prop="dataKeepName"
                    :label="$t('sysConfig.dataModel')"
                    width="180"
                  />
                  <el-table-column
                    prop="keepCount"
                    :label="$t('sysConfig.value')"
                    width="180"
                  />
                  <el-table-column
                    prop="keepType"
                    :label="$t('sysConfig.value')"
                    :formatter="DateSwitch"
                  />
                  <el-table-column :label="$t('sysConfig.takeUp')">
                    <template slot-scope="data">
                      <!-- <span>{{ scope.row.value }}</span> -->
                      <el-switch
                        v-model="data.row.activeValue"
                        @change="UpdataChange(data.row)"
                      />
                    </template>
                  </el-table-column>
                  <el-table-column
                    :label="$t('sysConfig.describe')"
                  >
                    <template slot-scope="dataUpd">
                      <el-button size="mini" type="warning" @click="dataUpdateAndSava(dataUpd.row)">{{ $t('common.edit') }}</el-button>
                    </template>
                  </el-table-column>
                </el-table-column>
              </el-table>
            </el-tab-pane>
          </el-tabs>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import sysconfig from './sysconfig'
export default {
  ...sysconfig
}
</script>
<style lang='scss' scoped >
  .app-main-container {
    padding: 15px;
    position: relative;
    height: 100%;
    width: 100%;

    .tab-pane {
      height: calc(100vh - 84px - 59px - 40px);
      display: flex;
      flex-direction: column;
    }

    .pagination-container {
      margin: 15px 0;
      padding: 0 5px;
    }
  }
  .sys-config-tree {
    height: calc(100vh - 84px - 20px - 57px);
  }
  .cardSty{
    .nameAndId{
    .el-input{
    position: relative;
    font-size: 15px;
    display: inline-block;
    width: 50%;
    }
    }
  }
  .selectChoose{
    width: 100px;
  }
  .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }
  .demo-table-expand {
    // font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
  .boxcard{
    height: 39vh;
  }
  .boxcard /deep/ .el-card__body{
    padding-top: 0;
    height: calc(39vh - 57px)
  }
  .boxcard /deep/ .el-tabs {
    height: calc(39vh - 57px);
  }
  .boxcard .el-tabs /deep/ .el-tab-pane {
    height: calc(39vh - 112px);
  }
  .box-cardT{
    height: 39vh;
  }
  .box-cardT /deep/ .el-card__body{
    overflow: auto;
    height: calc(39vh - 57px);
  }
  .el-tabs__nav-scroll{
display:none
  }
  .el-tabs__header is-top{
  display:none
  }
</style>
