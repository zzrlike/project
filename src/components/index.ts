import SvgIcon from './SvgIcon/index.vue'
import Paginaction from './Paginaction/index.vue'
const allGloableComponent = { SvgIcon, Paginaction }
// 引入element-plus提供全部图标组件
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
// 对外暴露插件对象
export default {
  // 务必叫做install方法
  install(app) { 
    // 注册项目全部得全局组件
    Object.keys(allGloableComponent).forEach(key => {
      // 注册为全局组件
      app.component(key, allGloableComponent[key])
    });
    // 将element-plus提供的图标注册位全局组件
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) { 
      app.component(key,component)
    }
  }
}