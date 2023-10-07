> _其他语言版本：[简体中文](README.zh.md)_

## Flexible Classroom Electron App

## Fetch submodule code and install dependencies
```bash
yarn install:packages
```
## How to generate RtmToken using your own AppId and Secret

```bash
# If .env contains `REACT_APP_AGORA_APP_ID` and `REACT_APP_AGORA_APP_CERTIFICATE` configurations, the client will automatically generate an RTM Token for you
REACT_APP_AGORA_APP_ID=
REACT_APP_AGORA_APP_CERTIFICATE=
```

## Run

```bash
yarn dev
```

## Pack the Electron client

```bash
# Build Web Resources
yarn ci:build
# Build a Windows client(Run `yarn ci:build` to build Web resources before pack electron)
yarn pack:electron:win
# Build a Mac client(Run `yarn ci:build` to build Web resources before pack electron)
yarn pack:electron:mac
```
