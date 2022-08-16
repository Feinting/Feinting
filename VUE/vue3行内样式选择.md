## 根据条件选择样式

### 行间样式

```
:style="{ 'background-color': isSign ? '#eef2f5' : '#306deb' }"
```

### 类样式

```
:class="address.length > 0 ? 'city' : 'city-gray'"
```