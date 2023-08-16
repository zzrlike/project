<template>
  <div>
    <router-view v-slot="{Component}">
      <transition name="fade">
        <component :is="Component" v-if="flag"></component>
      </transition>
    </router-view>
  </div>
</template>

<script setup lang="ts">
import { watch ,ref,nextTick} from 'vue';
import useSettingStore from '@/store/modules/setting.ts'
const settingStore = useSettingStore()
// 监听仓库数据是否发生变化，如果发生变化说明用户点击过刷新按钮
let flag=ref(true)
watch(() => settingStore.refsh, () => { 
  flag.value = false;
    nextTick(() => { 
      flag.value = true
    })
})
</script>

<style scoped>
.fade-enter-from{
  opacity:0;
  transform:scale(0);
}
.fade-enter-active{
  transition:all .3s;
}
.fade-enter-to{
  opacity:1;
  transform:scale(1);
}
</style>