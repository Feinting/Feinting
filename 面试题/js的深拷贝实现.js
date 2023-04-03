//JSON.parse(JSON.stringify(obj))：这种方式是最常见的深拷贝方式之一。它的优点是简单易用，缺点是无法处理函数、undefined、symbol等类型。
//Lodash 的 _.cloneDeep() 方法：这种方式可以处理函数、undefined、symbol等类型，但是需要引入 Lodash 库。
//手写递归方法：这种方式可以处理函数、undefined、symbol等类型，但是需要手写递归方法。

//利用递归的方式实现深拷贝
function deepClone(obj) {
  if (typeof obj !== "object" || obj === null) {
    return obj;
  }
  let result;
  if (Array.isArray(obj)) {
    result = [];
    for (let i = 0; i < obj.length; i++) {
      result[i] = deepClone(obj[i]);
    }
  } else {
    result = {};
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        result[key] = deepClone(obj[key]);
      }
    }
  }
  return result;
}

//利用JSON实现深拷贝
function jsonClone(obj) {
    return JSON.parse(JSON.stringify(obj));
}

