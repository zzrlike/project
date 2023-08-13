<template>
  <div class="login_container">
    <el-row>
      <el-col :span="12" :xs="0"></el-col>
      <el-col :span="12" :xs="24">
        <el-form class="login_form" :model="loginFrom" :rules="rules" ref="loginRef">
          <h1>hello</h1>
          <h2>欢迎来到硅谷甄选</h2>
          <el-form-item prop="username">
            <el-input :prefix-icon ="User" v-model="loginFrom.username"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input :prefix-icon ="Lock" v-model="loginFrom.password" show-password></el-input>
          </el-form-item>
          <el-form-item>
            <el-button :loading="loading" type="primary" class="login_btn" @click="loginBtn">登录</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import times from '../../utils/times.ts'
import { User, Lock } from '@element-plus/icons-vue'
import useUserStore from '@/store/modules/user'
import { ElNotification } from 'element-plus';
import { useRouter } from 'vue-router';
const router =useRouter()
const useStore=useUserStore()
import { ref } from 'vue';
const loginRef=ref()
// 按钮加载效果
let loading=ref(false)
const loginFrom = ref({
  username: 'admin',
  password:'111111'
})
// 登录按钮实现的业务
const loginBtn = async () => { 
  await loginRef.value.validate()
  try {
    loading.value=true
    await useStore.userLogin(loginFrom.value)
    router.push('/')
    ElNotification({
      type: 'success',
      message: '欢迎回来',
      title:`Hi ,${times}好`
    })
    loading.value=false
  } catch (error) { 
    loading.value = false
     ElNotification({
      type: 'error',
      message:(error as Error).message
    })
  }
}
const rules = {
  username: [
    {
      required: true, message: '请输入账号', trigger:'blur'
    }, {
      required: true,min:4,max:10,message:'账号长度在 4-10位之间',trigger:'blur'
    }
  ],
  password: [
    {
      required: true, message: '请输入密码', trigger:'blur'
    },
    {
       required: true,min:4,max:10,message:'密码长度在 4-10位之间',trigger:'blur'
    }
  ]
}

</script>

<style scoped lang="scss">
.login_container{
  width: 100%;
  height: 100vh;
  background: url('@/assets/images/background.jpg') no-repeat;
  background-size: cover;
}
.login_form{
  position: relative;
  width: 80%;
  top: 30vh;
  background: url('@/assets/images/login_form.png') no-repeat;
  background-size: cover;
  padding: 20px;
  h1{
    color: white;
    font-size: 40px;
  }
  h2{
    color: white;
    font-size: 20px;
    margin: 20px 0;
  }
  .login_btn{
    width: 100%;
  }
}
</style>