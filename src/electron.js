const { app, BrowserWindow, ipcMain, Notification, Tray } = require('electron')
const path = require('node:path')

const createTray = () => {
  const tray = new Tray(
    path.resolve(
      __dirname,
      process.platform == 'darwin'
        ? './assets/abc@2x.png'
        : '../../resources/windowTray.png'
    )
  )
  // const contextMenu = Menu.buildFromTemplate([{ label: '退出', role: 'quit' }])
  // tray.setToolTip('向军大叔摄像头')
  // tray.setContextMenu(contextMenu)
}

const createWindow = () => {
  // 创建浏览器窗口
  const mainWindow = new BrowserWindow({
    title: 'none',
    width: 300,
    height: 300,
    alwaysOnTop: true,
    x: 1500,
    y: 100,
    webPreferences: {
      // nodeIntegration: true, //开启nodejs
      //预加载脚本
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  if (process.env.ELECTRON_DVE) {
    mainWindow.loadURL('http://localhost:5173');
  } else {
    mainWindow.loadFile(path.join(__dirname, `../dist/index.html`));
  }

  /**
   * webContents 浏览器对象
   * webContents.openDevTools() 开启调试窗口
   */
  mainWindow.webContents.openDevTools();
};


//初始化窗口
app.whenReady().then(() => {
  createTray()
  createWindow()
})


/**
 * 单向通信
 */
ipcMain.on('action', (evt, action) => {
  // console.log(action)
  if (action.type === 'set-title') {
    BrowserWindow.fromWebContents(evt.sender).title = action.payload
  }

  if (action.type === 'send-notification') {
    new Notification({
      title: action.payload.title,
      body: action.payload.body,
    }).show()
  }
})

/**
 * 双向通信
 */
ipcMain.handle('selectFile', (evt, value) => {
  //把版本信息返回
  return process.versions
})

/**
 * 不同系统的处理差异
 */
app.on('window-all-closed', () => {
  //不是苹果系统，直接退出进程
  //苹果系统的默认方式，不是直接退出进程
  if (process.platform !== 'darwin') {
    //退出主进程
    app.quit();
  }
});

app.on('activate', () => {
  //在苹果系统，点击dock栏的软件图标，可以激活激活窗口
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});