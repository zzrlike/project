<template>
  <div class="box5">
    <div class="title">
      <p>数据统计</p>
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
  let option = {
  title: {
    text: '游客消费统计'
  },
  
  radar: {
    shape: 'circle', // 外环的形状（圆形/多边形）
    splitNumber: 5, // 外环圈数
    indicator: [ // 每项指标的最大值设置
      { name: '消费', max: 6500 },
      { name: '好感', max: 16000 },
      { name: '出行', max: 30000 },
      { name: '小吃', max: 38000 },
      { name: '爱好', max: 52000 },
      { name: '景点', max: 25000 }
    ],
    splitLine: { // 外环分割线样式
      lineStyle: {
        color: '#45BCE4',
        type: 'dashed'
      }
    },
    splitArea: {
      show: false
    },
    axisLine: { // 坐标轴线样式设置
      lineStyle: {
        color: '#45BCE4'
      }
    },
  },
  series: [
    {
      name: 'Budget vs spending',
      type: 'radar',
      data: [
        {
          value: [4200, 3000, 20000, 35000, 50000, 18000],
          name: '购物',
          itemStyle: { // 多边形线颜色
            color: '#47EB99'
          },
          areaStyle: {
            opacity: 0.5
          }
        },
        {
          value: [5000, 14000, 28000, 26000, 42000, 21000],
          name: '吃饭',
          itemStyle: {
            color: '#47EAEB'
          },
          areaStyle: {
            opacity: 0.5
          }
        }
      ]
    }
  ]
  };
  mycharts.setOption(option)
    
   
  })
</script>

<style scoped lang="scss">
.box5{
  width: 105%;
  height: 100%;
  background:url(../../images/dataScreen-main-cb.png) no-repeat;
  background-size: 100% 100%;
  // margin: 0 20px;
  margin-top: 20px;
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