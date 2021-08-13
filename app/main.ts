//主进程
import { app, BrowserWindow, Menu, ipcMain } from 'electron';

// 保留窗口对象的全局引用，如果不保留，
// 则窗口javascript对象将被垃圾收集时自动关闭。
let mainWindow: any

// const template = [{
//   label: '退出',
//   accelerator: 'Command+Q',
//   click: function () {
//     app.quit()
//   }
// }]
// const menu = Menu.buildFromTemplate(template)
// Menu.setApplicationMenu(menu)

function createWindow() {

  // 创建浏览器窗口
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  })

  //加载url
  // if (process.env.ELECTRON_DVELOP) {
  mainWindow.loadURL('http://127.0.0.1:3000/')
  // } else {
  //   mainWindow.loadFile('build/index.html')
  // }

  // 是否开启调试
  mainWindow.webContents.openDevTools()

  // 窗口关闭时触发
  mainWindow.on('closed', function () {
    mainWindow = null
  })
}

//初始化窗口
app.on('ready', createWindow)

// 关闭所有窗口后退出
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) createWindow()
})


ipcMain.on('message', (e, msg) => {
  console.log(msg)
})