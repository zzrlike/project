<template>
   <el-table row-key="id" :data="PermisstionALl" border style="width: 100%;margin-bottom:20px;">
    <el-table-column label="名称" prop="name"></el-table-column>
    <el-table-column label="权限值" prop="code" />
    <el-table-column label="修改时间" prop="updateTime" />
    <el-table-column label="操作">
      <template #="{row}">
        <el-button @click="addPermisstion(row)" type="primary" size="small" :disabled="row.level==4?true:false">{{ row.level==3?'添加功能':'添加菜单' }}</el-button>
        <el-button @click="updatePermisstion(row)" type="warning" size="small" :disabled="row.level==1?true:false">编辑</el-button>
        
          <el-popconfirm width="260px" :title="`你确定要删除${row.name}吗？`" @confirm="DeleteById(row.id)">
            <template #reference>
              <el-button type="danger" size="small" :disabled="row.level==1?true:false">删除</el-button>
            </template>
          </el-popconfirm>
      </template>
    </el-table-column>
  </el-table>
  <!-- 对话框 -->
  <el-dialog
    v-model="dialogVisible"
    :title="menuData.id?'更新菜单':'添加菜单'"
    width="30%"
  >
    <!-- 表单组件：收集添加和更新的的菜单数据 -->
    <el-form-item label="名称">
      <el-input v-model="menuData.name" placeholder="请你输入输入菜单的名称"></el-input>
    </el-form-item>
    <el-form-item label="权限">
      <el-input v-model="menuData.code" placeholder="请你输入输入权限值"></el-input>
    </el-form-item>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="save">
          确定
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { reqAllPermisstion,reqAddOrUpdateMenu ,reqRemoveMenu} from '@/api/acl/menu'
import { ElMessage } from 'element-plus';
// 存储菜单的数据
let PermisstionALl=ref([])
// 获取数据
const getHaspermisstion = async() => { 
  let res = await reqAllPermisstion()
  if (res.code == 200) { 
    PermisstionALl.value=res.data
  }
}
getHaspermisstion()
// 定义响应式数据控制对话框的显示与隐藏
let dialogVisible = ref(false)
// 携带的参数
let menuData = ref<any>({
  code: '',
  level: 0,
  name: '',
  pid:0
})
// 添加按钮的回调
const addPermisstion = (row: any) => {
  Object.assign(menuData.value, {
  id:0,
  code: '',
  level: 0,
  name: '',
  pid:0
})
  dialogVisible.value = true
  // 收集新增的菜单的level数值
  menuData.value.level = row.level + 1
  // 给谁新增子菜单
  menuData.value.pid=row.id
}
// 编辑已有的菜单
const updatePermisstion = (row: any) => { 
  Object.assign(menuData.value,row)
  dialogVisible.value=true
}
// 确定按钮的回调
const save = async() => { 
  let res = await reqAddOrUpdateMenu(menuData.value)
  if (res.code == 200) { 
    dialogVisible.value = false
    ElMessage({
      type: 'success',
      message:menuData.value.id?'更新成功':'添加成功'
    })
    getHaspermisstion()
  }
}
// 删除按钮的回调
const DeleteById=async(id:any) => { 
  let res = await reqRemoveMenu(id)
  if (res.code == 200) {
    ElMessage.success('删除成功')
  } else { 
    ElMessage.error('删除失败')
  }
  getHaspermisstion()
}
</script>

<style scoped>

</style>