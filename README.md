# cdn-resource-loader
解决多个项目使用同一套预编译样式的问题

## 使用
```bash
npm i cdn-resource-loader -D
```
参数配置
```javascript
{
  loader: 'cdn-resource-loader',
  options: {
    resources: [
      './theme-local.less', // 也可以填写本地资源
      'https://raw.githubusercontent.com/dingchenaobo/cdn-resource-loader/master/example/theme-cdn.less' // 替换为线上资源地址
    ],
    dirname: path.resolve(__dirname, './dynamic-resource-styles')
  }
}
```

## 开发--权限
运行
```sh
npm run dev/build/...
```
提示 `sh: scripts/dev: Permission denied`，请给对应的 bash 添加权限
```
chmod +x ./scripts/dev...
```