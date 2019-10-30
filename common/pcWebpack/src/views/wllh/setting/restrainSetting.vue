约束设置
<template>
	<article  class="d-restrainBody">
    <div class="d-secLevel-hd d-zoom">
      <div></div>
      <div class="aui-flex-col aui-flex-right d-zoom">
        <div class="d-dropdown-item">
          <el-select
            v-model="condition.DP_ID"
            placeholder="请选择部门"
            size="mini"
            style="width: 160px;"
            filterable
            popper-class="d-selectUl-com"
            @change="selDeptment()"
            :disabled="!userInfo.isGlobal"
          >
            <el-option
              v-for="item in deptmentlist"
              :key="item.DP_ID"
              :label="item.Name"
              :value="item.DP_ID"
            ></el-option>
          </el-select>
        </div>
      </div>
    </div>

    <section class="d-restrainMain d-inputStyle">
      <div
        class="d-table-noTxt"
        v-if="results.WarnParamsList.length == 0 || results.WarnParamsList == null"
      >暂无记录...</div>

      <div v-else>
        <div v-for="(warnItem,wIndex) in results.WarnParamsList" class="d-zoom" :key="wIndex">
          <div v-if="warnItem.ParamaType == 1" class="aui-flex-col aui-flex-middle d-item">
            <div class="d-restrLabel">
              <div class="d-name">值班经理/班长</div>
            </div>
            <div class="aui-flex-col d-resentry">
              <div class="aui-flex-item-4 check">
                每工班最少
                <el-input-number
                  v-model="warnItem.MinValue"
                  placeholder
                  size="mini"
                  :min="1"
                  class="aui-margin-l-10 aui-margin-r-10"
                ></el-input-number>人
              </div>

              <div class="aui-flex-item-4 aui-flex-col aui-flex-middle">
                <div class="d-radioBox aui-margin-l-15">
                  <el-radio-group v-model="warnItem.IsStop" size="mini">
                    <el-radio-button :label="true">停用</el-radio-button>
                    <el-radio-button :label="false">启用</el-radio-button>
                  </el-radio-group>
                </div>
                <div class="aui-flex-col aui-flex-middle text">
                  （&nbsp;超过
                  <el-input-number
                    v-model="warnItem.ErrorTimes"
                    placeholder
                    size="mini"
                    :min="0"
                    :max="10000"
                    :step="5"
                    class="aui-margin-l-10 aui-margin-r-10"
                    controls-position="right"
                  ></el-input-number>分钟泛红&nbsp;）
                </div>
              </div>

              <div class="aui-flex-item-4 aui-flex-col aui-flex-right check">
                <div class="aui-flex-col aui-flex-middle">
                  <span>处理流程</span>
                  <div class="aui-margin-l-15">
                    <el-select
                      v-model="warnItem.HandleFlow"
                      placeholder="请选择"
                      size="mini"
                      style="width: 140px;"
                      popper-class="d-selectUl-com"
                    >
                      <el-option
                        v-for="item in handleFlowData"
                        :key="item.value"
                        :label="item.name"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                  </div>
                </div>
                <div
                  class="d-btn-com aui-margin-l-15"
                  v-if="setBtnDisplay('save')"
                  @click="saveWarn(warnItem)"
                >
                  <i class="iconfont icon-save"></i>
                  <span>保存</span>
                </div>
              </div>
            </div>
          </div>

          <div v-if="warnItem.ParamaType == 2" class="aui-flex-col aui-flex-middle d-item">
            <div class="d-restrLabel">
              <div class="d-name">前台理货长</div>
            </div>
            <div class="aui-flex-col d-resentry">
              <div class="aui-flex-item-4 check">
                最大允许&nbsp;1&nbsp;人负责
                <el-input-number
                  v-model="warnItem.MaxValue"
                  placeholder
                  size="mini"
                  :min="1"
                  class="aui-margin-l-10 aui-margin-r-10"
                ></el-input-number>个泊位
              </div>

              <div class="aui-flex-item-4 aui-flex-col aui-flex-middle">
                <div class="d-radioBox aui-margin-l-15">
                  <el-radio-group v-model="warnItem.IsStop" size="mini">
                    <el-radio-button :label="true">停用</el-radio-button>
                    <el-radio-button :label="false">启用</el-radio-button>
                  </el-radio-group>
                </div>
                <div class="aui-flex-col aui-flex-middle text">
                  （&nbsp;超过
                  <el-input-number
                    v-model="warnItem.ErrorTimes"
                    placeholder
                    size="mini"
                    :min="0"
                    :max="10000"
                    :step="5"
                    class="aui-margin-l-10 aui-margin-r-10"
                    controls-position="right"
                  ></el-input-number>分钟泛红&nbsp;）
                </div>
              </div>

              <div class="aui-flex-item-4 aui-flex-col aui-flex-right check">
                <div class="aui-flex-col aui-flex-middle">
                  <span>处理流程</span>
                  <div class="aui-margin-l-15">
                    <el-select
                      v-model="warnItem.HandleFlow"
                      placeholder="请选择"
                      size="mini"
                      style="width: 140px;"
                      popper-class="d-selectUl-com"
                    >
                      <el-option
                        v-for="item in handleFlowData"
                        :key="item.value"
                        :label="item.name"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                  </div>
                </div>
                <div
                  class="d-btn-com aui-margin-l-15"
                  v-if="setBtnDisplay('save')"
                  @click="saveWarn(warnItem)"
                >
                  <i class="iconfont icon-save"></i>
                  <span>保存</span>
                </div>
              </div>
            </div>
          </div>

          <div v-if="warnItem.ParamaType == 3" class="aui-flex-col aui-flex-middle d-item">
            <div class="d-restrLabel">
              <div class="d-name">后台理货长</div>
            </div>
            <div class="aui-flex-col d-resentry">
              <div class="aui-flex-item-4 check">
                派工
                <el-input-number
                  v-model="warnItem.MinValue"
                  placeholder
                  size="mini"
                  :min="1"
                  class="aui-margin-l-10 aui-margin-r-10"
                ></el-input-number>至
                <el-input-number
                  v-model="warnItem.MaxValue"
                  placeholder
                  size="mini"
                  :min="1"
                  class="aui-margin-l-10 aui-margin-r-10"
                ></el-input-number>人
              </div>

              <div class="aui-flex-item-4 aui-flex-col aui-flex-middle">
                <div class="d-radioBox aui-margin-l-15">
                  <el-radio-group v-model="warnItem.IsStop" size="mini">
                    <el-radio-button :label="true">停用</el-radio-button>
                    <el-radio-button :label="false">启用</el-radio-button>
                  </el-radio-group>
                </div>
                <div class="aui-flex-col aui-flex-middle text">
                  （&nbsp;超过
                  <el-input-number
                    v-model="warnItem.ErrorTimes"
                    placeholder
                    size="mini"
                    :min="0"
                    :max="10000"
                    :step="5"
                    class="aui-margin-l-10 aui-margin-r-10"
                    controls-position="right"
                  ></el-input-number>分钟泛红&nbsp;）
                </div>
              </div>

              <div class="aui-flex-item-4 aui-flex-col aui-flex-right check">
                <div class="aui-flex-col aui-flex-middle">
                  <span>处理流程</span>
                  <div class="aui-margin-l-15">
                    <el-select
                      v-model="warnItem.HandleFlow"
                      placeholder="请选择"
                      size="mini"
                      style="width: 140px;"
                      popper-class="d-selectUl-com"
                    >
                      <el-option
                        v-for="item in handleFlowData"
                        :key="item.value"
                        :label="item.name"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                  </div>
                </div>
                <div
                  class="d-btn-com aui-margin-l-15"
                  v-if="setBtnDisplay('save')"
                  @click="saveWarn(warnItem)"
                >
                  <i class="iconfont icon-save"></i>
                  <span>保存</span>
                </div>
              </div>
            </div>
          </div>

          <div v-if="warnItem.ParamaType == 5" class="aui-flex-col aui-flex-middle d-item">
            <div class="d-restrLabel">
              <div class="d-name">顶岗人员</div>
            </div>
            <div class="aui-flex-col d-resentry" style="border-bottom: 0;padding: 15px 0 10px 0;">
              <div class="aui-flex-item-4 check">
                非就餐时间最大允许操作
                <el-input-number
                  v-model="warnItem.MaxValue"
                  placeholder
                  size="mini"
                  :min="1"
                  class="aui-margin-l-10 aui-margin-r-10"
                ></el-input-number>台桥机
              </div>

              <div class="aui-flex-item-4 aui-flex-col aui-flex-middle">
                <div class="d-radioBox aui-margin-l-15">
                  <el-radio-group v-model="warnItem.IsStop" size="mini">
                    <el-radio-button :label="true">停用</el-radio-button>
                    <el-radio-button :label="false">启用</el-radio-button>
                  </el-radio-group>
                </div>
                <div class="aui-flex-col aui-flex-middle text">
                  （&nbsp;超过
                  <el-input-number
                    v-model="warnItem.ErrorTimes"
                    placeholder
                    size="mini"
                    :min="0"
                    :max="10000"
                    :step="5"
                    class="aui-margin-l-10 aui-margin-r-10"
                    controls-position="right"
                  ></el-input-number>分钟泛红&nbsp;）
                </div>
              </div>

              <div class="aui-flex-item-4 aui-flex-col aui-flex-right check">
                <div class="aui-flex-col aui-flex-middle">
                  <span>处理流程</span>
                  <div class="aui-margin-l-15">
                    <el-select
                      v-model="warnItem.HandleFlow"
                      placeholder="请选择"
                      size="mini"
                      style="width: 140px;"
                      popper-class="d-selectUl-com"
                    >
                      <el-option
                        v-for="item in handleFlowData"
                        :key="item.value"
                        :label="item.name"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                  </div>
                </div>
                <div
                  class="d-btn-com aui-margin-l-15"
                  v-if="setBtnDisplay('save')"
                  @click="saveWarn(warnItem)"
                >
                  <i class="iconfont icon-save"></i>
                  <span>保存</span>
                </div>
              </div>
            </div>
          </div>

          <div v-if="warnItem.ParamaType == 4" class="aui-flex-col aui-flex-middle d-item">
            <div class="d-restrLabel">
              <div class="d-name"></div>
            </div>
            <div class="aui-flex-col d-resentry" style="border-bottom: 0;padding: 8px 0 0 0;">
              <div class="aui-flex-item-4 check">
                就餐时间最大允许操作
                <el-input-number
                  v-model="warnItem.MaxValue"
                  placeholder
                  size="mini"
                  :min="1"
                  class="aui-margin-l-10 aui-margin-r-10"
                ></el-input-number>台桥机
              </div>

              <div class="aui-flex-item-4 aui-flex-col aui-flex-middle">
                <div class="d-radioBox aui-margin-l-15">
                  <el-radio-group v-model="warnItem.IsStop" size="mini">
                    <el-radio-button :label="true">停用</el-radio-button>
                    <el-radio-button :label="false">启用</el-radio-button>
                  </el-radio-group>
                </div>
                <div class="aui-flex-col aui-flex-middle text">
                  （&nbsp;超过
                  <el-input-number
                    v-model="warnItem.ErrorTimes"
                    placeholder
                    size="mini"
                    :min="0"
                    :max="10000"
                    :step="5"
                    class="aui-margin-l-10 aui-margin-r-10"
                    controls-position="right"
                  ></el-input-number>分钟泛红&nbsp;）
                </div>
              </div>

              <div class="aui-flex-item-4 aui-flex-col aui-flex-right check">
                <div class="aui-flex-col aui-flex-middle">
                  <span>处理流程</span>
                  <div class="aui-margin-l-15">
                    <el-select
                      v-model="warnItem.HandleFlow"
                      placeholder="请选择"
                      size="mini"
                      style="width: 140px;"
                      popper-class="d-selectUl-com"
                    >
                      <el-option
                        v-for="item in handleFlowData"
                        :key="item.value"
                        :label="item.name"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                  </div>
                </div>
                <div
                  class="d-btn-com aui-margin-l-15"
                  v-if="setBtnDisplay('save')"
                  @click="saveWarn(warnItem)"
                >
                  <i class="iconfont icon-save"></i>
                  <span>保存</span>
                </div>
              </div>
            </div>
          </div>

          <div v-if="warnItem.id == wIndex" class="aui-flex-col aui-flex-middle d-item">
            <div class="d-restrLabel">
              <div class="d-name"></div>
            </div>
            <div
              class="aui-flex-col aui-flex-middle d-resentry"
              style="border-bottom: 0;padding: 8px 0;"
            >
              <div
                v-for="(tItem,index) in warnItem.MealTimesList"
                :key="index"
                class="aui-flex-col aui-flex-middle aui-flex-item-12 aui-margin-t-15 aui-margin-b-15"
              >
                <div class="aui-flex-item-4 check">
                  <div class="aui-flex-col aui-flex-middle">
                    <!--<span class="check">就餐时间&nbsp;</span>-->
                    <span>{{tItem.Des}}</span>
                    （&nbsp;
                    <div class="aui-flex-col aui-flex-item-9 d-resSetTime">
                      <div class="aui-flex-item-5">
                        <el-time-select
                          placeholder="开始时间"
                          size="mini"
                          v-model="tItem.StartTime"
                          popper-class="d-selectUl-com"
                          class="d-width-100"
                          :picker-options="{
												      start: '00:00',
												      step: '00:15',
												      end: '23:59'
												    }"
                        ></el-time-select>
                      </div>
                      <div
                        class="aui-flex-item-1 aui-flex-col aui-flex-center"
                        style="padding-top: 3px;"
                      >-</div>
                      <div class="aui-flex-item-5">
                        <el-time-select
                          placeholder="结束时间"
                          size="mini"
                          v-model="tItem.EndTime"
                          popper-class="d-selectUl-com"
                          class="d-width-100"
                          :picker-options="{
												      start: '00:00',
												      step: '00:15',
												      end: '23:59'
												    }"
                        ></el-time-select>
                      </div>
                    </div>
