<template>
  <div class="container">
    <!-- 数据大屏展示内容区域 -->
    <div class="screen" ref="screenRef">
      <div class="top">
        <top></top>
      </div>
      <div class="bottom">
        <div class="left">
          <tourist class="tourist"></tourist>
          <sex class="sex"></sex>
          <age class="age"></age>
        </div>
        <div class="center">
          <Map class="map"></Map>
          <Line class="line"></Line>
        </div>
        <div class="right">
          <rank class="rank"></rank>
          <year class="year"></year>
          <couter class="couter"></couter>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
// 引入顶部的子组件
import top from './components/top/index.vue'
// 引入左侧的三个子组件
import tourist from './components/tourist/index.vue'
import sex from './components/sex/index.vue'
import age from './components/age/index.vue'
// 引入中间的两个子组件
import Map from './components/map/index.vue'
import Line from './components/line/index.vue'
// 引入右侧的三个子组件
import rank from './components/rank/index.vue'
import year from './components/year/index.vue'
import couter from './components/couter/index.vue'
let screenRef = ref()
// 定义大屏的缩放比例
let getScreen=(w = 1920, h = 1080) => { 
  const ww = window.innerWidth / w
  const wh = window.innerHeight / h
  return ww < wh ? ww : wh
}
onMounted(() => { 
  screenRef.value.style.transform=`scale(${getScreen()}) translate(-50%,-50%)`
})
// 监听视口的变化
window.onresize = () => { 
  screenRef.value.style.transform=`scale(${getScreen()}) translate(-50%,-50%)`
}
</script>

<style scoped lang="scss">
.container{
  width: 100vw;
  height: 100vh;
  background: Url(./images/bg.png) no-repeat;
  background-size: cover;
  .screen{
    position: fixed;
    width: 1920px;
    height: 1080px;
    left: 50%;
    top: 50%;
    transform-origin: left top;
    .top{
      width: 100%;
      height: 40px;
    }
    .bottom{
      display: flex;
      .right{
        flex: 1;
        display: flex;
        flex-direction: column;
        margin-left: 40px;
        .rank{
          flex: 1.5;
          // background-color: red;
        }
        .year{
          flex: 1;
          // background-color: pink;
        }
        .couter{
          flex: 1.2;
          // background-color: cyan;
        }
      }
      .left{
        flex: 1;
        height: 1040px;
        display: flex;
        flex-direction: column;
        .tourist{
          flex:1.2;
        }
        .sex{
          flex: 1;
          // background-color: aqua;
        }
        .age{
          flex: 1;
          // background-color: hotpink;
        }
      }
      .center{
        flex:1.5;
        display: flex;
        flex-direction: column;
        .map{
          flex: 4;
          // background-color: red;
        }
        .line{
          flex:1;
          padding-right: 20px;
        }
      }
    }
  }
}
</style>