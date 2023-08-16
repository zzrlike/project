// 商品分类全局组件的小仓库
import { defineStore } from "pinia";
import { reqC1,reqC2 ,reqC3} from '../../api/product/attr';
import { ref } from 'vue'
import  type { CategoryResponseData,AttrResponseData} from '@/api/product/attr/type.ts'
const useCategotyStore = defineStore('Category', () => { 
  // 存储一级分类的数据
  let c1Arr = ref([])
  // 存储一级分类的id
  let c1Id:any=ref('')
  const getC1 = async() => { 
  let res:CategoryResponseData = await reqC1()
  if (res.code == 200) { 
    c1Arr.value=res.data
  }
  }
  // 存储二级数据
  let c2Arr = ref([])
    // 存储一级分类的id
  let c2Id:any=ref('')
  // 获取二级分类的数据
  const getC2 = async () => { 
    let res:CategoryResponseData = await reqC2(c1Id.value)
    if (res.code == 200) { 
      c2Arr.value=res.data
    }
  }
  // 存储三级分类的数据
  let c3Arr=ref([])
  // 存储三级分类的id
  let c3Id=ref('')
  // 获取三级分类的数据
  const getC3 = async () => { 
    let res:CategoryResponseData = await reqC3(c2Id.value)
    if (res.code == 200) { 
      c3Arr.value=res.data
    }
  }
  return {
    c1Arr,
    getC1,
    c1Id,
    c2Arr,
    getC2,
    c2Id,
    c3Arr,
    c3Id,
    getC3
  }
})
export default useCategotyStore