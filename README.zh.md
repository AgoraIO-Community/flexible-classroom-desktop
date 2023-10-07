> _Read this in another language: [English](README.md)_

## 灵动课堂 Electron App

## 拉取模块代码，安装依赖项
```bash
yarn install:packages
```
## 如何使用自己的 AppId 和 Secret 生成 RtmToken

```bash
# 如果.env 文件中包含 `REACT_APP_AGORA_APP_ID` 和 `REACT_APP_AGORA_APP_CERTIFICATE` 配置，客户端会为你自动生成 RTM Token
REACT_APP_AGORA_APP_ID=
REACT_APP_AGORA_APP_CERTIFICATE=
```

## 运行

```bash
yarn dev
```

## 打包 Electron 客户端

```bash
# 构建 Web 资源
yarn ci:build
# 构建 Windows 客户端（需要先执行 yarn ci:build 构建 Web 资源）
yarn pack:electron:win
# 构建 Mac 客户端（需要先执行 yarn ci:build 构建 Web 资源）
yarn pack:electron:mac
```

## 常见问题
#### 打包electron客户端时若因网络问题出现electron下载失败，设置以下环境变量，设置使用淘宝镜像下载electron二进制包
|Key| Value|
|----|--------|
|ELECTRON_MIRROR|https://npmmirror.com/mirrors/electron/|
|ELECTRON_CUSTOM_DIR|v12.0.0|