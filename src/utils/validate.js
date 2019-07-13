/**
 * Created by fay on 16/5/19.
 */

 /* 七位字符、保留两位小数、只支持数字*/
export function validsevendata(str) {
  //  const reg = /^[1-9]$/
 const reg = /(^\d{1,4}([\.]{1}\d{1,2})?$)|(^\d{1,7}$)/
  return reg.test(str)
}
