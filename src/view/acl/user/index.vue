<template>
  <el-card style="height: 80px;">
    <el-form :inline="true" class="form">
      <el-form-item label="用户名:">
        <el-input v-model="keyword" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="serachValue" :disabled="keyword?false:true">搜索</el-button>
        <el-button type="primary" @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
  <el-card style="margin: 10px 0;">
      <el-button type="primary" @click="addUser">添加用户</el-button>
      <el-button type="primary" @click="DeleteSelectUser">批量删除</el-button>
      <!-- 表格展示用户的信息 -->
      <el-table @selection-change="selectChange" style="margin: 10px 0;" border :data="userinfoList">
        <el-table-column type="selection" align="center"></el-table-column>
        <el-table-column label="#" align="center" type="index"></el-table-column>
        <el-table-column label="ID" align="center" prop="id"></el-table-column>
        <el-table-column label="用户名" align="center" prop="username" show-overflow-tooltip ></el-table-column>
        <el-table-column label="用户名称" align="center" prop="name" show-overflow-tooltip ></el-table-column>
        <el-table-column label="用户角色" align="center" prop="roleName" show-overflow-tooltip ></el-table-column>
        <el-table-column label="创建时间" align="center" prop="createTime" show-overflow-tooltip ></el-table-column>
        <el-table-column label="更新时间" align="center" prop="updateTime" show-overflow-tooltip ></el-table-column>
        <el-table-column label="操作" width="300px" align="center">
          <template #="{row}">
            <el-button type="primary" icon="User" size="small" @click="setRole(row)">分配角色</el-button>
            <el-button type="warning" icon="Edit" size="small" @click="UpdateUser(row)">编辑</el-button>
              <el-popconfirm :title="`你确定要删除${row.username}吗？`" width="200px" @confirm="deleteUser(row.id)">
                <template #reference>
                    <el-button type="danger" icon="Delete" size="small">删除</el-button>
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
  </el-card>
  <!-- 抽屉结构：完成添加新的用户信息|更新已有的账户信息 -->
      <el-drawer v-model="drawer">
      <template #header>
        <h4>{{ userParams.id?'更新用户':'添加用户' }}</h4>
      </template>
      <template #default>
        <el-form :model="userParams" :rules="rules" ref="FromRef">
          <el-form-item label="用户姓名" prop="username">
            <el-input v-model="userParams.username" placeholder="请输入用户姓名"></el-input>
          </el-form-item>
          <el-form-item label="用户昵称" prop="name">
            <el-input v-model="userParams.name" placeholder="请输入用户昵称"></el-input>
          </el-form-item>
          <el-form-item label="用户密码" prop="password" v-if="!userParams.id">
            <el-input v-model="userParams.password" placeholder="请输入用户密码"></el-input>
          </el-form-item>
        </el-form>
      </template>
      <template #footer>
        <div style="flex: auto">
          <el-button @click="cancelClick">取消</el-button>
          <el-button type="primary" @click="confirmClick">确定</el-button>
        </div>
      </template>
    </el-drawer>
    <!-- 分配权限的抽屉 -->
      <el-drawer v-model="drawer2">
          <template #header>
            <h4>分配角色</h4>
          </template>
          <template #default>
            <el-form>
              <el-form-item label="用户姓名">
                <el-input v-model="userParams.username" disabled="true"></el-input>
              </el-form-item>
              <el-form-item label="职位列表">
                <el-checkbox
                  v-model="checkAll"
                  :indeterminate="isIndeterminate"
                  @change="handleCheckAllChange"
                  >全选</el-checkbox
                >
                <!-- 显示职位的复选框 -->
                 <el-checkbox-group
                    v-model="userRole"
                    @change="handleCheckedCitiesChange"
                  >
                    <el-checkbox v-for="role in allRole" :key="role" :label="role">{{
                      role.roleName
                    }}</el-checkbox>
                  </el-checkbox-group>
              </el-form-item>
            </el-form>
          </template>
          <template #footer>
            <div style="flex: auto">
              <el-button @click="cancelClick">取消</el-button>
              <el-button type="primary" @click="RoleSave">确定</el-button>
            </div>
          </template>
        </el-drawer>
</template>

<script setup lang="ts">
import useSettingStore from '@/store/modules/setting.ts'
const settingStore = useSettingStore()
import { reqUserInfo,reqAddOrUpdate,reqAllRole,reqSetUserRole,RomoveUser,reqSelectUser} from '@/api/acl/user/index.ts'
import {ElMessage } from 'element-plus';
import { ref, nextTick } from 'vue';
// 定义响应式数据去收集用户输入进来的关键字
let keyword=ref('')
// 默认页码
let pageNo = ref(1)
// 一页显示多少条数据
let pageSize = ref(5)
// 存储总页码、
let total=ref()
// 存取请求回来的数据
let userinfoList: any = ref([])
// 定义响应式数据控制抽屉的显示与隐藏
let drawer = ref<boolean>(false)
// 获取form表单实例
const FromRef=ref()
// 获取数据的方法
const getUserInfo=async() => { 
  let res = await reqUserInfo(pageNo.value, pageSize.value,keyword.value)
  if (res.code == 200) { 
    userinfoList.value = res.data.records
    total.value=res.data.total
  }
}
getUserInfo()
// 收集添加或修改的数据
let userParams = ref<any>({
  username: '',
  name: '',
  password:''
})
// 添加用户按钮的回调
const addUser = () => { 
  drawer.value = true,
  // 清空数据
    Object.assign(userParams.value, {
    id:0,
    username: '',
    name: '',
    password:''
  })
  // 清除上一次的提示信息
  nextTick(() => {
    FromRef.value.clearValidate('username')
    FromRef.value.clearValidate('name')
    FromRef.value.clearValidate('password')
   })

}
// 更新已有的用户的回调
const UpdateUser = (row:any) => { 
  drawer.value = true
  Object.assign(userParams.value, row)
  // 清除上一次的提示信息
  nextTick(() => {
    FromRef.value.clearValidate('username')
    FromRef.value.clearValidate('name')
   })
}

