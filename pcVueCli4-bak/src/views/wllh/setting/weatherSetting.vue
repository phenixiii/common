// 天气设置
<template>
  <article id="div-body" class="d-weatherBody">
    <section class="d-secLevel-hd d-zoom" id="secLevelDiv">
      <div class="aui-flex-item-12 d-flex-right">
        <div class="aui-margin-l-15 d-searchtime" style="width: 260px;">
          <div class="aui-flex-item-5-5">
            <el-date-picker
              size="mini"
              v-model="condition.WeaDateStart"
              type="date"
              popper-class="d-selectUl-com"
              class="d-width-100"
              prefix-icon="el-icon-date"
              placeholder="开始日期"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </div>
          <div class="aui-flex-item-1 d-float-left d-text-center">
            <div style="line-height: 28px;">-</div>
          </div>
          <div class="aui-flex-item-5-5">
            <el-date-picker
              size="mini"
              v-model="condition.WeaDateEndReal"
              type="date"
              popper-class="d-selectUl-com"
              class="d-width-100"
              prefix-icon="el-icon-date"
              placeholder="结束日期"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </div>
        </div>
        <div class="d-addWrap d-margin-l-10">
          <div class="d-btn-com" @click="search()">
            <i class="iconfont icon-search"></i>
            <span>查询</span>
          </div>
        </div>
      </div>
    </section>

    <div class="d-weatherMain" id="weatherMainDiv">
      <div
        v-if="results.WeatherList.length == 0 || results.WeatherList == null"
        class="d-weathNoDate"
      >
        <div class="d-weatherAdd-li">
          <div
            class="aui-flex-col aui-flex-center aui-flex-middle item"
            v-if="setBtnDisplay('add')"
            @click="add()"
          >
            <i class="iconfont icon-add"></i>添加
          </div>
        </div>
        <!--<div class="d-table-noTxt">暂无记录...</div>-->
      </div>

      <div v-else class="d-height-100">
        <ul class="d-weather-bd d-zoom">
          <li class="item d-addwea d-font-size-20" v-if="setBtnDisplay('add')" @click="add()">
            <i class="iconfont icon-add"></i>添加
          </li>
          <li class="item" v-for="(item,i) in results.WeatherList" :key="i">
            <div class="d-tit">{{item.WeaDate | dateFormat}}</div>
            <div class="d-wericon">
              <i class="iconfont" :class="weatherIcon(item)"></i>
            </div>
            <div>
              {{item.WeatherTypeCaption}}
              <span
                v-if="item.CurrentWeather != '' && item.CurrentWeather != null"
              >/{{item.CurrentWeather}}</span>
            </div>
            <div class="d-wealight">{{item.MinTemp}}~{{item.MaxTemp}}℃</div>
            <div
              style="min-height: 17px;"
            >{{item.WindDirection}}&nbsp;{{item.WindPower}}级&nbsp;&nbsp;{{item.AirQty}}</div>
            <div
              v-if="item.WeatherWarnLevel != null"
              class="d-airQtybox"
              :class="classLi(item.WeatherWarnLevel)"
            >
              <span>{{item.WeatherWarnTypeCaption}} {{item.WeatherWarnLevelCaption}}</span>
            </div>
            <div
              v-if="item.WeatherWarnLevel2 != null"
              class="d-airQtybox"
              :class="classLi(item.WeatherWarnLevel2)"
            >
              <span>{{item.WeatherWarnTypeCaption2}} {{item.WeatherWarnLevelCaption2}}</span>
            </div>
            <div
              v-if="item.WeatherWarnLevel3 != null"
              class="d-airQtybox"
              :class="classLi(item.WeatherWarnLevel3)"
            >
              <span>{{item.WeatherWarnTypeCaption3}} {{item.WeatherWarnLevelCaption3}}</span>
            </div>
            <div
              v-if="item.WeatherWarnLevel4 != null"
              class="d-airQtybox"
              :class="classLi(item.WeatherWarnLevel4)"
            >
              <span>{{item.WeatherWarnTypeCaption4}} {{item.WeatherWarnLevelCaption4}}</span>
            </div>
            <div class="d-wearemove" v-if="setBtnDisplay('delete')" @click="del(item)">
              <div class="d-inner">
                <i class="iconfont icon-close"></i>
              </div>
            </div>
            <div class="d-weaedit" v-if="setBtnDisplay('edit')" @click="edit(item)">
              <span>
                <i class="iconfont icon-edit"></i>编辑
              </span>
            </div>
          </li>
        </ul>

        <div class="d-pagingWrap">
          <c-paging :results="results" @searchclick="search"></c-paging>
        </div>
      </div>
    </div>

    <!--弹出框 -->
    <div class="d-popupBox" v-if="isAlert">
      <section class="d-body">
        <div class="d-popheader">
          <div v-if="popupType == 'add'" class="d-tit">新增天气</div>
          <div v-if="popupType == 'edit'" class="d-tit">编辑天气</div>
          <span class="close" @click="closeAlert">
            <i class="iconfont icon-close"></i>
          </span>
          <div class="line"></div>
        </div>
        <div class="d-popform">
          <div class="aui-flex-col d-setweather-bd">
            <div class="aui-flex-item-6 aui-flex-col aui-flex-middle aui-margin-b-15">
              <div class="aui-flex-item-4 d-label">日期：</div>
              <div class="aui-flex-item-7 d-input-hor">
                <el-date-picker
                  size="mini"
                  v-if="popupType == 'add'"
                  v-model="model.WeaDate"
                  type="date"
                  value-format="yyyy-MM-dd"
                  prefix-icon="el-icon-date"
                  popper-class="d-selectUl-dialog"
                  class="d-width-100"
                  :picker-options="pickerDisabledRange"
                  @change="getWeatherApi()"
                ></el-date-picker>

                <el-date-picker
                  size="mini"
                  v-if="popupType == 'edit'"
                  v-model="model.WeaDate"
                  type="date"
                  value-format="yyyy-MM-dd"
                  prefix-icon="el-icon-date"
                  popper-class="d-selectUl-dialog"
                  class="d-width-100"
                  :picker-options="pickerDisabledRange"
                  disabled
                  editable
                ></el-date-picker>
              </div>
              <div class="aui-flex-item-auto" @click="getWeatherApi()">
                <span>&nbsp;</span>
              </div>
            </div>

            <div class="aui-flex-item-6 aui-flex-col aui-flex-middle aui-margin-b-15">
              <div class="aui-flex-item-4 d-label">天气1：</div>
              <div class="aui-flex-item-7 d-input-hor">
                <el-select
                  v-model="model.WeatherType"
                  placeholder="请选择"
                  size="mini"
                  popper-class="d-selectUl-dialog"
                  class="d-width-100"
                >
                  <el-option
                    v-for="item in weatherData"
                    :key="item.value"
                    :label="item.name"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </div>
            </div>

            <div class="aui-flex-item-6 aui-flex-col aui-flex-middle aui-margin-b-15">
              <div class="aui-flex-item-4 d-label">最低温度：</div>
              <div class="aui-flex-item-7 d-input-hor">
                <el-input-number
                  v-model="model.MinTemp"
                  size="mini"
                  placeholder="请输入最低温度"
                  @change="checkMinTemp(model.MinTemp)"
                  :step="2"
                  :max="50"
                  class="d-width-100"
                ></el-input-number>
              </div>
              <div class="aui-flex-auto">&nbsp;℃</div>
            </div>

            <div class="aui-flex-item-6 aui-flex-col aui-flex-middle aui-margin-b-15">
              <div class="aui-flex-item-4 d-label">天气2：</div>
              <div class="aui-flex-item-7 d-input-hor">
                <el-input v-model="model.CurrentWeather" size="mini" placeholder="请输入"></el-input>
                <!--<el-select v-model="model.CurrentWeather" placeholder="请选择" size="mini" popper-class="d-selectUl-dialog" class="d-width-100" filterable>
										<el-option v-for="item in CurrentWeatherData" :key="item.value" :label="item.name" :value="item.value">
										</el-option>
                </el-select>-->
              </div>
            </div>

            <div class="aui-flex-item-6 aui-flex-col aui-flex-middle aui-margin-b-15">
              <div class="aui-flex-item-4 d-label">最高温度：</div>
              <div class="aui-flex-item-7 d-input-hor">
                <el-input-number
                  v-model="model.MaxTemp"
                  size="mini"
                  placeholder="请输入最高温度"
                  :min="0"
                  :max="50"
                  class="d-width-100"
                ></el-input-number>
              </div>
              <div class="aui-flex-auto">&nbsp;℃</div>
            </div>

            <div class="aui-flex-item-6 aui-flex-col aui-flex-middle aui-margin-b-15">
              <div class="aui-flex-item-4 d-label">风向：</div>
              <div class="aui-flex-item-7 d-input-hor">
                <el-input v-model="model.WindDirection" size="mini" placeholder="请输入风向"></el-input>
              </div>
            </div>

            <div class="aui-flex-item-6 aui-flex-col aui-flex-middle aui-margin-b-15">
              <div class="aui-flex-item-4 d-label">风力：</div>
              <div class="aui-flex-item-7 d-input-hor">
                <el-input v-model="model.WindPower" size="mini" placeholder="风力"></el-input>
              </div>
              <div class="aui-flex-auto"></div>
            </div>

            <div class="aui-flex-item-6 aui-flex-col aui-flex-middle aui-margin-b-15">
              <div class="aui-flex-item-4 d-label">空气质量：</div>
              <div class="aui-flex-item-7 d-input-hor">
                <el-select
                  v-model="model.AirQty"
                  placeholder="请选择"
                  size="mini"
                  popper-class="d-selectUl-dialog"
                  class="d-width-100"
                >
                  <el-option
                    v-for="item in AirQtyData"
                    :key="item.name"
                    :label="item.name"
                    :value="item.name"
                  >
                    <!--<span class="d-float-left">{{ item.name }}</span>
                    <span class="d-float-right" style="color: #8492a6; font-size: 13px">{{ item.value }}</span>-->
                  </el-option>
                </el-select>
              </div>
            </div>

            <div class="aui-flex-item-6 aui-flex-col aui-flex-middle aui-margin-b-15">
              <div class="aui-flex-item-4 d-label">预警类型1：</div>
              <div class="aui-flex-item-7 d-input-hor">
                <el-select
                  v-model="model.WeatherWarnType"
                  clearable
                  placeholder="请选择"
                  size="mini"
                  popper-class="d-selectUl-dialog"
                  class="d-width-100"
                >
                  <el-option
                    v-for="item in weaWarnTypeData"
                    :key="item.value"
                    :label="item.name"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </div>
            </div>

            <div class="aui-flex-item-6 aui-flex-col aui-flex-middle aui-margin-b-15">
              <div class="aui-flex-item-4 d-label">预警级别1：</div>
              <div class="aui-flex-item-7 d-input-hor">
                <el-select
                  v-model="model.WeatherWarnLevel"
                  clearable
                  placeholder="请选择"
                  size="mini"
                  popper-class="d-selectUl-dialog"
                  class="d-width-100"
                >
                  <el-option
                    v-for="item in weaWarnlevelData"
                    :key="item.value"
                    :label="item.name"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </div>
            </div>

            <div class="aui-flex-item-6 aui-flex-col aui-flex-middle aui-margin-b-15">
              <div class="aui-flex-item-4 d-label">预警类型2：</div>
              <div class="aui-flex-item-7 d-input-hor">
                <el-select
                  v-model="model.WeatherWarnType2"
                  clearable
                  placeholder="请选择"
                  size="mini"
                  popper-class="d-selectUl-dialog"
                  class="d-width-100"
                >
                  <el-option
                    v-for="item in weaWarnTypeData"
                    :key="item.value"
                    :label="item.name"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </div>
            </div>

            <div class="aui-flex-item-6 aui-flex-col aui-flex-middle aui-margin-b-15">
              <div class="aui-flex-item-4 d-label">预警级别2：</div>
              <div class="aui-flex-item-7 d-input-hor">
                <el-select
                  v-model="model.WeatherWarnLevel2"
                  clearable
                  placeholder="请选择"
                  size="mini"
                  popper-class="d-selectUl-dialog"
                  class="d-width-100"
                >
                  <el-option
                    v-for="item in weaWarnlevelData"
                    :key="item.value"
                    :label="item.name"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </div>
            </div>

            <div class="aui-flex-item-6 aui-flex-col aui-flex-middle aui-margin-b-15">
              <div class="aui-flex-item-4 d-label">预警类型3：</div>
              <div class="aui-flex-item-7 d-input-hor">
                <el-select
                  v-model="model.WeatherWarnType3"
                  clearable
                  placeholder="请选择"
                  size="mini"
                  popper-class="d-selectUl-dialog"
                  class="d-width-100"
                >
                  <el-option
                    v-for="item in weaWarnTypeData"
                    :key="item.value"
                    :label="item.name"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </div>
            </div>

            <div class="aui-flex-item-6 aui-flex-col aui-flex-middle aui-margin-b-15">
              <div class="aui-flex-item-4 d-label">预警级别3：</div>
              <div class="aui-flex-item-7 d-input-hor">
                <el-select
                  v-model="model.WeatherWarnLevel3"
                  clearable
                  placeholder="请选择"
                  size="mini"
                  popper-class="d-selectUl-dialog"
                  class="d-width-100"
                >
                  <el-option
                    v-for="item in weaWarnlevelData"
                    :key="item.value"
                    :label="item.name"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </div>
            </div>

            <div class="aui-flex-item-6 aui-flex-col aui-flex-middle aui-margin-b-15">
              <div class="aui-flex-item-4 d-label">预警类型4：</div>
              <div class="aui-flex-item-7 d-input-hor">
                <el-select
                  v-model="model.WeatherWarnType4"
                  clearable
                  placeholder="请选择"
                  size="mini"
                  popper-class="d-selectUl-dialog"
                  class="d-width-100"
                >
                  <el-option
                    v-for="item in weaWarnTypeData"
                    :key="item.value"
                    :label="item.name"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </div>
            </div>

            <div class="aui-flex-item-6 aui-flex-col aui-flex-middle aui-margin-b-15">
              <div class="aui-flex-item-4 d-label">预警级别4：</div>
              <div class="aui-flex-item-7 d-input-hor">
                <el-select
                  v-model="model.WeatherWarnLevel4"
                  clearable
                  placeholder="请选择"
                  size="mini"
                  popper-class="d-selectUl-dialog"
                  class="d-width-100"
                >
                  <el-option
                    v-for="item in weaWarnlevelData"
                    :key="item.value"
                    :label="item.name"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </div>
            </div>

            <div class="aui-flex-item-6 aui-flex-col aui-flex-middle aui-margin-b-15">
              <div class="aui-flex-item-4 d-label">发布公告等级：</div>
              <div class="aui-flex-item-7 d-input-hor">
                <el-select
                  v-model="model.ImportantLevel"
                  clearable
                  placeholder="请选择"
                  size="mini"
                  popper-class="d-selectUl-dialog"
                  class="d-width-100"
                >
                  <el-option
                    v-for="item in importantLevelData"
                    :key="item.value"
                    :label="item.name"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </div>
            </div>

            <div class="aui-flex-item-6 aui-flex-col aui-flex-middle aui-margin-b-15">
              <div class="aui-flex-item-4 d-label">发布起始时间：</div>
              <div class="aui-flex-item-7 d-input-hor">
                <el-date-picker
                  size="mini"
                  v-model="model.TopStartTime"
                  type="datetime"
                  format="yyyy-MM-dd HH:mm:ss"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  class="d-width-100"
                  prefix-icon="el-icon-date"
                  style="font-size: 12px;"
                ></el-date-picker>
              </div>
            </div>

            <div class="aui-flex-item-6 aui-flex-col aui-flex-middle aui-margin-b-15">
              <div class="aui-flex-item-4 d-label">发布结束时间：</div>
              <div class="aui-flex-item-7 d-input-hor">
                <el-date-picker
                  size="mini"
                  v-model="model.TopEndTime"
                  type="datetime"
                  format="yyyy-MM-dd HH:mm:ss"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  class="d-width-100"
                  prefix-icon="el-icon-date"
                  style="font-size: 12px;"
                ></el-date-picker>
              </div>
            </div>

            <div class="aui-flex-item-12 aui-flex-col aui-flex-middle">
              <div class="aui-flex-item-2 d-label">描述：</div>
              <div class="aui-flex-item-8 d-input-hor">
                <el-input
                  type="textarea"
                  :rows="2"
                  v-model="model.WeaDesInfo"
                  size="mini"
                  placeholder
                ></el-input>
              </div>
              <div class="aui-flex-item-2 aui-flex-col aui-flex-center">
                <div class="btn d-linkR aui-margin-r-15" @click="deliver(model)">
                  <i class="iconfont icon-deliver"></i>&nbsp;发布
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="d-popfoot">
          <div class="d-inner">
            <div class="btn d-save" @click="save(model)">
              <i class="iconfont icon-save"></i>&nbsp;确定
            </div>
            <div class="btn d-cancel" @click="closeAlert">
              <i class="iconfont icon-close"></i>&nbsp;取消
            </div>
          </div>
        </div>
      </section>
    </div>
  </article>