&nbsp;）
                  </div>
                </div>

                <div class="aui-flex-item-4 aui-flex-col aui-flex-middle">
                  <div class="d-radioBox aui-margin-l-15">
                    <el-radio-group v-model="tItem.IsStop" size="mini">
                      <el-radio-button :label="true">停用</el-radio-button>
                      <el-radio-button :label="false">启用</el-radio-button>
                    </el-radio-group>
                  </div>
                </div>

                <div class="aui-flex-item-4 aui-flex-col aui-flex-right check">
                  <div class="d-btn-com aui-margin-l-15" @click="saveDate(tItem)">
                    <i class="iconfont icon-save"></i>
                    <span>保存</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div v-if="warnItem.ParamaType == 7" class="aui-flex-col aui-flex-middle d-item">
            <div class="d-restrLabel">
              <div class="d-name"></div>
            </div>
            <div class="aui-flex-col d-resentry" style="border-bottom: 0;padding: 5px 0 8px 0;">
              <div class="aui-flex-item-4 check">
                单次顶岗最多不超过
                <el-input-number
                  v-model="warnItem.MaxValue"
                  placeholder
                  size="mini"
                  :min="0"
                  :max="10000"
                  class="aui-margin-l-10 aui-margin-r-10"
                  controls-position="right"
                ></el-input-number>分钟
              </div>

              <div class="aui-flex-item-4 aui-flex-col aui-flex-middle">
                <div class="d-radioBox aui-margin-l-15">
                  <el-radio-group v-model="warnItem.IsStop" size="mini">
                    <el-radio-button :label="true">停用</el-radio-button>
                    <el-radio-button :label="false">启用</el-radio-button>
                  </el-radio-group>
                </div>
              </div>

              <div class="aui-flex-item-4 aui-flex-col aui-flex-right check">
                <div class="aui-flex-col aui-flex-middle">
                  <span>处理流程</span>
                  <div class="aui-margin-l-15">
                    <el-select
                      v-model="warnItem.HandleFlow"
                      placeholder="请选择"
                      size="mini"
                      style="width: 140px;"
                      popper-class="d-selectUl-com"
                    >
                      <el-option
                        v-for="item in handleFlowData"
                        :key="item.value"
                        :label="item.name"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                  </div>
                </div>
                <div
                  class="d-btn-com aui-margin-l-15"
                  v-if="setBtnDisplay('save')"
                  @click="saveWarn(warnItem)"
                >
                  <i class="iconfont icon-save"></i>
                  <span>保存</span>
                </div>
              </div>
            </div>
          </div>

          <div v-if="warnItem.ParamaType == 8" class="aui-flex-col aui-flex-middle d-item">
            <div class="d-restrLabel">
              <div class="d-name"></div>
            </div>
            <div class="aui-flex-col d-resentry">
              <div class="aui-flex-item-4 check">
                一个工班内顶岗最多不超过
                <el-input-number
                  v-model="warnItem.MaxValue"
                  placeholder
                  size="mini"
                  :min="0"
                  :max="10000"
                  class="aui-margin-l-10 aui-margin-r-10"
                  controls-position="right"
                ></el-input-number>分钟
              </div>

              <div class="aui-flex-item-4 aui-flex-col aui-flex-middle">
                <div class="d-radioBox aui-margin-l-15">
                  <el-radio-group v-model="warnItem.IsStop" size="mini">
                    <el-radio-button :label="true">停用</el-radio-button>
                    <el-radio-button :label="false">启用</el-radio-button>
                  </el-radio-group>
                </div>
              </div>

              <div class="aui-flex-item-4 aui-flex-col aui-flex-right check">
                <div class="aui-flex-col aui-flex-middle">
                  <span>处理流程</span>
                  <div class="aui-margin-l-15">
                    <el-select
                      v-model="warnItem.HandleFlow"
                      placeholder="请选择"
                      size="mini"
                      style="width: 140px;"
                      popper-class="d-selectUl-com"
                    >
                      <el-option
                        v-for="item in handleFlowData"
                        :key="item.value"
                        :label="item.name"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                  </div>
                </div>
                <div
                  class="d-btn-com aui-margin-l-15"
                  v-if="setBtnDisplay('save')"
                  @click="saveWarn(warnItem)"
                >
                  <i class="iconfont icon-save"></i>
                  <span>保存</span>
                </div>
              </div>
            </div>
          </div>

          <div v-if="warnItem.ParamaType == 9" class="aui-flex-col aui-flex-middle d-item">
            <div class="d-restrLabel">
              <div class="d-name">岗位职位安排</div>
            </div>
            <div class="aui-flex-col aui-flex-middle d-resentry">
              <div class="aui-flex-item-4 check">从低岗位到高岗位报警</div>
              <div class="aui-flex-item-4 aui-flex-col aui-flex-middle">
                <div class="d-radioBox aui-margin-l-15">
                  <el-radio-group v-model="warnItem.IsStop" size="mini">
                    <el-radio-button :label="true">停用</el-radio-button>
                    <el-radio-button :label="false">启用</el-radio-button>
                  </el-radio-group>
                </div>
              </div>

              <div class="aui-flex-item-4 aui-flex-col aui-flex-right check">
                <div class="aui-flex-col aui-flex-middle">
                  <span>处理流程</span>
                  <div class="aui-margin-l-15">
                    <el-select
                      v-model="warnItem.HandleFlow"
                      placeholder="请选择"
                      size="mini"
                      style="width: 140px;"
                      popper-class="d-selectUl-com"
                    >
                      <el-option
                        v-for="item in handleFlowData"
                        :key="item.value"
                        :label="item.name"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                  </div>
                </div>
                <div
                  class="d-btn-com aui-margin-l-15"
                  v-if="setBtnDisplay('save')"
                  @click="saveWarn(warnItem)"
                >
                  <i class="iconfont icon-save"></i>
                  <span>保存</span>
                </div>
              </div>
            </div>
          </div>

          <div v-if="warnItem.ParamaType == 0" class="aui-flex-col aui-flex-middle d-item">
            <div class="d-restrLabel">
              <div class="d-name">操控员</div>
            </div>
            <div class="aui-flex-col d-resentry" style="border-bottom: 0;padding: 15px 0 10px 0;">
              <div class="aui-flex-item-4 check">
                最大允许操作
                <el-input-number
                  v-model="warnItem.MaxValue"
                  placeholder
                  size="mini"
                  :min="1"
                  class="aui-margin-l-10 aui-margin-r-10"
                ></el-input-number>台桥机
              </div>

              <div class="aui-flex-item-4 aui-flex-col">
                <div class="d-radioBox aui-margin-l-15">
                  <el-radio-group v-model="warnItem.IsStop" size="mini">
                    <el-radio-button :label="true">停用</el-radio-button>
                    <el-radio-button :label="false">启用</el-radio-button>
                  </el-radio-group>
                </div>
                <div class="aui-flex-col aui-flex-middle text">
                  （&nbsp;超过
                  <el-input-number
                    v-model="warnItem.ErrorTimes"
                    placeholder
                    size="mini"
                    :min="0"
                    :max="10000"
                    :step="5"
                    class="aui-margin-l-10 aui-margin-r-10"
                    controls-position="right"
                  ></el-input-number>分钟泛红&nbsp;）
                </div>
              </div>

              <div class="aui-flex-item-4 aui-flex-col aui-flex-right check">
                <div class="aui-flex-col aui-flex-middle">
                  <span>处理流程</span>
                  <div class="aui-margin-l-15">
                    <el-select
                      v-model="warnItem.HandleFlow"
                      placeholder="请选择"
                      size="mini"
                      style="width: 140px;"
                      popper-class="d-selectUl-com"
                    >
                      <el-option
                        v-for="item in handleFlowData"
                        :key="item.value"
                        :label="item.name"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                  </div>
                </div>
                <div
                  class="d-btn-com aui-margin-l-15"
                  v-if="setBtnDisplay('save')"
                  @click="saveWarn(warnItem)"
                >
                  <i class="iconfont icon-save"></i>
                  <span>保存</span>
                </div>
              </div>
            </div>
          </div>

          <div v-if="warnItem.ParamaType == 12" class="aui-flex-col aui-flex-middle d-item">
            <div class="d-restrLabel">
              <div class="d-name"></div>
            </div>
            <div class="aui-flex-col d-resentry">
              <div class="aui-flex-item-4 check">
                单路最多允许
                <el-input-number
                  v-model="warnItem.MaxValue"
                  placeholder
                  size="mini"
                  :min="1"
                  :max="100"
                  class="aui-margin-l-10 aui-margin-r-10"
                ></el-input-number>条指令未操作
              </div>

              <div class="aui-flex-item-4 aui-flex-col aui-flex-middle">
                <div class="d-radioBox aui-margin-l-15">
                  <el-radio-group v-model="warnItem.IsStop" size="mini">
                    <el-radio-button :label="true">停用</el-radio-button>
                    <el-radio-button :label="false">启用</el-radio-button>
                  </el-radio-group>
                </div>
                <div class="aui-flex-col aui-flex-middle text">
                  （&nbsp;超过
                  <el-input-number
                    v-model="warnItem.ErrorTimes"
                    placeholder
                    size="mini"
                    :min="0"
                    :max="10000"
                    :step="5"
                    class="aui-margin-l-10 aui-margin-r-10"
                    controls-position="right"
                  ></el-input-number>分钟泛红&nbsp;）
                </div>
              </div>

              <div class="aui-flex-item-4 aui-flex-col aui-flex-right check">
                <div class="aui-flex-col aui-flex-middle">
                  <span>处理流程</span>
                  <div class="aui-margin-l-15">
                    <el-select
                      v-model="warnItem.HandleFlow"
                      placeholder="请选择"
                      size="mini"
                      style="width: 140px;"
                      popper-class="d-selectUl-com"
                    >
                      <el-option
                        v-for="item in handleFlowData"
                        :key="item.value"
                        :label="item.name"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                  </div>
                </div>
                <div
                  class="d-btn-com aui-margin-l-15"
                  v-if="setBtnDisplay('save')"
                  @click="saveWarn(warnItem)"
                >
                  <i class="iconfont icon-save"></i>
                  <span>保存</span>
                </div>
              </div>
            </div>
          </div>

          <div v-if="warnItem.ParamaType == 11" class="aui-flex-col aui-flex-middle d-item">
            <div class="d-restrLabel">
              <div class="d-name"></div>
            </div>
            <div class="aui-flex-col d-resentry" style="border-bottom: 0;padding: 10px 0;">
              <div class="aui-flex-item-4 check">
                每个箱子必须在
                <el-input-number
                  v-model="warnItem.MaxValue"
                  placeholder
                  size="mini"
                  :min="0"
                  :max="10000"
                  class="aui-margin-l-10 aui-margin-r-10"
                ></el-input-number>分钟内完成
              </div>

              <div class="aui-flex-item-4 aui-flex-col aui-flex-middle">
                <div class="d-radioBox aui-margin-l-15">
                  <el-radio-group v-model="warnItem.IsStop" size="mini">
                    <el-radio-button :label="true">停用</el-radio-button>
                    <el-radio-button :label="false">启用</el-radio-button>
                  </el-radio-group>
                </div>
                <div class="aui-flex-col aui-flex-middle text">
                  （&nbsp;超过
                  <el-input-number
                    v-model="warnItem.ErrorTimes"
                    placeholder
                    size="mini"
                    :min="0"
                    :max="10000"
                    :step="5"
                    class="aui-margin-l-10 aui-margin-r-10"
                    controls-position="right"
                  ></el-input-number>分钟泛红&nbsp;）
                </div>
              </div>

              <div class="aui-flex-item-4 aui-flex-col aui-flex-right check">
                <div class="aui-flex-col aui-flex-middle">
                  <span>处理流程</span>
                  <div class="aui-margin-l-15">
                    <el-select
                      v-model="warnItem.HandleFlow"
                      placeholder="请选择"
                      size="mini"
                      style="width: 140px;"
                      popper-class="d-selectUl-com"
                    >
                      <el-option
                        v-for="item in handleFlowData"
                        :key="item.value"
                        :label="item.name"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                  </div>
                </div>
                <div
                  class="d-btn-com aui-margin-l-15"
                  v-if="setBtnDisplay('save')"
                  @click="saveWarn(warnItem)"
                >
                  <i class="iconfont icon-save"></i>
                  <span>保存</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </article>
