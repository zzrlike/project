<template>
  <div class="box7">
    <div class="title">
      <p>年度游客对比</p>
      <img src="../../images/dataScreen-title.png" style="margin-top: 10px;"/>
    </div>
    <div class="charts" ref="chartsRef"></div>
  </div>
</template>

<script setup lang="ts">
import { ref ,onMounted} from 'vue'
import * as echarts from 'echarts'
const chartsRef = ref()
onMounted(() => { 
  let mycharts = echarts.init(chartsRef.value)
  // 设置配置项
  mycharts.setOption({
    // 标题组件
    title: {
      text: '散点图',
      left:'40%',
      textStyle: {
        color:'white'
      }
    },
    xAxis: {
      type: 'category',
      show:true
    },
    yAxis: {
      show:false
    },
    grid: {
      left:20,
      top: 20,
      right: 0,
      bottom:20
    },
    series: {
      type: 'scatter',
      data: [33, 88, 21, 9, 88, 34, 13, 32, 33, 31, 9, 88, 34, 13, 32, 33, 31, 24, 31, 34],
      //标记图形设置
      symbol: 'diamond',
      symbolSize: 16,
      // 图文标签
      label: {
        show: true,
        position: 'top',
        color:'hotpink'
      }
    }
  })
})
</script>

<style scoped lang="scss">
.box7{
  width: 105%;
  height: 100%;
  background:url(../../images/dataScreen-main-cb.png) no-repeat;
  background-size: 100% 100%;
  .title{
    margin-top: 10px;
    margin-left: 10px;
    p{
      color:white;
      font-size:21px;
    }
  }
  .charts{
    height: calc(100% - 30px);
  }
}
</style>