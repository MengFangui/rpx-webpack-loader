# rpx-webpack-loader

rpx-webpack-loader将项目中的rpx单位转为vw，实现移动端自适应布局。

rpx的使用方法与微信小程序一样。

## 使用方法（以vue工程为例）
```javascript
// vue.config.js 配置文件
module.exports = {
    chainWebpack: (config) => {        
        config.module
            .rule('rpx')
            .test(/\.vue$/)
            .use('rpx-webpack-loader')
            .loader('rpx-webpack-loader')
            .options({
                // 根据设计稿尺寸修改，默认是750（iPhone 6）
                width: 750,
                unit: 'rpx'
            })
            .end();
    }
}
```
## 示例(以vue工程为例)
vue文件中class和style使用时，将px替换为rpx即可。

### class样式支持
* 对象语法
* 数组语法

### style样式支持
* 对象语法
* 数组语法

#### style的对象语法注意
禁止使用如下形式：
```html
<div v-bind:style="{ color: activeColor, fontSize: fontSize + 'rpx' }"></div>
data: {
  activeColor: 'red',
  fontSize: 30
}
```

请修改为如下形式：
```html
<div v-bind:style="{ color: activeColor, fontSize: fontSize }"></div>
data: {
  activeColor: 'red',
  fontSize: '30rpx'
}
```
即不能将数组和rpx分离，否则loader无法解析。

[使用方法](https://cn.vuejs.org/v2/guide/class-and-style.html)

```html
<!--vue 文件--->
<template>
    <div class="root"></div>
</template>
<style>
.root{
    width:100%;
    height:87rpx;/*设计高度是多少,此处就填写多少*/
}
</style>
```
