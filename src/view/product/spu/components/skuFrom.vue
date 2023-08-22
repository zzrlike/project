<template>
  <el-form label-width="100px">
    <el-form-item label="sku名称">
      <el-input placeholder="sku名称" v-model="skuParams.skuName"></el-input>
    </el-form-item>
    <el-form-item label="价格(元)">
      <el-input placeholder="价格（元）" type="number" v-model="skuParams.price"></el-input>
    </el-form-item>
    <el-form-item label="重量(g)">
      <el-input placeholder="重量（g）" type="number" v-model="skuParams.weight"></el-input>
    </el-form-item>
    <el-form-item label="sku描述">
      <el-input placeholder="sku描述" type="textarea" v-model="skuParams.skuDesc"></el-input>
    </el-form-item>
    <el-form-item label="平台属性">
      <el-form :inline="true">
        <el-form-item v-for="item in attrAttr" :label="item.attrName" style="width: 200px;">
          <el-select v-model="item.attrIdandValueId">
            <el-option :value="`${item.id}:${attr.id}`" v-for="attr in item.attrValueList" :label="attr.valueName"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-form-item>
    <el-form-item label="销售属性">
      <el-form :inline="true">
        <el-form-item v-for="item in saleArr" :label="item.saleAttrName" style="width: 200px;">
          <el-select v-model="item.saleIdAndValueId">
            <el-option :value="`${item.id}:${item1.id}`" v-for="item1 in item.spuSaleAttrValueList" :label="item1.saleAttrValueName"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-form-item>
    <el-form-item label="图片名称">
      <el-table border :data="imgArr" ref="tableRef">
        <el-table-column type="selection" width="80px" align="center"></el-table-column>
        <el-table-column label="图片">
          <template #="{row}">
              <img :src="row.imgUrl" alt="" style="width: 100px; height: 100px;">
          </template>
        </el-table-column>
        <el-table-column label="名称" prop="imgName"></el-table-column>
        <el-table-column label="操作">
          <template #="{row}">
              <el-button type="danger" size="small" @click="hander(row)">设置默认</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="cencel">取消</el-button>
      <el-button type="primary" @click="save">保存</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
// 引入请求的api
import { reqAttr } from '@/api/product/attr/index.ts'
import {reqSpuImageList,reqSpuHasSaleAttr,reqAddSku } from '@/api/product/spu/index.ts'
import { ElMessage } from 'element-plus';
const emit = defineEmits(['changeScene'])
// 取消按钮的回调
const cencel = () => { 
  emit('changeScene', {flag:0,params:''})
}
// 平台属性
let attrAttr = ref<any>([])
// 销售属性
let saleArr = ref<any>([])
// 图片墙
let imgArr=ref<any>([])
// 当前子组件的方法对外暴露，让父组件拿到
const initSkuData = async (c1Id: number, c2Id: number, row: any) => { 
  skuParams.value.category3Id = row.category3Id
  skuParams.value.spuId = row.id
  skuParams.value.tmId=row.tmId
  // 获取平台属性
  let res = await reqAttr(c1Id, c2Id, row.category3Id)
  // 获取对应的销售shux
  let res1 = await reqSpuHasSaleAttr(row.id)
  // 获取照片墙的数据
  let res2 = await reqSpuImageList(row.id)
  attrAttr.value = res.data
  saleArr.value = res1.data
  imgArr.value=res2.data
}
defineExpose({
  initSkuData
})
// 收集sku的参数
let skuParams= ref<any>({ 
  category3Id: '',
  spuId: '',
  tmId: '',
  skuName: '',
  price: '',
  weight: '',
  skuDesc: '',
  skuAttrValueList: [{
    attrId: '',
    valueId:''
  }],
  skuSaleAttrValueList: [{
    saleAttrId: '',
    saleAttrValueId:''
  }],
  skuDefaultImg:''
})
//获取table实例
const tableRef=ref()
// 设置默认图片的回调
const hander = (row: any) => { 
  // 点击的时候让全部的复选框不勾选
  imgArr.value.forEach(item => {
    tableRef.value.toggleRowSelection(item,false)
  });
  // 复选框选中
  tableRef.value.toggleRowSelection(row,true)
  skuParams.value.skuDefaultImg=row.imgUrl
}
// 保存按钮的方法
const save = async() => {
  // 平台属性
 skuParams.value.skuAttrValueList= attrAttr.value.reduce((prev: any, next: any) => { 
    if (next.attrIdandValueId) { 
      let [ attrId, valueId ]= next.attrIdandValueId.split(':')
      prev.push({
        attrId,
        valueId
      })
    }
    return prev
 }, [])
  // 销售属性
  skuParams.value.skuSaleAttrValueList = saleArr.value.reduce((prev: any, next: any) => { 
    if (next.saleIdAndValueId) { 
      let [saleAttrId, saleAttrValueId] = next.saleIdAndValueId.split(':')
      prev.push({
        saleAttrId, saleAttrValueId
      })
    }
    return prev
  }, [])

  // 添加sku的请求
  let res = await reqAddSku(skuParams.value)
  if (res.code == 200) {
    ElMessage.success('添加成功')
    // 通知父组件
    emit('changeScene', {flag:0,params:''})
  } else { 
    ElMessage.error('添加失败')
  }
}
</script>

<style scoped>

</style>