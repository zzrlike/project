<template>
  <div class="box6">
   <div class="title">
      <p>热门景区排行</p>
      <img src="../../images/dataScreen-title.png" style="margin-top: 10px;"/>
    </div>
      <!-- 图像图表的容器 -->
  <div class="charts" ref="chartsRef"></div>
  </div>

  
</template>

<script setup lang="ts">
import { ref ,onMounted} from 'vue'
import * as echarts from 'echarts'
const chartsRef = ref()
onMounted(() => { 
  // 一个容器可以展示多种类型的图形图标
  let myecharts = echarts.init(chartsRef.value)
  myecharts.setOption({
    // 标题组件
    title: {
      // 主标题
      text: '景区排行',
      // 标题位置的调试
      left: '50%',
      // 主标题文字的样式
      textStyle: {
        color: 'yellowgreen',
        fontSize:20
      },
      // 子标题
      subtext: '各大景区',
      // 子标题的样式
      subtextStyle: {
        color: 'yellowgreen',
        fontSize:16
      }
    },
    xAxis: {
      // 代表图形图标在x轴上均匀分布展示
      type: 'category'
      
    },//x轴
    yAxis: {},//y轴
    grid: {
      left: 20,
      bottom: 20,
      right: 20,
    },
    // 系类
    series: [
      {
        type: 'bar',
        data: [10, 20, 30, 40, 50, 60, 70],
        // 柱状图的：图形上的文本标签
        label: {
          show: true,
          // 文字的位置
          position: 'inside',
          // 文字的颜色
          color:'yellowgreen'
        },
        // 是否显示背景颜色
        showBackground: true,
        backgroundStyle: {
          // 底部背景的颜色
          color:{
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [{
              offset: 0, color: 'black' // 0% 处的颜色
          }, {
              offset: 1, color: 'blue' // 100% 处的颜色
          }],
          global: false // 缺省为 false
        }
        },
        // 柱条的样式
        itemStyle: {
          borderRadius: 10,
          // 柱条的颜色
          color: function (data: any) {
            let arr = ['red', 'orange', 'yellowgreen', 'green', 'purple', 'hotpink', 'skyblue']
            return arr[data.dataIndex]
           }
        }
      },
      {
        type: 'line',
        data: [10, 20, 30, 40, 50, 60, 90],
        // 平滑曲线
        smooth:true
      }
    ],
    tooltip: {
      backgroundColor:'rgba(50,50,50,0.7)'
    }
  })
})
</script>

<style scoped lang="scss">
.box6{
  width:105%;
  height:100%;
  background:url(../../images/dataScreen-main-cb.png) no-repeat;
  background-size: 100% 100%;
  margin: 20px 0;
  .title{
    margin-left: 5px;
    p{
      color:white;
      font-size:21px;
    }
  }
  .charts{
    // margin-top: 30px;
    height: calc(100% - 30px);
  }
}

</style>