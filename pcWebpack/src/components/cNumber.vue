//数值动态翻滚效果

<template>
  <div v-if="lis.length > 0">
    <div v-for="(item,index) in lis" class="count up" :key="index" :ref="index">
      <span class="current top">{{item.cur}}</span>
      <span class="next top">{{item.next}}</span>
      <span class="current bottom">{{item.cur}}</span>
      <span class="next bottom">{{item.next}}</span>
    </div>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      lis: [],
      arr: []
    };
  },
  props: {
    valnum: {
      default: 0
    }
  },
  watch: {
    valnum: function(newVal, oldVal) {
      if (newVal != null || newVal != "") {
        this.start();
      }
    }
  },

  methods: {
    //组装上下页
    formatLis: function(ret, arr) {
      for (var i = 0; i < ret.length; i++) {
        if (arr[i] != null) {
          arr[i].next = ret[i];
        } else {
          var m = {
            cur: ret[i],
            next: ret[i]
          };
          arr.push(m);
        }
      }

      var count = ret.lastIndexOf("#");

      if (ret[count + 1] == "，") count = count + 1;

      arr.map(function(item, index) {
        if (count + 1 > index) {
          item.cur = "";
          item.next = "";
        }
      });

      return arr;
    },
    //数字格式化成带逗号分隔的字符串
    formatNumber: function(n) {
      var numArr = [];

      var nStr = ("########" + n.toString()).slice(-8);
      var len = nStr.length;
      for (var i = 0; i < len; i++) {
        numArr.push(nStr[i]);
        if ((len - i - 1) % 3 === 0 && len != i + 1) {
          numArr.push("，");
        }
      }
      return numArr.join("");
    },

    start: function() {
      var that = this;
      this.lis = this.formatLis(this.formatNumber(this.valnum), this.arr);

      this.lis.map(function(item, index) {
        if (item.next != item.cur) {
          var im = that.$refs[index];

          var el = $(im);
          el.removeClass("changed");

          setTimeout(function() {
            el.addClass("changing");
          }, 20);

          setTimeout(function() {
            el.addClass("changed");
            el.removeClass("changing");
          }, 900);

          setTimeout(function() {
            item.cur = item.next;
          }, 1000);
        }
      });
    }
  },
  mounted: function() {
    this.lis = this.formatLis(this.formatNumber(this.valnum), this.arr);
  }
};
</script>
