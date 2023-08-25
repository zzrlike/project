<template>
  <div class="box5">
    <div class="title">
      <p>未来七天游客数量趋势图</p>
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
      text: '访问量'
    },
    // x轴y轴
    xAxis: {
      type: 'category',
      // x轴两侧不留白
      boundaryGap: false,
      // 分割线不要
      splitLine: {
        show:false
      },
      data:['周一','周二','周三','周四','周五','周六','周日']
    },
    yAxis: {
      // 分割线不要
      splitLine: {
        show:false
      },
      // 轴线的设置
      axisLine: {
        show:true
      },
      // 轴线的刻度
      axisTick: {
        show:true
      }

    },
    grid: {
      left:40,
      top: 0,
      right: 20,
      bottom:40
    },
    // 系列
    series: [
      {
        type: 'line',
        data: [320, 240, 1166, 888,500,1000, 1321],
        // 平滑曲线的设置
        smooth: true,
         // 区域填充样式
      areaStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [{
              offset: 0, color: 'red' // 0% 处的颜色
          }, {
              offset: 1, color: 'blue' // 100% 处的颜色
          }],
          global: false // 缺省为 false
        }
      }
      },
      
    ],
   
  })
})
</script>

<style scoped lang="scss">
.box5{
  width: 100%;
  height: 100%;
  background:url(../../images/dataScreen-main-cb.png) no-repeat;
  background-size: 100% 100%;
  margin: 0 20px;
  .title{
    margin-left: 10px;
    p{
      color:white;
      font-size:20px;
    }
  }
  .charts{
    height: calc(100% - 40px);
    // background-color: red;
  }
}
</style>