<template>
  <div slot="title">
    <i class="d-sub-icon" :class="icon"></i>
    <span class="d-tit" slot="title">{{title}}</span>
  </div>
</template>

<script>
export default {
  name: 'MenuItem',
  props: {
    icon: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    }
  },
}
</script>

