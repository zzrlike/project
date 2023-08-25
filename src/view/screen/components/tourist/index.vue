<template>
  <div class="box">
    <div class="top">
      <p class="title">实时游客统计</p>
      <p class="bg"></p>
      <p class="right">可预约总量<span>{{ people }}</span></p>
    </div>
    <div class="number">
      <span v-for="item in people">{{ item }}</span>
    </div>
    <div class="charts" ref="chartsRef">1</div>
  </div>
</template>

<script setup lang="ts">
import * as echars from 'echarts'
// 水球图拓展插件
import 'echarts-liquidfill'
import { ref, onMounted } from 'vue'
let chartsRef=ref()
let people = ref('215908人')
onMounted(() => { 
  // 获取echart类的实例
  let mycharts = echars.init(chartsRef.value)
  // 设置实例的配置项
  mycharts.setOption({
    title: {
      text: '水球图'
    },
    // x|y轴组件
    xAxis: {},
    yAxis: {},
    // 系列：决定你要展示什么样的图形图标
    series: {
      type: 'liquidFill',//系列
      data: [0.6, 0.4, 0.2],//展示的数据
      waveAnimation: true,//动画
      radius: '100%',//半径
      outline: {
        show: true,
        borderDistance: 8,
        itemStyle: {
          color: 'none',
          borderColor: '#294D99',
          borderWidth: 8,
          shadowBlur: 20,
          shadowColor:'rgba(0,0,0.25)'
        }
      }
    },
    // 布局组件
    grid: {
      left: 0,
      right: 0,
      top: 0,
      bottom:0
    },
  })
})
</script>

<style scoped lang="scss">
.box{
  background:url(../../images/dataScreen-main-lb.png) no-repeat;
  background-size:100% 100%;
  margin-top: 10px;
  .top{
    margin-left: 20px;
    .title{
      margin-top:20px ;
      color: white;
      font-size: 26px;
    }
    .bg{
      margin-top: 10px;
      width: 80px;
      height: 7px;
      background: url(../../images/dataScreen-title.png) no-repeat;
    }
    .right{
      float: right;
      color: white;
      font-size: 20px;
      span{
        color: yellowgreen;
      }
    }
  }
}
.number{
    margin-top: 20px;
    display: flex;
    padding: 10px;
  span{
    flex: 1;
    height: 60px;
    text-align: center;
    line-height: 60px;
    background: url(../../images/total.png) no-repeat;
    background-size: 100% 100%;
    color: #29fcff;
    font-size: 26px;
  }
}
.charts{
  width: 100%;
  height: 240px;
}
</style>