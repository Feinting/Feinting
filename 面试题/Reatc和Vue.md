## 区别:
### 核心思想不同
1.vue 灵活易用的渐进式框架，进行数据拦截/代理，它对侦测数据的变化更敏感、更精确
2.React推崇函数式编程（纯组件），数据不可变以及单向数据流
### 组件写法不同

1.React是把 HTML 和 CSS 全都写进 JavaScript 中,即 all in js
2.Vue是单文件组件的形式,使用template模板,html,css,js写在同一个文件


## 共同点
1.数据驱动视图
2.组件化
3.使用虚拟DOM


## Vue的Diff算法核心实现

updateChildren是vue diff的核心, 过程可以概括为：

旧children和新children各有两个头尾的变量StartIdx和EndIdx，它们的2个变量相互比较，一共有4种比较方式。

如果4种比较都没匹配，如果设置了key，就会用key进行比较，在比较的过程中，变量会往中间靠，一旦StartIdx>EndIdx表明旧children和新children至少有一个已经遍历完了，就会结束比较。

