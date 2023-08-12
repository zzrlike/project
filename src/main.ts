import { createApp } from "vue";
import ElementPlus from "element-plus";
// 引入element-plus插件与样式
import "element-plus/dist/index.css";
import App from "./App.vue";
// svg插件的需要得配置
import 'virtual:svg-icons-register'
const app = createApp(App);
// 引入自定义插件对象
import gloalComponent from './components';
app.use(gloalComponent)
app.use(ElementPlus);
// 引入模板得全局样式
import '@/style/index.scss'
import Mock from './mock/index.ts';
Mock.setup({
  timeout: 500 // 设置响应时间
});
// 引入路由
import router from '@/router'
app.use(router)
app.mount("#app");
