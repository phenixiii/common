<template>
  <div>

    <button v-on:click="add">Add</button>
    <button v-on:click="remove">Remove</button>
    <transition-group name="fade-transform-v" tag="div" style="white-space: nowrap;overflow-x: auto;-webkit-overflow-scrolling:touch;">
      <span v-for="(item) in datas" :key="item" class="list-transition">
        <!-- {{item.name}} -->
        <qc :data='item' @close="remove"></qc>
      </span>
    </transition-group>
  </div>
</template>

<script>
import qc from '@/components/machine/qcbase'

export default {
  components:{qc},
  data(){
    return {
     
     datas:[
       {name:'801'},
       {name:'802'},
       {name:'803'},
       {name:'804'},
     ],
    nextNum: 10
    }
    
  },
  methods: {
    randomIndex: function () {
      return Math.floor(Math.random() * this.items.length)
    },
     randomIndex2: function () {
      return Math.floor(Math.random() * this.datas.length)
    },
    add: function () {
      
      this.datas.splice(this.randomIndex2(),0, {name:'W' + this.nextNum++})
    },
    remove: function () {
     
      this.datas.splice(this.randomIndex2(), 1)
    },
    shuffle: function () {
      this.items = _.shuffle(this.items)
    }
  }
};
</script>

<style scoped>
.list-transition {
  transition: all 1s;
  display: inline-block;
  margin-right: 10px;
}
</style>