> _其他语言版本：[简体中文](README.zh.md)_

## Flexible Classroom Electron App

## Fetch submodule code and install dependencies

```bash
yarn install:packages
```

## Run

`yarn dev:classroom` and `yarn dev:scene` run the debug page with the SDK linked to local source code and support hot module replacement (HMR), so changes take effect immediately.

`yarn dev` runs the demo app with the compiled SDK package and does not support HMR.

### Launch the demo app

```bash
yarn dev
```

### Launch a single SDK debug page

Configure the `.env` file before launching debug page:

```bash
# If .env contains `REACT_APP_AGORA_APP_ID` and `REACT_APP_AGORA_APP_CERTIFICATE` configurations, the client will automatically generate an RTM Token for you
REACT_APP_AGORA_APP_ID=
REACT_APP_AGORA_APP_CERTIFICATE=
```

Launch Fcr Classroom debug page:

```bash
yarn dev:classroom
```

Launch CloudClass debug page:

```bash
yarn dev:scene
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
