<template>
  <div>
      <!-- 测试svg图标 -->
    <svg :style="{width,height}">
      <use :xlink:href="'#icon-'+ name" :fill="color"></use>
    </svg>
  </div>
</template>

<script setup lang="ts">
// 接收父组件传递过来得参数
defineProps({
  name: String,
  color: {
    type: String,
    default: ''
  },
  width: {
    type: String,
    default:'16px'
  },
  height: {
    type: String,
    default:'16px'
  }
})
</script>

<style scoped>

</style>