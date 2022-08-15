# deep 样式穿透

## vue3 新版写法
```
.user-center {
  &:deep(.tableheader) {
    background: #f0f6fc;
    color: #000;
  }
}
.user-center {
 ::v-deep .tableheader {
    background: #f0f6fc;
    color: #000;
  }
}
```

## vue2 旧版写法

```
/deep/ input{
 
}
 
>>> input{
}
```