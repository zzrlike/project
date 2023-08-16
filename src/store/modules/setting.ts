// 管理layout组件的相关仓库
import { defineStore } from "pinia";
import { ref } from "vue";
// 创建小仓库
const useSettingStore = defineStore('SettingStore', () => {
  // 用于控制菜单是折叠还是收起
  const icon = ref(false)
  // 用于控制刷新效果
  const refsh=ref(false)
  return {
    icon,
    refsh
  }
},
)
export default useSettingStore