<template>
    <!-- 三级分类全局组件 -->
    <Category :scene="scene"/>
    <el-card style="margin: 10px 0;">
      <div v-if="scene==0">
          <el-button type="primary" @click="scene=1" icon="Plus" :disabled="categoryStore.c3Id?false:true
        ">添加属性</el-button>
        <el-table border style="margin: 10px 0;" :data="attrArr">
          <el-table-column label="序号" type="index" align="center" width="80px"></el-table-column>
          <el-table-column label="属性名称" width="120px" prop="attrName"></el-table-column>
          <el-table-column label="属性值名称">
            <template #="{row}">
              <el-tag style="margin: 5px;" v-for="item in row.attrValueList">{{ item.valueName }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="120px">
            <template #="{row}">
              <el-button type="primary" size="small" icon="Edit" @click="scene=1"></el-button>
              <el-button type="primary" size="small" icon="Edit"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div v-if="scene==1">
        <!-- 展示添加属性和修改数据的结构 -->
        <el-form :inline="true">
          <el-form-item label="属性名称">
            <el-input placeholder="请输入属性名称"></el-input>
          </el-form-item>
        </el-form>
        <el-button type="primary">添加属性值</el-button>
        <el-button>取消</el-button>
        <el-table border style="margin: 10px 0;">
          <el-table-column label="序号" width="80px" type="index" align="center"></el-table-column>
          <el-table-column label="属性值名称"></el-table-column>
          <el-table-column label="属性值操作"></el-table-column>
        </el-table>   
        <el-button type="primary">保存</el-button>
        <el-button type="primary" @click="scene=0">取消</el-button>        
      </div>
    </el-card>
</template>

<script setup lang="ts">
import useCategotyStore from '@/store/modules/category.ts'
import { reqAttr} from '@/api/product/attr/index.ts'
import { watch ,ref} from 'vue';
let categoryStore = useCategotyStore()
let attrArr=ref([])
// 监听仓库三级分类ID变化
watch(() => categoryStore.c3Id, async () => { 
  attrArr.value=[]
  // 获取分类id
  const { c1Id, c2Id, c3Id } = categoryStore
  if(!c3Id) return 
  let res = await reqAttr(c1Id, c2Id, c3Id)
  if (res.code == 200) { 
    attrArr.value=res.data
  }
})
// 定义卡片组件内容的切换
let scene = ref(0)
// 收集新增属性的数据
let attrParams = ref({
  attrName: '',//新增属性的名字
  attrValueList: [], //新增属性的数组
  categoryId: '',//三级分类的id
  categoryLevel: 3 //代表的时三级分类
})
</script>

<style scoped>

</style>