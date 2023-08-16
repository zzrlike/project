export interface ResponseData { 
  code: number,
  message: string,
  ok:boolean
}
// 分类的ts类型
export interface CategoryObj { 
  id: number | string,
  name: string,
  category1Id?: number,
  category2Id?:number
}
// 相应的分类接口返回数据的类型
export interface CategoryResponseData extends ResponseData { 
  data:CategoryObj[]
}

// 已有属性值对象的ts类型
export interface AttrValue { 
  id: number,
  valueName: string,
  attrId:number
}
// 存储每一个属性值的数组类型
export type AttrValueList = AttrValue[]
// 属性对象
export interface Attr { 
  id: number,
  attrName: string,
  categoryId: number,
  categoryLevel:number
}
// 存储每一个属性对象数组ts类型
export type AttrList = Attr[]
// 属性接口返回的数据ts类型
export interface AttrResponseData extends ResponseData { 
  data:Attr[]
}