<template>
  <el-card>
    <div class="box">
        <img :src="UserStore.avatar" alt="" class="avatar">
        <div class="bottpm">
          <h3 class="title">{{ timeOfDay }}好呀{{ UserStore.username }}</h3>
          <p class="subtitle">硅谷运营平台</p>
        </div>
    </div>
  </el-card>
  <div class="img">
    <svg-icon name="welcome" width="600px" height="300px"></svg-icon>
  </div>
  
</template>

<script setup lang="ts">
import useUserStore from "@/store/modules/user";
import timeOfDay from '@/utils/times.ts'
const UserStore = useUserStore()

</script>

<style scoped lang="scss">
.box{
  display: flex;
  .avatar{
    width: 100px;
    height: 100px;
    border-radius: 50%;
  }
  .bottpm{
    margin-left: 20px;
  .title{
    font-size: 30px;
    margin-bottom:30px ;
    font-size: 900;
  }
  .subtitle{
    font-style: italic;
    color: skyblue;
  }
  }

}
.img{
  margin-top: 10px;
  display: flex;
  justify-content: center;
}
</style>