// 点击了保存按钮的回调
const confirmClick = async () => {
  // 点击保存按钮的时候。务必需要保证表单符合条件再去发请求 
  await FromRef.value.validate()
  let res = await reqAddOrUpdate(userParams.value)
  if (res.code == 200) {
    drawer.value = false
    ElMessage({ type: 'success', message: userParams.value.id ? '更新成功' : '添加成功' })
    // 浏览器自动刷新一次
    window.location.reload()
  } else { 
    drawer.value = false
    ElMessage({ type: 'error', message: userParams.value.id ? '更新失败' : '添加失败' })
  }
  getUserInfo()
}
// 取消按钮的回调
const cancelClick = () => { 
  drawer.value=false
}
//校验用户名字回调函数
const validatorUsername = (rules:any,value:any,callBack:any) => { 
  if (value.trim().length >= 5) {
    callBack()
  } else { 
    callBack(new Error('用户的名字至少5位'))
  }
}
// 校验用户昵称的回调函数
const validatorname = (rules:any,value:any,callBack:any) => { 
  if (value.trim().length >= 5) {
    callBack()
  } else { 
    callBack(new Error('用户的昵称至少5位'))
  }
}
// 校验用户昵称的回调函数
const validatorpassword = (rules:any,value:any,callBack:any) => { 
  if (value.trim().length >= 6) {
    callBack()
  } else { 
    callBack(new Error('用户的密码至少6位'))
  }
}
// 表单校验规则对象
const rules = {
  // 用户名字
  username: [
    {required:true,trigger:'blur',validator:validatorUsername}
  ],
  name:[
     {required:true,trigger:'blur',validator:validatorname}
  ],
  password: [
    {required:true,trigger:'blur',validator:validatorpassword}
  ]
}
// 控制分配角色的显示与隐藏
let drawer2 = ref(false)
//全部的职位
let allRole = ref<any>([])
//已有的职位
let userRole=ref<any>([])
// 分配角色按钮的回调
const setRole = async(row:any) => { 
  Object.assign(userParams.value, row)
  //发请求获取全部的职位的数据与当前职位的数据
  let res = await reqAllRole(userParams.value.id)
  if (res.code == 200) { 
    // 存储全部的职位
    allRole.value = res.data.allRolesList
    // 存储当前职位已有的职位
    userRole.value = res.data.assignRoles
    // 展示抽屉
    drawer2.value = true
  }
  
  
}
// 全选复选框是否全选
let checkAll = ref(false)
// 设置不确定的样式
let isIndeterminate = ref(true)
// 全选复选框发生变化
const handleCheckAllChange = (val:any) => {
  userRole.value = val ? allRole.value : []
  isIndeterminate.value=false
}
//  底部复选框change的事件
const handleCheckedCitiesChange = (value:any) => { 
  // value返回已经勾选的数据
  const checkedCount = value.length
  checkAll.value = checkedCount === allRole.value.length
  isIndeterminate.value = checkedCount > 0 && checkedCount < allRole.value.length
}
// 确定按钮回调分配职位
const RoleSave = async() => { 
  let data: any = {
    userId: userParams.value.id,
    roleIdList: userRole.value.map(item=>item.id)
  }
  console.log(data)
  let res = await reqSetUserRole(data)
  if (res.code == 200) { 
    ElMessage.success('分配职务成功')
    drawer2.value = false
    getUserInfo()
  }
}
// 删除某一个用户
const deleteUser =async (id: number) => { 
  let res = await RomoveUser(id)
  if (res.code == 200) {
    ElMessage.success('删除成功')
    getUserInfo()
  } else { 
    ElMessage.error('删除失败')
  }
}
//准备一个数据去存储批量删除的用户的ID
let selectIdArr=ref([])
// 复选框勾选的时候触发事件
const selectChange = (value:any) => { 
  selectIdArr.value=value
}
// 批量删除按钮的回调
const DeleteSelectUser = async() => { 
  let idsList=selectIdArr.value.map(item =>{
    return item.id
  })
  let res=await reqSelectUser(idsList)
    if (res.code == 200) {
    ElMessage.success('删除成功')
    getUserInfo()
  } else { 
    ElMessage.error('删除失败')
  }
}
// 搜索按钮的回调
const serachValue = () => {
  getUserInfo()
  keyword.value=''
}
// 重置按钮的回调
const reset = () => { 
    settingStore.refsh=!settingStore.refsh
}
</script>

<style scoped lang="scss">
.form{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>