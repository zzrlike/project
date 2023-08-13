<template>
  <div class="layout_container">
    <!-- 左侧菜单 -->
    <div class="layout_slider">
      <logo/>
      <!-- 展示菜单 -->
      <el-scrollbar class="scrollbar">
        <!-- 菜单组件 -->
        <el-menu background-color="#001529" text-color="white">
          <Menu :menuList="userstore.meanRoutes"></Menu>
        </el-menu> 
      </el-scrollbar>
    </div>
    <!-- 顶部导航 -->
    <div class="layout_tabber">456</div>
    <!-- 内容展示 -->
    <div class="layour_main">
      <p style="height: 6000px;">12</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import logo from './logo/index.vue'
import Menu from './menu/index.vue'
// 获取用户相关的小仓库
import useUserStore from '../store/modules/user';
const userstore = useUserStore()
console.log(userstore)
</script>

<style scoped lang="scss">
.layout_container{
  width: 100%;
  height: 100vh;
  background-color: red;
  .layout_slider{
    width: 260px;
    height: 100vh;
    background-color: #001529;
    .scrollbar{
      width: 100%;
      height: calc(100vh - 50px);
      .el-menu{
        border-right: none;
      }
    }
  }
  .layout_tabber{
    width: calc(100% - 260px);
    position: fixed;
    height:60px;
    background-color: cyan;
    top:0px;
    right: 0px;
  }
  .layour_main{
    position: fixed;
    width: calc(100% - 260px);
    height: calc(100vh - 60px);
    right: 0;
    background-color: pink;
    top: 60px;
    padding: 20px;
    overflow: auto;
  }
}
</style>