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
      
      <el-popover
          placement="top-start"
          title="主题设置"
          :width="300"
          trigger="hover"
        >
        <!-- 表单组件 -->
        <el-form>
          <el-form-item label="主题颜色">
             <el-color-picker size="small" v-model="color" show-alpha 
             @change="setColor"
             :predefine="predefineColors" />
          </el-form-item>
          <el-form-item label="暗黑模式">
              <el-switch
                @change="changeDark"
                v-model="drak"
                inline-prompt
                active-icon="MoonNight"
                inactive-icon="Sunny"
              />
          </el-form-item>
        </el-form>
          <template #reference>
            <el-button  size="small" icon="Setting" circle ></el-button>
          </template>
        </el-popover>
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
import { ref} from 'vue'
import { useRoute,useRouter } from 'vue-router';
const route = useRoute()
const router=useRouter()
import useSettingStore from '@/store/modules/setting.ts'
const settingStore = useSettingStore()
import useUserStore from '@/store/modules/user.ts'
const userStore=useUserStore()
const changicon = () => { 
  // settingStore.icon=!settingStore.icon
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
// 颜色组件需要的数据
const color = ref('rgba(255, 69, 0, 0.68)')
const predefineColors = ref([
  '#ff4500',
  '#ff8c00',
  '#ffd700',
  '#90ee90',
  '#00ced1',
  '#1e90ff',
  '#c71585',
  'rgba(255, 69, 0, 0.68)',
  'rgb(255, 120, 0)',
  'hsv(51, 100, 98)',
  'hsva(120, 40, 94, 0.5)',
  'hsl(181, 100%, 37%)',
  'hsla(209, 100%, 56%, 0.73)',
  '#c7158577',
])
// 收集开关的数据
let drak = ref(false)
// 开关的chanege事件进行暗黑模式的切换
const changeDark = () => { 
  // 获取html根节点
  let html = document.documentElement
  // 判断html标签是否有类目dark
  drak.value?html.className='dark':html.className=''
}
// 主题颜色的设置
const setColor = () => {
  // 通知js修改根节点的样式对象的属性与属性值
  const html = document.documentElement
  html.style.setProperty('--el-color-primary',color.value)
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