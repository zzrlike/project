<template>
  <div class="layout_container">
    <!-- 左侧菜单 -->
    <div class="layout_slider" >
      <logo/>
      <!-- 展示菜单 -->
      <el-scrollbar class="scrollbar">
        <!-- 菜单组件 -->
        <el-menu :collapse="settingStore.icon?true:false" background-color="#001529" text-color="white" :default-active="route.path">
          <Menu :menuList="userstore.meanRoutes"></Menu>
        </el-menu> 
      </el-scrollbar>
    </div>
    <!-- 顶部导航 -->
    <div class="layout_tabber" :class="{fold:settingStore.icon?true:false}">
      <Tabbar/>
    </div>
    <!-- 内容展示 -->
    <div class="layour_main" :class="{fold:settingStore.icon?true:false}">
      <Main></Main>
    </div>
  </div>
</template>

<script setup lang="ts">
import logo from './logo/index.vue'
import Menu from './menu/index.vue'
import Main from './main/index.vue'
import { useRoute } from 'vue-router';
const route = useRoute()
import Tabbar from './tabbar/index.vue'
// 获取用户相关的小仓库
import useUserStore from '../store/modules/user';
const userstore = useUserStore()
//获取layout相关的小仓库
import useSettingStore from '@/store/modules/setting.ts'
const settingStore=useSettingStore()
</script>

<style scoped lang="scss">
.layout_container{
  width: 100%;
  height: 100vh;
  .layout_slider{
    width: 260px;
    height: 100vh;
    background-color: #001529;
    transition: all 0.3s;
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
    top:0px;
    right: 0px;
    transition: all 0.3s;
    &.fold{
      width: calc(100vw - 50px);
      left: 50px;
    }
  }
  .layour_main{
    position: fixed;
    width: calc(100% - 260px);
    height: calc(100vh - 60px);
    right: 0;
    top: 60px;
    padding: 20px;
    overflow: auto;
    transition: all 0.3s;
     &.fold{
      width: calc(100vw - 50px);
      left: 50px;
    }
  }
}
</style>