</template>

<script>

import cPaging from "@/components/cPaging";

let userInfo = jsTools.SessionStorage.getVal("loginUser");

export default {
  components: { cPaging },
  data() {
    return {
      userInfo: userInfo,
      condition: {
        WeatherType: null, //天气类型
        WeaDateStart: null, //开始日期
        WeaDateEnd: null, //结束日期
        WeaDateEndReal: null,
        CurrentPage: 1
      },
      results: {
        WeatherList: []
      },
      model: {
        WeaDate: null,
        CurrentWeather: null,
        WeatherType: null,
        MinTemp: null,
        MaxTemp: null,
        WindDirection: null,
        WindPower: null,
        AirQty: null,
        WeaDesInfo: null,
        WeatherWarnLevel: null,
        WeatherWarnLevel2: null,
        WeatherWarnLevel3: null,
        WeatherWarnLevel4: null,
        WeatherWarnType: null,
        WeatherWarnType2: null,
        WeatherWarnType3: null,
        WeatherWarnType4: null
      },
      isAlert: false,
      popupType: "hide",
      //					CurrentWeatherData: jsEnum.CurrentWeather, //实时天气
      weatherData: jsEnum.WeatherTypeList,
      weaWarnlevelData: jsEnum.WeatherWarnlevel, //天气预警级别
      weaWarnTypeData: jsEnum.WeatherWarnType, //天气预警类型
      importantLevelData: jsEnum.ImportantLevel, //公告等级
      AirQtyData: [
        {
          name: "优",
          value: "(Ⅰ)"
        },
        {
          name: "良",
          value: "(Ⅱ)"
        },
        {
          name: "轻度污染",
          value: "(Ⅲ)"
        },
        {
          name: "中度污染",
          value: "(Ⅳ)"
        },
        {
          name: "重度污染",
          value: "(Ⅴ)"
        },
        {
          name: "严重污染",
          value: "(Ⅵ)"
        }
      ],
      pickerDisabledRange: {
        //设置当前日期之前的不可选
        disabledDate: function(time) {
          return time.getTime() < Date.now() - 8.64e7;
        }
      },
      pageTotal: null,
      currentPage: null,
      islastPage: null
    };
  },
  mounted: function() {
    var end = new Date();
    var start = new Date();

    end.setDate(end.getDate() + 7);
    start.setDate(start.getDate());

    this.condition.WeaDateEndReal = end.format("yyyy-MM-dd");
    this.condition.WeaDateStart = start.format("yyyy-MM-dd");

    this.getWeatherList();
  },
  filters: {
    getWarnLevelName: function(ret) {
      var sitem = Enumerable.From(jsEnum.WeatherWarnlevel).FirstOrDefault(
        null,
        "x=>x.value == " + ret
      );
      if (sitem != null) return sitem.name;
      else return ret;
    },
    dateFormat: function(ret) {
      if (ret) return FormatDate(ret);
      return ret;
    }
  },
  methods: {
    //根据权限设置页面按钮是否显示
    setBtnDisplay: function(code) {
      if (jsRes.getPowerButtons(code)) return true;
      else return false;
    },
    classLi: function(val) {
      switch (val) {
        case 0:
          return "d-text-default";
        case 1:
          return "d-text-blue";
        case 2:
          return "d-text-yellow";
        case 3:
          return "d-text-orange";
        case 4:
          return "d-text-red";
        default:
          return "d-text-default";
      }
    },
    getWeatherApi: function() {
      $.ajax({
        type: "GET",
        url: "https://www.tianqiapi.com/api/",
        data: "appid=47116817&appsecret=zna255JC&version=v1&city=上海",
        dataType: "JSON",
        error: function() {
          //								jsTools.Alertify.msgTip('error', '网络错误！');
        },
        success: function(res) {
          res.data.map(function(item) {
            if (item.date == FormatDate(this.model.WeaDate)) {
              for (var i in this.weatherData) {
                if (item.wea.indexOf(this.weatherData[i].name) >= 0) {
                  this.model.WeatherType = this.weatherData[i].value;
                  break;
                }
              }

              this.model.MinTemp = item.tem2.substr(0, 2);
              this.model.MaxTemp = item.tem1.substr(0, 2);

              this.model.WindDirection = item.win.join("，");
              this.model.WindPower = item.win_speed.replace(
                new RegExp("级", "g"),
                ""
              );
              this.model.AirQty = item.air_level;
              this.model.WeaDesInfo = item.air_tips;
            }
          });
        }
      });
    },
    checkform: function(ret) {
      if (ret.WeaDate == null || ret.WeaDate == "") {
        jsTools.Alertify.msgTip("error", "请选择日期");
        return false;
      }

      if (ret.MinTemp < "-50") {
        jsTools.Alertify.msgTip("error", "最低温度超过范围");
        return false;
      }

      if (
        ret.WeatherType == null ||
        (ret.WeatherType == "" && ret.WeatherType != "0")
      ) {
        jsTools.Alertify.msgTip("error", "请选择天气1");
        return false;
      }

      if (
        ret.WeatherWarnLevel != "" &&
        ret.WeatherWarnType == "" &&
        ret.WeatherWarnType != "0"
      ) {
        jsTools.Alertify.msgTip("error", "请先选择预警类型1");
        return false;
      }

      if (
        ret.WeatherWarnLevel2 != "" &&
        ret.WeatherWarnType2 == "" &&
        ret.WeatherWarnType2 != "0"
      ) {
        jsTools.Alertify.msgTip("error", "请先选择预警类型2");
        return false;
      }

      if (
        ret.WeatherWarnLevel3 != "" &&
        ret.WeatherWarnType3 == "" &&
        ret.WeatherWarnType3 != "0"
      ) {
        jsTools.Alertify.msgTip("error", "请先选择预警类型3");
        return false;
      }

      if (
        ret.WeatherWarnLevel4 != "" &&
        ret.WeatherWarnType4 == "" &&
        ret.WeatherWarnType4 != "0"
      ) {
        jsTools.Alertify.msgTip("error", "请先选择预警类型4");
        return false;
      }

      return true;
    },
    checkMinTemp: function(ret) {
      if (ret < "-50") {
        jsTools.Alertify.msgTip("error", "最低温度超过范围");
      }
    },
    weatherIcon: function(ret) {
      if (ret.WeatherType == 0) return "icon-weather-sunny";
      else if (ret.WeatherType == 1) return "icon-weather-hot";
      else if (ret.WeatherType == 2) return "icon-weather-hail";
      else if (ret.WeatherType == 3) return "icon-weather-cloudy";
      else if (ret.WeatherType == 4) return "icon-weather-overcast";
      else if (ret.WeatherType == 5) return "icon-weather-gale";
      else if (ret.WeatherType == 6) return "icon-weather-typhoon";
      else if (ret.WeatherType == 7) return "icon-weather-smallrain";
      else if (ret.WeatherType == 8) return "icon-weather-middlerain";
      else if (ret.WeatherType == 9) return "icon-weather-largerain";
      else if (ret.WeatherType == 10) return "icon-weather-smallsnow";
      else if (ret.WeatherType == 11) return "icon-weather-middlesnow";
      else if (ret.WeatherType == 12) return "icon-weather-largersnow";
      else return null;
    },
    closeAlert: function() {
      this.isAlert = false;
    },
    add: function(item) {
      this.model.WeatherType = "";
      this.model.CurrentWeather = "";
      this.model.MinTemp = "";
      this.model.MaxTemp = "";
      this.model.WindDirection = "";
      this.model.MinTemp = "";
      this.model.WindPower = "";
      this.model.AirQty = "";
      this.model.WeaDesInfo = "";
      this.model.WeatherWarnLevel = "";
      this.model.WeatherWarnLevel2 = "";
      this.model.WeatherWarnLevel3 = "";
      this.model.WeatherWarnLevel4 = "";
      this.model.WeatherWarnType = "";
      this.model.WeatherWarnType2 = "";
      this.model.WeatherWarnType3 = "";
      this.model.WeatherWarnType4 = "";
      //						this.model.WeatherWarnLevel = this.weaWarnlevelData[0].value;
      this.model.WeaDate = new Date().format("yyyy-MM-dd");

      this.popupType = "add";
      this.isAlert = true;

      this.getWeatherApi();
    },
    edit: function(item) {
      this.model = jsTools.deepCopy(item);
      this.popupType = "edit";
      this.isAlert = true;
    },
    save: function(item) {
      if (!this.checkform(item)) {
        return;
      } else {
        if (this.popupType == "add") {
          //新增
          var dat = {
            serviceName: jsRes.Server.WeatherInsertService,
            data: {
              Parameter: {
                WeaDate: item.WeaDate,
                WeatherType: item.WeatherType,
                CurrentWeather: item.CurrentWeather,
                MinTemp: item.MinTemp,
                MaxTemp: item.MaxTemp,
                WindDirection: item.WindDirection,
                WindPower: item.WindPower,
                AirQty: item.AirQty,
                WeatherWarnLevel: item.WeatherWarnLevel,
                WeatherWarnLevel2: item.WeatherWarnLevel2,
                WeatherWarnLevel3: item.WeatherWarnLevel3,
                WeatherWarnLevel4: item.WeatherWarnLevel4,
                WeatherWarnType: item.WeatherWarnType,
                WeatherWarnType2: item.WeatherWarnType2,
                WeatherWarnType3: item.WeatherWarnType3,
                WeatherWarnType4: item.WeatherWarnType4,
                WeaDesInfo: item.WeaDesInfo
              }
            }
          };

          jsTools.ajax(dat, function(result) {
            jsTools.Alertify.msgTip("success", result);
            this.isAlert = false;
            this.getWeatherList();
          });
        } else if (this.popupType == "edit") {
          //编辑
          var dat = {
            serviceName: jsRes.Server.WeatherUpdateService,
            data: {
              Parameter: {
                WeaId: item.WeaId,
                WeaDate: item.WeaDate,
                WeatherType: item.WeatherType,
                CurrentWeather: item.CurrentWeather,
                MinTemp: item.MinTemp,
                MaxTemp: item.MaxTemp,
                WindDirection: item.WindDirection,
                WindPower: item.WindPower,
                AirQty: item.AirQty,
                WeatherWarnLevel: item.WeatherWarnLevel,
                WeatherWarnLevel2: item.WeatherWarnLevel2,
                WeatherWarnLevel3: item.WeatherWarnLevel3,
                WeatherWarnLevel4: item.WeatherWarnLevel4,
                WeatherWarnType: item.WeatherWarnType,
                WeatherWarnType2: item.WeatherWarnType2,
                WeatherWarnType3: item.WeatherWarnType3,
                WeatherWarnType4: item.WeatherWarnType4,
                WeaDesInfo: item.WeaDesInfo
              }
            }
          };

          jsTools.ajax(dat, result => {
            jsTools.Alertify.msgTip("success", result);
            this.isAlert = false;
            this.getWeatherList();
          });
        } else {
          return;
        }
      }
    },
    del: function(item) {
      jsTools.Alertify.confirm({
        title: "提示",
        message: "是否删除该天气记录？",
        callback: function() {
          var dat = {
            serviceName: jsRes.Server.WeatherDeleteService,
            data: {
              Parameter: item.WeaId
            }
          };

          jsTools.ajax(dat, function(result) {
            jsTools.Alertify.msgTip("success", result);
            this.isAlert = false;
            this.getWeatherList();
          });
        }
      });
    },
    deliver: function(item) {
      //发布
      if (!item.ImportantLevel && item.ImportantLevel != "0") {
        jsTools.Alertify.msgTip("error", "发布请选择公告等级");
        return false;
      }

      if (!item.TopStartTime) {
        jsTools.Alertify.msgTip("error", "发布请选择起始时间");
        return false;
      }

      if (!item.TopEndTime) {
        jsTools.Alertify.msgTip("error", "发布请选择结束时间");
        return false;
      }

      var tit = "天气设置";
      var dat = {
        serviceName: jsRes.Server.NoticeInsertService,
        data: {
          Parameter: {
            Title: tit,
            Content: item.WeaDesInfo,
            IsTop: 1,
            DpId: null,
            ImportantLevel: item.ImportantLevel,
            TopStartTime: item.TopStartTime,
            TopEndTime: item.TopEndTime
          }
        }
      };

      jsTools.ajax(dat, function(result) {
        jsTools.Alertify.msgTip("success", "发布成功");
      });
    },
    search: function(ret) {
      if (ret == null) ret = 1;

      this.condition.CurrentPage = ret;
      this.getWeatherList();
    },
    getWeatherList() {
      var info = this.condition;

      if (info.WeaDateStart > info.WeaDateEnd) {
        jsTools.Alertify.msgTip("error", "开始日期不能大于结束日期！");
        return;
      }

      info.WeaDateEnd =
        info.WeaDateEndReal == null
          ? null
          : info.WeaDateEndReal.stringAddDay(1);

      var dat = {
        title: "检索中...",
        serviceName: jsRes.Server.WeatherQueryService,
        data: {
          Parameter: info
        }
      };

      jsTools.ajax(dat, result => {
        this.results = result;
        this.results.curRecord = result.WeatherList.length;
      });
    }
  }
};

function FormatDate(ret) {
  return ret.substr(0, 10);
}
</script>

<style>
.d-popupBox .d-body {
  width: 44% !important;
}
.d-popupBox .onday {
  width: 161px;
  padding: 4px 0;
  border: 1px solid #04606f;
  background: #c7d7f8;
  color: #145a7c;
}

.d-popupBox .startdate {
  position: relative;
  right: 42px;
}
</style>

