// 封装axios二次封装，使用拦截器
import { ElMessage} from 'element-plus'
import axios from 'axios'
import useUserStore from '@/store/modules/user.ts'
const request = axios.create({
  // 基础路径
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout:5000
})
request.interceptors.request.use(config => {
    const userStore=useUserStore()
    if (userStore.token) { 
        config.headers.token=userStore.token
    }
    return config;
});
//响应拦截器
request.interceptors.response.use((response) => {
    return response.data;
}, (error) => {
    //处理网络错误
    let msg = '';
    let status = error.response.status;
    switch (status) {
        case 401:
            msg = "token过期";
            break;
        case 403:
            msg = '无权访问';
            break;
        case 404:
            msg = "请求地址错误";
            break;
        case 500:
            msg = "服务器出现问题";
            break;
        default:
            msg = "无网络";

    }
    ElMessage({
        type: 'error',
        message: msg
    })
    return Promise.reject(error);
});
export default request;