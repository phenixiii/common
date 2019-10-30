<template>
  <div class="d-weather-nav">
    <ul class="d-flex-col d-flex-middle">
      <li v-for="(item,i) in items" :key="i">
        <h4 class="d-text-weather d-line-l">
          <i v-show="item.WeatherType == 0" class="iconfont icon-weather-sunny"></i>
          <i v-show="item.WeatherType == 1" class="iconfont icon-weather-hot"></i>
          <i v-show="item.WeatherType == 2" class="iconfont icon-weather-hail"></i>
          <i v-show="item.WeatherType == 3" class="iconfont icon-weather-cloudy"></i>
          <i v-show="item.WeatherType == 4" class="iconfont icon-weather-overcast"></i>
          <i v-show="item.WeatherType == 5" class="iconfont icon-weather-gale"></i>
          <i v-show="item.WeatherType == 6" class="iconfont icon-weather-typhoon"></i>
          <i v-show="item.WeatherType == 7" class="iconfont icon-weather-smallrain"></i>
          <i v-show="item.WeatherType == 8" class="iconfont icon-weather-middlerain"></i>
          <i v-show="item.WeatherType == 9" class="iconfont icon-weather-largerain"></i>
          <i v-show="item.WeatherType == 10" class="iconfont icon-weather-smallsnow"></i>
          <i v-show="item.WeatherType == 11" class="iconfont icon-weather-middlesnow"></i>
          <i v-show="item.WeatherType == 12" class="iconfont icon-weather-largersnow"></i>
          <span class="wea d-font-size-14">{{item.WeatherTypeCaption}}</span>
          <span class="wea d-font-size-14">/{{item.currentWeather}}</span>
          <span class="wea d-font-size-14">{{item.MinTemp}}~{{item.MaxTemp}}°C</span>
          <span class="d-font-size-14 aui-padded-l-5" :class="warnHeadLi(item)">警</span>
        </h4>
      </li>
    </ul>
    <div class="d-padded-10 d-weather-detail">
      <ul v-for="(item,j) in items" :key="j">
        <li>今天</li>
        <li>{{item.WeatherTypeCaption}}</li>
        <li>{{item.MinTemp}}~{{item.MaxTemp}}°C</li>
        <li>{{item.WindDirection}} {{item.WindPower}}级</li>
        <li>{{item.AirQty}}</li>
        <li
          v-if="item.WeatherWarnLevel != null"
          :class="classLi(item.WeatherWarnLevel)"
        >{{item.WeatherWarnTypeCaption}} {{item.WeatherWarnLevelCaption}}</li>
        <li
          v-if="item.WeatherWarnLevel2 != null"
          :class="classLi(item.WeatherWarnLevel2)"
        >{{item.WeatherWarnTypeCaption2}} {{item.WeatherWarnLevelCaption2}}</li>
        <li
          v-if="item.WeatherWarnLevel3 != null"
          :class="classLi(item.WeatherWarnLevel3)"
        >{{item.WeatherWarnTypeCaption3}} {{item.WeatherWarnLevelCaption3}}</li>
        <li
          v-if="item.WeatherWarnLevel4 != null"
          :class="classLi(item.WeatherWarnLevel4)"
        >{{item.WeatherWarnTypeCaption4}} {{item.WeatherWarnLevelCaption4}}</li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  data: function() {
    return {
      today: null,
      text: ""
    };
  },
  props: {
    items: {
      type: Array,
      default: []
    }
  },
  mounted: function() {
    this.init();
  },
  filters: {
    getWarnLevelName: function(ret) {
      var sitem = Enumerable.From(jsEnum.WeatherWarnlevel).FirstOrDefault(
        null,
        x => x.value == +ret
      );
      if (sitem != null) return substr(sitem.name);
      else return ret;
    }
  },
  methods: {
    init: function() {
      var time = new Date(),
        today =
          time.getFullYear() +
          -+this.textChange(time.getMonth() + 1) +
          -+this.textChange(time.getDate());
      this.today = today;
    },
    textChange: function(val) {
      if (val < 10) {
        return 0 + val;
      }
      return val;
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
    warnHeadLi: function(val) {
      if (
        !val.WeatherWarnType ||
        !val.WeatherWarnType2 ||
        !val.WeatherWarnType3 ||
        !val.WeatherWarnType4
      ) {
        if (
          val.WeatherWarnLevel4 == 4 ||
          val.WeatherWarnLevel3 == 4 ||
          val.WeatherWarnLevel2 == 4 ||
          val.WeatherWarnLevel == 4
        ) {
          return "d-text-red";
        } else if (
          val.WeatherWarnLevel4 == 3 ||
          val.WeatherWarnLevel3 == 3 ||
          val.WeatherWarnLevel2 == 3 ||
          val.WeatherWarnLevel == 3
        ) {
          return "d-text-orange";
        } else if (
          val.WeatherWarnLevel4 == 2 ||
          val.WeatherWarnLevel3 == 2 ||
          val.WeatherWarnLevel2 == 2 ||
          val.WeatherWarnLevel == 2
        ) {
          return "d-text-yellow";
        } else if (
          val.WeatherWarnLevel4 == 1 ||
          val.WeatherWarnLevel3 == 1 ||
          val.WeatherWarnLevel2 == 1 ||
          val.WeatherWarnLevel == 1
        ) {
          return "d-text-blue";
        } else {
          return "d-display-none";
        }
      } else {
        return "d-display-none";
      }
    }
  }
};
</script>


