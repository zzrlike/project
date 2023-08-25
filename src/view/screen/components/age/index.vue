<template>
  <div class="box2">
    <div class="title">
      <p>年龄比例</p>
      <img src="../../images/dataScreen-title.png" style="margin-top: 10px;"/>
    </div>
    <div class="charts" ref="chartsRef"></div>
  </div>
</template>

<script setup lang="ts">
import { ref,onMounted } from 'vue'
import * as echarts from 'echarts'
let chartsRef = ref()
onMounted(() => {
  let mycharts = echarts.init(chartsRef.value)
  // 设置配置项
  let option = {
  tooltip: {
    trigger: 'item'
  },
  legend: {
    top: 40,
    right: 25,
    // 图例竖着排
    orient: 'vertical',
    textStyle: {
      color: 'white',
      fontSize:14
    }
  },
  series: [
    {
      name: 'Access From',
      type: 'pie',
      radius: ['40%', '70%'],
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 10,
        borderColor: '#fff',
        borderWidth: 2
      },
      label: {
        show: true,
        position: 'inside',
        color:'white'
      },
      labelLine: {
        show: false
      },
      data: [
        { value: 1048, name: '军事' },
        { value: 735, name: '新闻' },
        { value: 580, name: '直播' },
        { value: 484, name: '娱乐' },
        { value: 300, name: '财经' }
      ]
    }
    ],
  // 调整图形图标的布局
    grid: {
      left: 0,
      right: 0,
      top: 0,
      bottom:0
    
  }
  };
  mycharts.setOption(option)
})
</script>

<style scoped lang="scss">
.box2{
  width: 100%;
  height: 100%;
  background:url(../../images/dataScreen-main-cb.png) no-repeat;
  background-size: 100% 100%;
  .title{
    margin-left: 5px;
    p{
      color:white;
      font-size:26px;
    }
  }
}
.charts{
  height: 260px;
  // background-color: red;
}
</style>