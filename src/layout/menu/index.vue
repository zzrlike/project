<template>
  <div>
    <template v-for="(item) in menuList" :key="item.path">
      <!-- 没有子路由 -->
      <template  v-if="!item.children">
        <el-menu-item :index="item.path" v-if="!item.meta.hidden" @click="goRoute">
          <el-icon>
              <component :is="item.meta.icon"></component>
            </el-icon>
          <template #title>
            <span>{{ item.meta.title }}</span>
          </template>
        </el-menu-item>
      </template>
      
      <!-- 有子路由但是只有一个 -->
      <template v-if="item.children&&item.children.length==1">
        <el-menu-item v-if="!item.children[0].meta.hidden" :index="item.children[0].path" @click="goRoute">
           <el-icon>
              <component :is="item.children[0].meta.icon"></component>
            </el-icon>
        <template #title>
         
          <span>{{ item.children[0].meta.title}}</span>
        </template>
      </el-menu-item>
      </template>
      
      <!-- 有子路由且个数大于1个 -->
      <el-sub-menu :index="item.path" v-if="item.children&&item.children.length>1">
        <template #title>
           <el-icon>
              <component :is="item.meta.icon"></component>
            </el-icon>
          <span>{{ item.meta.title}}</span>
        </template>
        <Menu :menuList="item.children"></Menu>
      </el-sub-menu>
    </template>
  </div>
</template>

<script setup lang="ts">
// 获取父组件传递过来的全部路由的数据
defineProps(['menuList'])
import { useRouter } from 'vue-router'

const router=useRouter()
// 点击菜单的回调
const goRoute = (xc:any) => { 
  router.push(xc.index)
}
</script>
<script lang="ts">
export default {
  name:'Menu'
}
</script>
<style scoped>

</style>