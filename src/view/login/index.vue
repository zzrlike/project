<template>
  <div class="login_container">
    <el-row>
      <el-col :span="12" :xs="0"></el-col>
      <el-col :span="12" :xs="24">
        <el-form class="login_form">
          <h1>hello</h1>
          <h2>欢迎来到硅谷甄选</h2>
          <el-form-item>
            <el-input :prefix-icon ="User" v-model="loginFrom.username"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input :prefix-icon ="Lock" v-model="loginFrom.password" show-password></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" class="login_btn">登录</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { User, Lock } from '@element-plus/icons-vue'
import { ref } from 'vue';
const loginFrom = ref({
  username: '',
  password:''
})
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