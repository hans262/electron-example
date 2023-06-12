# Electron Example

## 说明
```
  # 启动vite项目
  npm start

  # 启动electron开发
  npm run dev

  nodemon 监控代码修改，重启进程


  
```

### help
```
  electron-packager <sourcedir> <appname> --platform=<platform> --arch=<arch> --out=<outdir> 

  <sourcedir> -> source dir
  <appname> -> default pageage.json name
  --platform -> darwin | linux | mas | win32
  --arch -> 64
  --overwrite -> cover
  --app-version -> default pageage.json version
  --electron-version -> electron version
  --asar -> open asar
  --icon -> icon path, mac:.icns win:.ico
  --ignore -> node_modules
  --electron-version -> If omitted, it will use the version of the nearest local installation of electron

```