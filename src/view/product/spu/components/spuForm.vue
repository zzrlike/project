<template>
  <div>
    <el-form label-width="100px">
      <el-form-item label="SPU名称">
        <el-input placeholder="请输入spu名称" v-model="spuParams.spuName"></el-input>
      </el-form-item>
      <el-form-item label="SPU品牌">
        <el-select  placeholder="请您选择品牌" v-model="spuParams.tmId">
          <el-option v-for="item in AlltradeMark" :label="item.tmName" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="SPU描述">
        <el-input type="textarea" v-model="spuParams.description"></el-input>
      </el-form-item>
      <el-form-item label="SPU图标">
         <el-upload
            v-model:file-list="imgList"
            action="/api/admin/product/fileUpload"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
          >
            <el-icon><Plus /></el-icon>
          </el-upload>
            <el-dialog v-model="dialogVisible">
              <img w-full :src="dialogImageUrl" alt="Preview Image" style="width: 100%;height: 100%;"/>
            </el-dialog>
      </el-form-item>
      <el-form-item label="SPU销售属性">
        <el-select  :placeholder="unSelectSaleAttr.length?`还未选择${unSelectSaleAttr.length}个`:'无'" v-model="saleAttrIdAndValueName">
          <el-option :value="`${item.id}:${item.name}`" v-for="item in unSelectSaleAttr" :label="item.name"></el-option>
        </el-select>
        <el-button @click="addSaleAttr" :disabled="saleAttrIdAndValueName?false:true" style="margin-left:10px" type="primary" icon="Plus">添加属性</el-button>
        <!-- table展示销售属性与属性值的地方 -->
        <el-table border style="margin:10px 0" :data="saleAttr">
          <el-table-column label="序号" type="index" align="center" width="80px"></el-table-column>
          <el-table-column prop="saleAttrName" label="销售属性名字" width="120px"></el-table-column>
          <el-table-column label="销售属性值">
            <template #="{row}">
              <el-tag
                v-for="(tag,index) in row.spuSaleAttrValueList"
                :key="tag.id"
                class="mx-1"
                closable
                style="margin: 0px 5px;"
                @close="row.spuSaleAttrValueList.splice(index,1)"
              >
                {{ tag.saleAttrValueName }}
              </el-tag>
              <el-input @blur="toLook(row)" v-model="row.saleAttrValue" v-if="row.flag==true" placeholder="请你输入属性值" size="small" style="width: 100px;"></el-input>
              <el-button @click="toEdit(row)" v-else type="primary" size="small" icon="Plus"></el-button>
            </template>
          </el-table-column>
          <el-table-column label="操作"  width="120px">
            <template #="{row,$index}">
              <el-button type="primary" size="small" icon="delete" @click="saleAttr.splice($index,1)"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="save" :disabled="saleAttr.length>0?false:true">保存</el-button>
        <el-button type="primary" @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { reqAddOrUpdateSpu} from '@/api/product/spu/index.ts'
import { ref, computed } from 'vue';
import { ElMessage } from 'element-plus';
import { reqAllTrademark,reqSpuImageList,reqSpuHasSaleAttr,reqALlSaleAttr } from '../../../../api/product/spu';
let emit = defineEmits(['changeScene'])
// 子组件点击取消按钮，通知父组件切换场景为1，展示有的spu的数据
const cancel = () => { 
  emit('changeScene', {flag:0,params:'update'})
}
// 存储已有的spu这些数据
let AlltradeMark: any = ref([])
// 商品的图片
let imgList = ref([])
// 已有的销售属性
let saleAttr = ref([])
// 全部的销售属性
let allsaleAttr = ref([])
// 收集还未选择的销售属性的id与属性值的名字
let saleAttrIdAndValueName=ref('')
// 存储已有的spu对象
let spuParams = ref({
  categoty3Id: '',//三级分类的id
  spuName: '',//收集新增的spu名字
  description: '',//描述
  tmId: '',//品牌的id
  spuImageList: [],
  spuSaleAttrList:[]
  
})

