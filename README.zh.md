> _Read this in another language: [English](README.md)_

## 灵动课堂 Electron App

## 拉取模块代码，安装依赖项

```bash
yarn install:packages
```

## 运行

`yarn dev:classroom` 和 `yarn dev:scene` 调试页面会加载对应的 SDK 源代码，修改代码后支持热更新（HMR）。`yarn dev` 不会加载 SDK 源代码，也不支持热更新。

### 启动 demo

```bash
yarn dev
```

### 启动单个 SDK 调试页面

启动调试页面前需要先配置 `.env` 文件：

```bash
# 如果.env 文件中包含 `REACT_APP_AGORA_APP_ID` 和 `REACT_APP_AGORA_APP_CERTIFICATE` 配置，客户端会为你自动生成 RTM Token
REACT_APP_AGORA_APP_ID=
REACT_APP_AGORA_APP_CERTIFICATE=
```

启动 Fcr Classroom 调试页面：

```bash
yarn dev:classroom
```

启动 CloudClass 调试页面：

```bash
yarn dev:scene
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

#### 打包 electron 客户端时若因网络问题出现 electron 下载失败，设置以下环境变量，设置使用淘宝镜像下载 electron 二进制包

| Key                 | Value                                   |
| ------------------- | --------------------------------------- |
| ELECTRON_MIRROR     | https://npmmirror.com/mirrors/electron/ |
| ELECTRON_CUSTOM_DIR | v12.0.0                                 |

