# vue和uniapp和小程序

---

## 封装一个Request请求

```

const BASE_URL = 'https://szts.funmitech.com/api/v1/applet';
export const COMMON_BASE_URL = 'https://szts.funmitech.com/api/v1';

export const myRequest = (url, data, method) => {
  const token = uni.getStorageSync("APP_TOKEN")
  uni.showLoading({
    title: '请求中...'
  })
  return new Promise((resolve, reject) => { //异步封装接口，使用Promise处理异步请求
    uni.request({
      url: BASE_URL + url,
      method, //接收请求的方式,如果不传默认为GET
      // [method === 'get' ? 'params' : 'data']: data || {}, //请求方式是否为get，是则传params否则传data
      data: data || {},
      header: {
        'content-type': 'application/json',
        'Authorization': token ? "Bearer " + token : null,
      },
      success: (res) => { //数据获取成功
        if (res.data.code === 200) { //因为200是返回成功的状态码，如果不等于200,则代表获取失败,
          resolve(res) //成功,将数据返回
        }
      },
      fail: (err) => { //失败操作
        reject(err)
      },
      complete: (res) => {
        // console.log('^^^^^^', res);
        uni.hideLoading({
          complete: () => {
            if (res.data.code === 200) {
              return
            } else if (res.data.code === 401) {
              uni.showToast({
                icon: "none",
                title: "登录身份已过期请重新登陆！"
              })
              uni.removeStorageSync('APP_TOKEN')
              uni.removeStorageSync("APP_USER")
              uni.removeStorageSync('USER_INFO')
              uni.navigateTo({
                url: '/pkgs_home/login/login'
              })
            } else if (res.data.code === 403) {
              uni.showToast({
                icon: "none",
                title: "权限不足！"
              })
            } else if (res.data.code === 404 || res.data.code === 504) {
              uni.showToast({
                icon: "none",
                title: "页面走丢了(＞_＜)"
              })
            } else {
              console.error(res)
              uni.showToast({
                icon: "none",
                title: "数据获取失败！"
              })
            }
          }
        })
      }
    })
  })
}

export const myGet = (url, data) => {
  return myRequest(url, data, 'get')
}

export const myPost = (url, data) => {
  return myRequest(url, data, 'post')
}

export const myPut = (url, data) => {
  return myRequest(url, data, 'put')
}


```

## 文件上传

```

 export const myUpload = (file, url) => {
   const uploadTask =  uni.uploadFile({
     url: COMMON_BASE_URL + url,
     filePath: file,
     name: 'feedbackImge',
     success: (res) => {
       console.log(res);
     },
     fail: (err) =>{
       console.log(err);
     }
   })
 }

```
