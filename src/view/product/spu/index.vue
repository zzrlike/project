<template>
  <div>
    <!-- 三级分类 -->
    <Category :scene="scene"/>
    <el-card style="margin: 10px 0;">
     <div v-show="scene==0">
        <el-button icon="Plus" type="primary" :disabled="categoryStore.c3Id?false:true" @click="addSpu">添加SPU</el-button>
        <!-- 展示已有的数据 -->
        <el-table style="margin: 10px 0;" border :data="records">
          <el-table-column label="序号" type="index" align="center" width="80px"></el-table-column>
          <el-table-column label="SPU名称" prop="spuName"></el-table-column>
          <el-table-column label="SPU描述" prop="description" show-overflow-tooltip ></el-table-column>
          <el-table-column label="SPU操作">
            <template #="{row}">
              <el-button type="primary" icon="Plus" size="small" title="添加SPU"></el-button>
              <el-button type="primary" icon="edit" size="small" title="修改SPU" @click="updateSpu(row)"></el-button>
              <el-button type="primary" icon="View" size="small" title="查看SPU列表"></el-button>
              <el-button type="primary" icon="Delete" size="small" title="删除已有SPU"></el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页器 -->
        <el-pagination
          v-model:current-page="pageNo"
          v-model:page-size="pageSize"
          :page-sizes="[3,5,7,9]"
          :background="true"
          layout=" prev, pager, next, jumper,->,  sizes,total,"
          :total="total"
          @size-change="getHasSpu"
          @current-change="getHasSpu"
        />
     </div>
     <!-- 添加sku的子组件 -->
     <sku-from v-show="scene==2"></sku-from>
     <!-- 添加SPU|修改SPU子组件 -->
     <spu-from v-show="scene==1" ref="SpuFromRrf" @changeScene="changeScene"></spu-from>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import type {HasSpuResponseData,SpuData } from '@/api/product/spu/type.ts'
import { reqHasSpu } from '../../../api/product/spu/index.ts';
import useCategotyStore from '@/store/modules/category.ts'
let categoryStore = useCategotyStore()
import skuFrom from './components/skuFrom.vue'
import spuFrom from './components/spuForm.vue'
// 场景的数据
let scene = ref(0)
// 分页器默认页码
let pageNo = ref(1)
// 每一页展示几条数据
let pageSize = ref(3)
// 存储已有SPU总个数
let total=ref(0)
// 存储取回来的数据
let records=ref([])
// 监听三级分类的Id变化
watch(() => categoryStore.c3Id, () => { 
  // 务必保证有三级分类id
  if(!categoryStore.c3Id) return 
  getHasSpu()
})
// 次方获取获取某一个三级分类下全部的已有的SPU
const getHasSpu = async() => { 
  let res: HasSpuResponseData = await reqHasSpu(pageNo.value, pageSize.value, categoryStore.c3Id)
  if (res.code == 200) { 
    records.value = res.data.records
    total.value=res.data.total
  }
}
// 获取子组件实例
let SpuFromRrf:any=ref()
// 添加新的spu按钮的回调
const addSpu = () => { 
  // 切换为场景1：添加与修改已有的SPU结构->spuForm
  scene.value = 1
  SpuFromRrf.value.initAddSpu(categoryStore.c3Id)
}
// 子组件spuFrom绑定的自定义事件：目前让子组件切换场景为0
const changeScene = (obj:any) => { 
  scene.value = obj.flag
  if (obj.params == 'update') { 
    // 留在当前页
    getHasSpu(pageNo.value)
  }else{ 
      // 再次获取全部的数据
     getHasSpu()
  }

}

// 修改已有的spu的按钮的回调
const updateSpu = (row:SpuData) => { 
    // 切换为场景1：添加与修改已有的SPU结构->spuForm
  scene.value = 1
  SpuFromRrf.value.initHasSpuData(row)
}
</script>

<style scoped>

</style>