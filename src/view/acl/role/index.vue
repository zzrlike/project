<template>
  <el-card>
    <el-form :inline="true" class="from">
      <el-form-item label="职位搜索">
        <el-input v-model="keyword" placeholder="请输入职位的关键字"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="searchValue">搜索</el-button>
        <el-button type="primary" @click="unset">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
  <el-card style="margin: 10px 0px;">
    <el-button type="primary" @click="addRole">添加职位</el-button>
    <el-table style="margin: 10px 0px;" border :data="List">
      <el-table-column label="#" type="index" align="cenger"></el-table-column>
      <el-table-column label="ID" prop="id" align="cenger"></el-table-column>
      <el-table-column label="职位名称" prop="roleName" align="cenger" show-overflow-tooltip ></el-table-column>
      <el-table-column label="创建时间" prop="createTime" align="cenger" show-overflow-tooltip ></el-table-column>
      <el-table-column label="更新时间" prop="updateTime" align="cenger" show-overflow-tooltip ></el-table-column>
      <el-table-column label="操作" width="280px" align="cenger">
        <template #="{row}">
          <el-button type="primary" icon="user" size="small" @click="setPermisstion(row)">分配权限</el-button>
          <el-button type="warning" icon="edit" size="small" @click="UpdateRole(row)">编辑</el-button>
            <el-popconfirm @confirm="removeById(row)" :title="`你确定要删除当前${row.roleName}职位吗?`" width="200px">
              <template #reference>
                <el-button type="danger" icon="delete" size="small">删除</el-button>
              </template>
            </el-popconfirm>
          
        </template>
      </el-table-column>
    </el-table>
     <!-- 分页器 -->
    <el-pagination
      v-model:current-page="pageNo"
      v-model:page-size="pageSize"
      :page-sizes="[5,7,9,11]"
      :background="true"
      layout=" prev, pager, next, jumper,->,sizes,total"
      :total="total"
      @size-change="getUserInfo"
      @current-change="getUserInfo"
    />    
      <!-- 添加或者修改的对话框 --> 
    <el-dialog v-model="dialogVisite" :title="data.id?'修改职位':'添加职位'">
      <el-form>
        <el-form-item label="角色名称">
          <el-input v-model="data.roleName" placeholder="请输入职位名称"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button type="primary" @click="dialogVisite=false">取消</el-button>
        <el-button type="primary" @click="save">确定</el-button>
      </template>
    </el-dialog>
  </el-card>
  <!-- 抽屉组件 -->
      <el-drawer v-model="drawer2">
          <template #header>
            <h4>分配菜单与按钮的权限</h4>
          </template>
          <template #default>
            <!-- 树形框架 -->
              <el-tree
                :data="menuArr"
                show-checkbox
                node-key="id"
                ref="treeRef"
                default-expand-all
                :default-checked-keys="SelectAll"
                :props="defaultProps"
              />
          </template>
          <template #footer>
            <div style="flex: auto">
              <el-button @click="drawer2=false">取消</el-button>
              <el-button type="primary" @click="confirmClick">确定</el-button>
            </div>
          </template>
        </el-drawer>
</template>

<script setup lang="ts">
import { reqGetUserInfo,reqAddUpdate,reqAllMenuList,reqSetPermisstion,reqRemoveRole} from '@/api/acl/role'
import { ElMessage } from 'element-plus';
import { ref } from 'vue';
const treeRef=ref()
// 控制抽屉的显示与隐藏
let drawer2=ref(false)
// 控制对话框显示与隐藏的回调
let dialogVisite=ref(false)
// 收集搜索框的数据
let keyword=ref('')
// 默认页码
let pageNo = ref(1)
// 一页显示多少条数据
let pageSize = ref(5)
// 存储总页码、
let total = ref()
// 存储请求回来的数据
let List=ref([])
// 获取数据的方法
const getUserInfo = async() => {
  let res = await reqGetUserInfo(pageNo.value, pageSize.value,keyword.value)
  if (res.code == 200) { 
    total.value = res.data.total
    List.value=res.data.records
  }
  console.log(res)
}
getUserInfo()
// 搜索按钮的回调
const searchValue = () => { 
  getUserInfo()
  keyword.value=''
}
// 重置按钮的回调
const unset = () => { 
  getUserInfo()
}
//收集对话框的信息
const data = ref<any>({
  roleName: '',
})
// 添加职位按钮的回调
const addRole = () => {
  dialogVisite.value = true
  Object.assign(data.value,{
    roleName: '',
    id:0
  })
}
// 更新按钮的回调
const UpdateRole = (row:any) => { 
  dialogVisite.value = true
  Object.assign(data.value,row)
}
// 确定按钮的回调
const save = async() => { 
  let res = await reqAddUpdate(data.value)
  if (res.code == 200) {
    dialogVisite.value=false
    ElMessage({
      type: 'success',
      message: data.value.id ? '修改成功' : '添加成功'
    })
    getUserInfo()
  } else { 
    ElMessage({
      type: 'error',
      message: data.value.id ? '修改失败' : '添加失败'
    })
  }
}
// 存储用户权限的数据
let menuArr=ref<any>([])
// 收集新增岗位的数据
let RoleParams=ref<any>([])
// 分配权限按钮的回调
const setPermisstion = async(row:any) => { 
  drawer2.value = true
  // 收集当前要分配权限的数据
  Object.assign(RoleParams.value, row)
  let res = await reqAllMenuList(RoleParams.value.id)
  if (res.code == 200) { 
    menuArr.value = res.data
    SelectAll.value=FilterSelectArr(menuArr.value,[])
  }
}
const defaultProps = {
  children: 'children',
  label:'name'
}
// 准备数组用于存储勾选的id（四级）
let SelectAll=ref<any>([])
const FilterSelectArr = (allData:any,initArr:any) => { 
  allData.forEach(item => {
    if (item.select && item.level== 4){ 
      initArr.push(item.id)
    }
    if (item.children && item.children.length > 0) { 
      FilterSelectArr(item.children,initArr)
    }
  });
return initArr
}
// 抽屉确定按钮的回调
const confirmClick = async() => { 
  // 职位的id
  const roleId = RoleParams.value.id
  // 选中节点的id
  let arr = treeRef.value.getCheckedKeys()
  // 半选中的id
  let arr1=treeRef.value.getHalfCheckedKeys()
  // 下发权限
  let permissionId = arr.concat(arr1)
  let res = await reqSetPermisstion(roleId, permissionId)
  if (res.code == 200) { 
    ElMessage.success('分配权限成功')
    drawer2.value=false
    window.location.reload()
  }
  

}
// 删除的时间
const removeById = async(row:any) => {
  let res = await reqRemoveRole(row.id)
  if (res.code == 200) {
    ElMessage.success('删除成功')
    getUserInfo()
  } else { 
    ElMessage.error('删除失败')
  }
 }
</script>

<style scoped>
.from{
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
}
</style>