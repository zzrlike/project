<template>
  <div>
    <el-card>
      <el-form :inline="true">
        <el-form-item label="一级分类">
          <el-select :disabled="scene==0?false:true" style="width: 180px;" v-model="categoryStore.c1Id" @change="handler">
            <el-option v-for="c1 in categoryStore.c1Arr" :label="c1.name" :value="c1.id"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="二级分类">
          <el-select :disabled="scene==0?false:true" style="width: 180px;" v-model="categoryStore.c2Id" @change="handler2">
            <el-option v-for="c2 in categoryStore.c2Arr" :label="c2.name" :value="c2.id"></el-option>          
          </el-select>
        </el-form-item>

        <el-form-item label="三级分类">
          <el-select :disabled="scene==0?false:true" style="width: 180px;" v-model="categoryStore.c3Id">
            <el-option v-for="c3 in categoryStore.c3Arr" :label="c3.name" :value="c3.id"></el-option>         
          </el-select>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import useCategotyStore from '@/store/modules/category.ts'
let categoryStore = useCategotyStore()
const getC1 = () => { 
  categoryStore.getC1()
}
getC1()
// 此方法为一级分类下菜单的change发生变化时触发
const handler = () => { 
  // 将二级三级清空
  categoryStore.c2Id = ''
  categoryStore.c3Arr = []
  categoryStore.c3Id=''
  categoryStore.getC2()
}
// 此方法为一级分类下菜单的change发生变化时触发
const handler2 = () => { 
  // 清空三级分类数据
  categoryStore.c3Id=''
  categoryStore.getC3()
}
defineProps(['scene'])
</script>

<style scoped>

</style>