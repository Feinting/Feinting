## v-html
不用多说，记得要防xss攻击

## v-once

```
 <h1 v-once>{{number}}</h1>
 <h2>{{number}}</h1>
 
 number = 1
 number++
```
h1会显示1
n++只会影响h2不会影响h1

## v-cloak

```
<div v-clock> 你好{{name}}</div>
```

加入v-cloak后，页面会等待所有js加载完毕后再解析此段代码

## v-pre

```
<div v-pre> {{hello world}} </div>
```
加入v-pre之后vue不会解析此段代码