<template>
  <div class="box">
    <div class="title">
      <p>男女比例</p>
      <img src="../../images/dataScreen-title.png" style="margin-top: 10px;"/>
    </div>
    <div class="sex">
      <div class="man">
        <img src="../../images/man.png" alt="">
      </div>
      <div class="women">
        <img src="../../images/woman.png" alt="">
      </div>
    </div>
    <div class="rate">
        <p>男士58%</p>
        <p>女士42%</p>
    </div>
    <div class="charts" ref="chartsRef"></div>
  </div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts'
import { ref ,onMounted} from 'vue'
const chartsRef = ref()
onMounted(() => {
  // 初始化echars实例
  let mycharts = echarts.init(chartsRef.value)
  // 设置配置项
  mycharts.setOption({
    // 标题组件
    title: {
      text: '男女比例',//主标题
      textStyle: {//主标题颜色
        color:'skyblue'
      },
      left: '40%'
    },
    // x|y
    xAxis: {
      show: false,
      min: 0,
      max:100
    },
    yAxis: {
      show: false,
      type:'category'
    },
    series: [
      {
        type: 'bar',
        data: [58],
        barWidth: 20,
        z: 100,
        itemStyle: {
          color: 'cyan',
          borderRadius:20
        }
      },
      {
        type: 'bar',
        data: [100],
        barWidth: 20,
        // 调整女士柱条的位置
        barGap: '-100%',
        itemStyle: {
          color: 'pink',
          borderRadius:20
        }
      }
    ],
    grid: {
      left: 0,
      top: 0,
      right: 0,
      bottom:0
    }
  })
})
</script>

<style scoped lang="scss">
.box{
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  background:url(../../images/dataScreen-main-cb.png) no-repeat;
  background-size: 100% 100%;
  margin: 20px 0;
  .title{
    margin-left: 5px;
    p{
      color:white;
      font-size:26px;
    }
  }
  .sex{
    display: flex;
    justify-content: center;
    .man{
      margin: 20px;
      width: 100px;
      height: 100px;
      background: url(../../images/man-bg.png) no-repeat;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .women{
      margin: 20px;
      width: 100px;
      height: 100px;
      background: url(../../images/woman-bg.png) no-repeat;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  .rate{
    width: 80%;
    margin: auto;
    display: flex;
    justify-content: space-between;
    color: white;
  }
  .charts{
    width: 80%;
    height: 100px;
    margin: auto;
  }
}
</style>