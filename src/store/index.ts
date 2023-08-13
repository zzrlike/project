import { createPinia } from 'pinia'
import persist from 'pinia-plugin-persistedstate'
// 创建大仓库
const pinia = createPinia().use(persist)
export default pinia