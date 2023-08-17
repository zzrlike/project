<template>
    <!-- 三级分类全局组件 -->
    <Category :scene="scene"/>
    <el-card style="margin: 10px 0;">
      <div v-if="scene==0">
          <el-button type="primary" @click="addAttr" icon="Plus" :disabled="categoryStore.c3Id?false:true
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
              <el-button type="primary" size="small" icon="Edit" @click="updateAttr(row)"></el-button>
              <el-popconfirm :title="`你确定要删除${row.attrName}嘛？`" width="200px" @confirm="DeleteAttr(row.id)">
                <template #reference>
                  <el-button type="primary" size="small" icon="delete"></el-button>
                </template>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div v-if="scene==1">
        <!-- 展示添加属性和修改数据的结构 -->
        <el-form :inline="true">
          <el-form-item label="属性名称">
            <el-input placeholder="请输入属性名称" v-model="attrParams.attrName"></el-input>
          </el-form-item>
        </el-form>
        <el-button @click="addAttrValues" type="primary" :disabled="attrParams.attrName?false:true">添加属性值</el-button>
        <el-button>取消</el-button>
        <el-table border style="margin: 10px 0;" :data="attrParams.attrValueList">
          <el-table-column label="序号" width="80px" type="index" align="center"></el-table-column>
          <el-table-column label="属性值名称">
            <template #="{row,$index}">
                <el-input :ref="(vc:any)=>imputArr[$index]=vc" v-if="row.falg" @blur="toLook(row,$index)" placeholder="请输入属性值名称" v-model="row.valueName"></el-input>
                <div v-else @click="toEdit(row,$index)">{{ row.valueName }}</div>
            </template>
          </el-table-column>
          <el-table-column label="属性值操作">
            <template #="{row,$index}">
              <el-button type="primary" icon="delete" size="small" @click="attrParams.attrValueList.splice($index,1)"></el-button>
            </template>
          </el-table-column>
        </el-table>   
        <el-button type="primary" @click="save" :disabled="attrParams.attrValueList.length>0?false:true">保存</el-button>
        <el-button type="primary" @click="scene=0">取消</el-button>        
      </div>
    </el-card>
</template>

<script setup lang="ts">
import useCategotyStore from '@/store/modules/category.ts'
import { reqAttr,reqAddOrUpdateAttr,reqRemoveAttr} from '@/api/product/attr/index.ts'
import { watch ,ref,nextTick,onBeforeUnmount} from 'vue';
import { ElMessage, } from 'element-plus';
let categoryStore = useCategotyStore()
let attrArr=ref([])
// 监听仓库三级分类ID变化
watch(() => categoryStore.c3Id, async () => { 
  attrArr.value=[]
  // 获取分类id
  getAttr()
  
})
const getAttr = async() => { 
  const { c1Id, c2Id, c3Id } = categoryStore
  if(!c3Id) return 
  let res = await reqAttr(c1Id, c2Id, c3Id)
  if (res.code == 200) { 
    attrArr.value = res.data
  }
}
// 定义卡片组件内容的切换
let scene = ref(0)
// 收集新增属性的数据
let attrParams = ref<any>({
  attrName: '',//新增属性的名字
  attrValueList: [], //新增属性的数组
  categoryId: '',//三级分类的id
  categoryLevel: 3 //代表的时三级分类
})
const addAttr = () => { 
  scene.value = 1,
    Object.assign(attrParams, {
      attrName: '',//新增属性的名字
      attrValueList: [], //新增属性的数组
      categoryId: '',//三级分类的id
      categoryLevel: 3 //代表的时三级分类
    })
}
// 添加属性值
const addAttrValues = () => {
  attrParams.value.categoryId=categoryStore.c1Id
  // 点击添加属性值按钮的时候向数组添加一个属性值对象
  attrParams.value.attrValueList.push({
    valueName: '',
    falg:true
  })
  // 获取最后的input组件并聚焦
  nextTick(() => {
    imputArr.value[attrParams.value.attrValueList.length-1].focus()
   })
}
// 保存按钮的回调
const save = async() => { 
  let res = await reqAddOrUpdateAttr(attrParams.value)
  if (res.code == 200) {
    scene.value = 0
    ElMessage({
      type: 'success',
      message: attrParams.value.id ? '修改成功' : '添加成功'
    })
    getAttr()
  } else { 
      ElMessage({
            type: 'error',
            message: attrParams.value.id ? '修改失败' : '添加失败'
          })
  }
}
// 属性值表单元素失去焦点的一个回调
const toLook = (row: any,$index:number) => { 
  // 非法情况的一个判断
  if (row.valueName.trim() == '') { 
    attrParams.value.attrValueList.splice($index,1)
    ElMessage.error('属性值不能为空')
    return 
  }
  let repeat=attrParams.value.attrValueList.find(item=> {
    if (item != row) { 
    return item.valueName==row.valueName
    }
  })
  if (repeat) { 
    // 将重复数据干掉
    attrParams.value.attrValueList.splice($index,1)
    ElMessage.error('属性值不能重复')
    return
  }
  // 相应的属性值对象flag变为false，展示div
  row.falg=false
}
// 属性值div点击事件
const toEdit = (row:any,$index:number) => { 
  row.falg = true
  nextTick(() => { 
    imputArr.value[$index].focus()
  })
}
// 存储获取到的dom对象
let imputArr = ref<any>([])
//编辑操作
const updateAttr = (row:any) => {
  scene.value = 1
  // 将已有的属性对象赋值给attrParams对象
  Object.assign(attrParams.value, JSON.parse(JSON.stringify(row)))
}
const DeleteAttr = async(id:number) => { 
  let res = await reqRemoveAttr(id)
  if (res.code == 200) {
    ElMessage.success('删除成功')
    getAttr()
  } else { 
    ElMessage.error('删除失败')
  }
}
// 把仓库的数据清空
onBeforeUnmount(() => { 
  // 清空分类的数据
  // categoryStore.$reset()
})
</script>

<style scoped>

</style>