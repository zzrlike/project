<template>
  <div class="tabbar">
   <div class="tabbar_left">
    <!-- 图标 -->
      <el-icon style="margin-right: 10px;" @click="changicon">
        <component :is="settingStore.icon?'Expand':'Fold'"></component>
      </el-icon>
      <!-- 面包屑 -->
        <el-breadcrumb separator="/" separator-icon="ArrowRight">
          <el-breadcrumb-item v-for="item in route.matched" :key="item" :to="{ path: item.path }">
            <el-icon style="margin: 0 2px;">
              <component :is="item.meta.icon"></component>
            </el-icon>
            <span>{{ item.meta.title }}</span>
          </el-breadcrumb-item>
        </el-breadcrumb>
   </div>
   <div class="tabbar_right">
      <el-button  size="small" icon="Refresh" circle @click="updateRefsh"></el-button>
      <el-button  size="small" icon="FullScreen" circle @click="fullScreen"></el-button>
      <el-button  size="small" icon="Setting" circle ></el-button>
      <img :src="userStore.avatar" style="width: 24px; height: 24px; margin: 0 10px;border-radius: 50%;">
      <!-- 下拉菜单 -->
      <el-dropdown>
        <span class="el-dropdown-link">
          {{ userStore.username }}
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
   </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute,useRouter } from 'vue-router';
const route = useRoute()
const router=useRouter()
import useSettingStore from '@/store/modules/setting.ts'
const settingStore = useSettingStore()
import useUserStore from '@/store/modules/user.ts'
const userStore=useUserStore()
const changicon = () => { 
  settingStore.icon=!settingStore.icon
}
// 点击刷新按钮
const updateRefsh = () => {
  settingStore.refsh=!settingStore.refsh
}
// 全屏按钮点击的回调
const fullScreen = () => {
  // dom对象的一个属性：可以用来判断当前这个是否位全屏模式：true   否则flase
  let fullScreen = document.fullscreenElement;
  if (!fullScreen) {
    // 利用根节点的requestFullscreen实现全屏模式
    document.documentElement.requestFullscreen();
  } else { 
    document.exitFullscreen()
  }
}
const logout = () => { 
  userStore.userlogout(),
    router.push({path:'/login',query:{redirect:route.path}})
}
</script>

<style scoped lang="scss">
.tabbar{
  width:100%;
  height:100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color:rgb(233, 235,254); 
  .tabbar_left{
    display: flex;
    align-items: center;
    margin-left: 20px;
  }
  .tabbar_right{
    display: flex;
    // background:skyblue;
    align-items: center;
  }
}
</style>