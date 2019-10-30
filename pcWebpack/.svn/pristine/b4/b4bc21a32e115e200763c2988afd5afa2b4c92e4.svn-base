<template>
  <article class="d-padded-l-5 d-padded-r-5 d-height-100">
    <div class="d-clockdate">{{clockdate}}</div>
    <div class="d-height-70 aui-flex-col aui-flex-center aui-flex-middle">
      <div class="d-clocktime">{{clocktime}}</div>
    </div>
  </article>
</template>

<script>
export default {
  data: function() {
    return {
      clockdate: null,
      clocktime: null,
      clock: null
    };
  },
  methods: {
    createClock: function() {
      var time = new Date(),
        year = time.getFullYear(),
        month = time.getMonth() + 1,
        day = time.getDate(),
        hour = time.getHours(),
        min = time.getMinutes(),
        secend = time.getSeconds();
      var weekDay,
        week = time.getDay();

      switch (week) {
        case 0:
          weekDay = "星期日";
          break;
        case 1:
          weekDay = "星期一";
          break;
        case 2:
          weekDay = "星期二";
          break;
        case 3:
          weekDay = "星期三";
          break;
        case 4:
          weekDay = "星期四";
          break;
        case 5:
          weekDay = "星期五";
          break;
        case 6:
          weekDay = "星期六";
          break;
        default:
          weekDay = "系统错误，无法读取日期！";
      }

      this.clockdate =
        year +
        " 年 " +
        this.timeCheck(month) +
        " 月 " +
        this.timeCheck(day) +
        " 日 " +
        weekDay;
      this.clocktime =
        this.timeCheck(hour) +
        " : " +
        this.timeCheck(min) +
        " : " +
        this.timeCheck(secend);
      this.clock = this.clockdate + this.clocktime;
    },
    timeCheck: function(val) {
      if (val < 10) {
        return "0" + val;
      }
      return val;
    }
  },
  mounted: function() {
    this.createClock();
    var that = this;
    setInterval(function() {
      that.createClock();
    }, 1000);
  }
}
</script>
