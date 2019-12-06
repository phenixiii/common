<template>
  <div style="position:relative">
    <vessel-data style="padding:1rem" :slide="slide" :swiperSlides="Slides" @linkTo="linkTo"></vessel-data>

    <div v-for="(arr,i,k) in data.vessels" :key="i" :style="styleArr(k)">
      <vessel
        v-for="(item,j) in arr"
        :select="slide"
        :data="item"
        :key="j"
        :style="styleObj(item)"
        @linkTo="linkTo"
      ></vessel>
    </div>

    <div :style="styleArr(-1)">
      <berth :data="data.berths"></berth>
    </div>
  </div>
</template>

<script>
import vessel from "./vessel";
import berth from "./berth";
import vesselData from "./vesselData";

export default {
  data() {
    return {
      slide: 0,
      Slides: []
    };
  },
  components: {
    vessel,
    berth,
    vesselData
  },
  computed: {
    styleArr() {
      return k => {
        let m = 2 - k;
        return {
          position: "absolute",
          width: "100%",
          "margin-top": 120 * m + "px"
        };
      };
    },
    styleObj() {
      return item => {
        let bs = this.data.berths;
        let len = bs[bs.length - 1].end - bs[0].start;
        let start = item.start - bs[0].start;
        let width = item.end - item.start;

        return {
          position: "absolute",
          left: (start * 100) / len + "%",
          width: (width * 100) / len + "%"
        };
      };
    }
  },
  props: {
    data: {
      type: Object,
      default: () => {
        return {
          berths: [
            {
              name: "特殊泊位",
              start: -500,
              end: 0
            },
            {
              name: "一泊位",
              start: 0,
              end: 120
            },
            {
              name: "二泊位",
              start: 120,
              end: 500
            },
            {
              name: "三泊位",
              start: 500,
              end: 800
            }
          ],
          vessels: {
            one: [
              {
                id: 0,
                vessel: "AAA",
                voyage: "12EF",
                quantity: 100,
                total: 500,
                qcArray: ["Q801", "Q802", "Q803","Q903"],
                direction: "L",
                startDt: "2019-11-27 12:12:12",
                start: -100,
                end: 100
              },
              {
                id: 1,
                vessel: "BBB",
                voyage: "12EF",
                quantity: 180,
                total: 200,
                qcArray: ["Q804", "Q805"],
                direction: "R",
                startDt: "2019-11-27 15:12:12",
                start: 100,
                end: 400
              }
            ],
            two: [
              {
                id: 2,
                vessel: "CCC",
                voyage: "12EF",
                quantity: 100,
                total: 500,
                qcArray: ["Q801", "Q802", "Q803"],
                direction: "L",
                startDt: "2019-11-27 12:12:12",
                start: -200,
                end: 100
              },
              {
                id: 3,
                vessel: "DDD",
                voyage: "12EF",
                quantity: 180,
                total: 200,
                qcArray: ["Q804", "Q805"],
                direction: "R",
                startDt: "2019-11-27 15:12:12",
                start: 150,
                end: 800
              }
            ],
            three: [
              {
                id: 4,
                vessel: "EEE",
                voyage: "12EF",
                quantity: 100,
                total: 500,
                qcArray: ["Q801", "Q802", "Q803"],
                direction: "L",
                startDt: "2019-11-27 12:12:12",
                start: -200,
                end: 100
              },
              {
                id: 5,
                vessel: "FFF",
                voyage: "12EF",
                quantity: 180,
                total: 200,
                qcArray: ["Q804", "Q805"],
                direction: "R",
                startDt: "2019-11-27 15:12:12",
                start: 500,
                end: 700
              }
            ]
          }
        };
      }
    }
  },
  methods: {
    linkTo(ret) {
      debugger
      this.slide = ret.id;
      this.$emit("linkTo", ret);
    }
  },
  mounted() {
    let vessels = this.data.vessels;
    for (let i in vessels) {
      vessels[i].forEach(item => {
        this.Slides.push(item);
      });
    }
  }
};
</script>

