<template>
  <div>
      <el-card class="box-card">
        <!-- 卡片添加按钮 -->
        <el-button type="primary" icon="Plus" @click="addtrandemark">添加品牌</el-button>
        <!-- 表格容器 -->
        <el-table :data="trademarkArr" border style="margin: 10px 0;">
          <el-table-column type="index" label="序号" width="80px" align="center"></el-table-column>
          <el-table-column prop="tmName" label="品牌名称"></el-table-column>
          <el-table-column prop="gender" label="品牌LoGo">
            <template #default="{ row }">
              <img :src="row.logoUrl" alt="" style="width: 100px;height: 100px;">
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template #default="{ row }">
              <el-button @click="updatetranemark" type="primary" size="small" icon="edit" ></el-button>
              <el-popconfirm :title="`你确定要删除已有品牌${row.tmName}吗？`" width="250px" icon="delete" @confirm="deleteremove(row.id)">
                <template #reference>
                  <el-button @click="" type="danger" size="small" icon="delete"></el-button>
                </template>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页器组件 -->
        <el-pagination
          v-model:current-page="pageNo"
          v-model:page-size="limit"
          :page-sizes="[3, 5, 7, 9]"
          :background="true"
          layout=" prev, pager, next, jumper,->,sizes,total"
          :total="total"
          @size-change="getHasTrademark"
          @current-change="getHasTrademark"
        />
      </el-card>
      <el-dialog v-model="dialogFormVisible" title="添加品牌">
        <el-form style="width: 80%;">
          <el-form-item label="品牌名称" label-width="80px">
            <el-input placeholder="请输入品牌名称" v-model="trademarkParams.tmName"></el-input>
          </el-form-item>
          <el-form-item label="品牌LOGO" label-width="80px">
              <el-upload
                class="avatar-uploader"
                action="/api/admin/product/fileUpload">
              </el-upload>
          </el-form-item>
        </el-form>
        <!-- 剧名插槽 -->
        <template #footer>
          <el-button type="primary" @click="cancel">取消</el-button>
          <el-button type="primary" @click="confirm">确定</el-button>          
        </template>
      </el-dialog>
  </div>
  
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { reqHasTrandemark,reqDeleteTrademark } from '@/api/product/trademark/index.ts'
import { TradeMarkResponseData} from '@/api/product/trademark/type.ts'
import { ElMessage } from 'element-plus';
// 当前页码
let pageNo = ref(1)
// 每页显示的条数
let limit = ref(3)
// 存储已有品牌数据的总数
let total = ref(0)
// 存储请求回来的数据源
let trademarkArr=ref<TradeMarkResponseData>([])
// 获取已有数据的接口
const getHasTrademark = async () => { 
  const res:TradeMarkResponseData = await reqHasTrandemark(pageNo.value, limit.value)
  if (res.code == 200) { 
    total.value = res.data.total
    res.data.records[0].logoUrl='http://'+res.data.records[0].logoUrl
    trademarkArr.value=res.data.records
  }
}
getHasTrademark()

// 添加
// 定义收集新增品牌数据
const trademarkParams = ref({
  tmName: '',
  logoUrl:''
})

const dialogFormVisible = ref(false)
const addtrandemark = () => { 
  dialogFormVisible.value=true
}


// 对话框底下取消
const cancel = () => { 
    dialogFormVisible.value=false
}
// 对话框确定
const confirm = () => { 
  dialogFormVisible.value=false
}

// 修改
const updatetranemark = () => { 
    dialogFormVisible.value=true
}
// 确定删除
const deleteremove = async(id:number) => { 
  let res = await reqDeleteTrademark(id)
  if (res.code = 200) {
    ElMessage({
      type: 'success',
      message: '删除成功'
    })
    getHasTrademark()
  } else { 
     ElMessage({
      type: 'error',
      message: '删除失败'
    })
  }

}
</script>

<style scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>