// 子组件书写一个方法
const initHasSpuData = async (row: any) => { 
  // 存储已有的spu对象
  spuParams.value=row
  // row即为父组件传递过来的对象不完整
  // 获取全部品牌的数据
  let res = await reqAllTrademark()
  // 获取某一个品牌下的全部售卖商品的图片
  let res1 = await reqSpuImageList(row.id)
  // 获取已有的spu销售属性的数据
  let res2 = await reqSpuHasSaleAttr(row.id)
  // 获取整个项目的全部spu的销售属性
  let res3 = await reqALlSaleAttr()
  AlltradeMark.value = res.data
  imgList.value = res1.data.map(item=> {
    return {
      name: item.imgName,
      url:item.imgUrl
  } })
  saleAttr.value = res2.data
  allsaleAttr.value=res3.data
}
// 控制对话框的显示与隐藏
const dialogVisible = ref(false)
// 预览图片的地址
const dialogImageUrl=ref('')
// 照片墙点击预览时触发的钩子
const handlePictureCardPreview = (file:any) => { 
  dialogImageUrl.value=file.url
  dialogVisible.value=true
}
// 照片墙删除文件的钩子
const handleRemove = () => { 

}
// 计算出当前spu还未拥有的销售属性
let unSelectSaleAttr = computed(() => { 
  // 全部销售属性（颜色，版本，尺码）
  let unSelectAttr = allsaleAttr.value.filter(item => {
    return saleAttr.value.every(item1 => { 
      return item.name != item1.saleAttrName
    })
  })
  return unSelectAttr
})
// 添加销售属性的方法
const addSaleAttr = () => { 
  const [baseSaleAttrId,saleAttrName] = saleAttrIdAndValueName.value.split(':')
  // 准备一个新的销售属性对象:将对象带给服务器
  let newSaleAttr = {
    baseSaleAttrId,
    saleAttrName,
    spuSaleAttrValueList:[]
  }
  // 追加到数组当中
  saleAttr.value.push(newSaleAttr)
  // 清空收集的数据
  saleAttrIdAndValueName.value=''
}
// 属性值按钮的点击事件
const toEdit = (row:any) => { 
  row.flag = true
  row.saleAttrValue=''
}
// 表单元素失去焦点的事件回调
const toLook = (row: any) => { 
  console.log(row)
  // 整理收集的属性id和属性值的名字
  const { baseSaleAttrId, saleAttrValue } = row
  let newSaleAttrValue = {
    baseSaleAttrId,
    saleAttrValueName:saleAttrValue
  }
  // 非法判断
  if (saleAttrValue.trim() == '') { 
    ElMessage.error('属性值不能为空')
    return 
  }
  // 判断是否重复
  let repect=row.spuSaleAttrValueList.find(item => { 
    return item.saleAttrValueName==saleAttrValue
  })
  if (repect) { 
    ElMessage.error('属性值重复')
    return
  }
  //追加新的属性值对象
  row.spuSaleAttrValueList.push(newSaleAttrValue)
  row.flag = false
}
// 保存按钮的回调
const save = async() => { 
  // 整理参数发请求
  // 1.照片墙的数据
  spuParams.value.spuImageList = imgList.value.map((item:any) => { 
    return {
      imgName: item.name,//图片的名字
      imgUrl:(item.response&&item.response.data)||item.url
    }
  })
  // 整理销售属性的数据
  spuParams.value.spuSaleAttrList = saleAttr.value
  let res = await reqAddOrUpdateSpu(spuParams.value)
  if (res.code == 200) {
    ElMessage({
      type: 'success',
      message: spuParams.value.id ? '更新成功' : '添加成功'
    })
    emit('changeScene', {flag:0,params:spuParams.value.id?'update':'add'})
  } else { 
     ElMessage({
      type: 'error',
      message: spuParams.value.id ? '更新失败' : '添加失败'
    })
  }
}
// 添加一个新的spu初始化请求的方法
const initAddSpu = async (c3Id: string) => {
  // 清空数据
  Object.assign(spuParams.value, {
      categoty3Id: '',//三级分类的id
      spuName: '',//收集新增的spu名字
      description: '',//描述
      tmId: '',//品牌的id
      spuImageList: [],
      spuSaleAttrList:[]
  }) 
  // 清空照片墙
  imgList.value = [],
  saleAttr.value = []
  saleAttrIdAndValueName.value=''
    // 获取全部品牌的数据
  let res = await reqAllTrademark()
    // 获取整个项目的全部spu的销售属性
  let res1 = await reqALlSaleAttr()
  // 存储数据
  spuParams.value.categoty3Id=c3Id
  AlltradeMark.value = res.data,
  allsaleAttr.value=res1.data
}

// 对外暴露
defineExpose({ initHasSpuData,initAddSpu })
</script>

<style scoped>

</style>