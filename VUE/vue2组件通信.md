# vue2组件之间的通信方式


## 父传子
常规props方法
```
<son :zdyValue = 'zdyValue'>

data(){
    retrun{
        zdyValue:3333
    }
}
```

```
props:['zdyValue']
//或
props:{
    zdyValue: Number
}
//或
props:{
    zdyValue:{
        type:Number,
        default:0
    }
}
```

## 子传父

### props方法

通过父组件给子组件传递函数类型的props传递数据

本质就是子组件调用父组件的方法传值

```
//父组件
<template>
    <div class='father'>
        <h1>{{msg}}</h1>
        <son  :getSonName='getSonName'/>
    </div>
</template>


<script>
import son from './components/son'
export default {
	name: 'father',
    components:{son},
	data() {
		return {
            msg:'我是父组件'
        }
    }
    methods:{
        getSonName(value){
            console.log('我能得到子组件的值',value)
            this.msg = value
        }
    }
}
</script>
```

```
//子组件
<template>
    <div class='son'>
        <h1>{{msg}}</h1>
        <button @click = 'sendToFather'></button>
    </div>
</template>


<script>
import son from './components/son'
export default {
	name: 'son',
    props:['getSonName']
	data() {
		return {
            msg:'我是子组件',
            name:'嘿嘿嘿'
        }
    }
    methods:{
        sendToFather(){
            this.getSonName(this.name)
        }
    }
}
</script>
```

### 自定义事件方法

本质就是通过给子组件绑定事件,子组件调用传值
#### 第一种方法: 通过v-on来绑定事件
```
//父组件
<template>
    <div class='father'>
        <h1>{{msg}}</h1>
        <son  @getSonName='getSonName'/>
    </div>
</template>


<script>
import son from './components/son'
export default {
	name: 'father',
    components:{son},
	data() {
		return {
            msg:'我是父组件'
        }
    }
    methods:{
        getSonName(...value){
            console.log('我能得到子组件的值',value[0],value[1])
            this.msg = value
        }
    }
}
```

```
//子组件
<template>
    <div class='son'>
        <h1>{{msg}}</h1>
        <button @click = 'sendToFather'></button>
    </div>
</template>


<script>
import son from './components/son'
export default {
	name: 'son',
	data() {
		return {
            msg:'我是子组件',
            name:'嘿嘿嘿'
        }
    }
    methods:{
        sendToFather(){
            this.$emit('getSonName',this.msg,this.name)
        }
    }
}
</script>
```

#### 第二种方法 通过ref来绑定事件(更灵活可以使用异步绑定事件)