</template>

<script>

let userInfo = jsTools.SessionStorage.getVal("loginUser");

export default {
  
  data() {
    return {
      userInfo: userInfo,
      deptmentlist: userInfo.Deptmentlist,
      results: {
        WarnParamsList: [],
        MealQuery: {
          MealTimesList: []
        }
      },
      model: {
        ParamaType: null, //报警参数
        MinValue: null,
        MaxValue: null,
        ErrorTimes: null, //超时泛红
        HandleFlow: null, //处理流程
        Des: null,
        IsStop: false //是否停用
      },
      condition: {
        DP_ID: userInfo.Department.DP_ID //默认设的部门
      },
      handleFlowData: jsEnum.handleFlowList
    };
  },
  computed: {},
  mounted: function() {
    this.getRetrainList(this.condition);
  },
  filters: {},
  methods: {
    //根据权限设置页面按钮是否显示
    setBtnDisplay: function(code) {
      if (jsRes.getPowerButtons(code)) return true;
      else return false;
    },
    selDeptment: function() {
      getRetrainList(vm.condition);
    },
    saveWarn: function(item) {
      //保存约束信息
      if (item.ParamaType != 7 && item.ParamaType != 8) {
        if (item.ErrorTimes == null || item.ErrorTimes == "") {
          jsTools.Alertify.msgTip("error", "请输入泛红分钟限制");
          return;
        }
      }

      var dat = {
        serviceName: jsRes.Server.WarnParamsModifyService,
        data: {
          Parameter: item
        }
      };

      jsTools.ajax(dat, function(result) {
        jsTools.Alertify.msgTip("success", "保存成功");
      });
    },
    saveDate: function(item) {
      //保存时间信息
      if (item.StartTime == null || item.StartTime == "") {
        jsTools.Alertify.msgTip("error", "请输入开始时间");
        return;
      }

      if (item.EndTime == null || item.EndTime == "") {
        jsTools.Alertify.msgTip("error", "请输入结束时间");
        return;
      }

      var dat = {
        serviceName: jsRes.Server.MealTimesModifyService,
        data: {
          Parameter: item
        }
      };

      jsTools.ajax(dat, function(result) {
        jsTools.Alertify.msgTip("success", "保存成功");
      });
    },
    search: function() {
      getRetrainList(this.condition);
    },
    getRetrainList(ret) {
      //根据部门获取约束信息
      var dat = {
        title: "检索中...",
        serviceName: jsRes.Server.WarnParamsQueryService,
        data: {
          Parameter: ret.DP_ID
        }
      };

      jsTools.ajax(dat, result => {
        result.MealTimesList.map(function(time) {
          time.StartTime = time.StartTime.substr(0, 5);
          time.EndTime = time.EndTime.substr(0, 5);
        });

        var timeArr = {
          id: 5,
          MealTimesList: result.MealTimesList
        };
        this.results.WarnParamsList = result.WarnParamsList;
        this.results.WarnParamsList.splice(5, 0, timeArr);
      });
    }
  }
};

function Intercept(ret) {
  return ret.slice(0, 5);
}
</script>