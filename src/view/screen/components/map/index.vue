<template>
  <div class="box4" ref="mapRef">
    我是地图组件
  </div>
</template>

<script setup lang="ts">
import { ref ,onMounted} from 'vue'
import * as echarts from 'echarts'
let mapRef = ref()
// 引入中国地图的json数据
import chinaJSON from './china.json'

// 注册中国地图
echarts.registerMap('china',chinaJSON)
onMounted(() => { 
  let mycharts = echarts.init(mapRef.value)
  // 设置配置项
  mycharts.setOption({
    // 地图组件
    geo: {
      map: 'china',//中国地图
      // roam: true,//鼠标缩放
      // 地图的位置的调试
      left: 50,
      top: 100,
      right: 50,
      bottom: 0,
      // 地图上的文字设置
      label: {
        show: true,//文字显示出来
        color:'white',//文字颜色
        fontSize:14
      },
      // 每一个多边形的样式
      itemStyle: {
        // 渐变颜色
        color:{
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
        },
        opacity:0.8
      },
      // 地图高亮的效果
      emphasis: {
        itemStyle: {
          color:'red'
        },
        label: {
          fontSize:40
        }
      }
    },
    // 布局设置
    grid: {
      left: 0,
      top: 0,
      right: 0,
      bottom:0
    },
    series: [
      {
        type: 'lines',//航线系列
        // 启动和终点
        data: [
                  {
            coords: [
              [116.405285,39.904989],//起点
              [109.82951587,15.22896754],//终点
            ],
            // 统一的样式设置
            lineStyle: {
              color: 'orange',
              width:5
            },
          },
          {
            coords: [
              [117.348611,40.581141],//起点
              [ 101.167885,27.198311],//终点
            ],
            // 统一的样式设置
            lineStyle: {
              color: 'orange',
              width:5
            },
          },
          {
            coords: [
              [ 124.369087,45.512915],//起点
              [  120.79048, 42.218636],//终点
            ],
            // 统一的样式设置
            lineStyle: {
              color: 'orange',
              width:5
            },
          }
        ],
        // 是否显示特效
        effect: {
          show: true,
          symbol: 'path://M599.06048 831.309824l12.106752-193.404928 372.860928 184.430592L984.02816 710.206464 617.906176 367.33952 617.906176 151.638016c0-56.974336-46.188544-143.064064-103.158784-143.064064-56.974336 0-103.158784 86.089728-103.158784 143.064064L411.588608 367.33952 45.461504 710.206464l0 112.129024 366.660608-184.430592 14.999552 209.27488c0 5.05344 0.594944 9.892864 1.124352 14.749696l-66.591744 60.348416 0 66.587648 153.986048-50.879488 2.43712-0.80896 147.439616 51.688448 0-66.587648-68.758528-62.253056L599.06048 831.309824z',
          color: 'black',
          symbolSize:30
        }
      }
    ]
  })
})
</script>

<style scoped>
.box4{
  /* background:red; */
}

</style>