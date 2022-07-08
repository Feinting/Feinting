# JS

## Promise.all的用法

let arr = []
arr.push(异步操作)
Promise.all(arr)

```
	let promiseList = []
		if (imgList.length) {
			imgList.forEach(item => {
				const P = uni.uploadFile({
					url: COMMON_BASE_URL + '/common/uploadLocal',
					filePath: item,
					name: 'feedbackImage',
					header: {
						'Content-Type': 'multipart/form-data',
						Authorization: token ? 'Bearer ' + token : null
					},
				}).then((res) => {
					console.log(res);
				}).catch(err => {
					console.error(err);
				})
				promiseList.push(P)
			})
		}
		Promise.all(promiseList).then(() => {
			formRef.value
				.validate()
				.then(async res => {
					const thisPhone = loginStore.user.phone;
					const thisImgCache = imgCache
					console.log('提交成功', thisImgCache);
					// const postRes = await myPost('/feedback/add', {
					// 	phone: thisPhone,
					// 	content: res.content,
					// 	title: res.title,
					// 	imgJson: imgCache
					// });
					console.log('postRes:', postRes);
					return postRes;
				})
				.then(postRes => {
					uni.switchTab({
						url: '/pages/home/home'
					});
				})
				.catch(err => {
					console.log('表单错误信息：', err);
				});
		})
```