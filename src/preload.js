/**
 * 预加载脚本
 * 出于安全考虑，在预加载脚本中，默认禁用了nodejs功能
 * 默认是不能载渲染进程直接调用node:fs等模块
 * 
 * 如需要开启nodejs功能，nodeIntegration = true
 * 
 */

const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  dispatch: action => ipcRenderer.send('action', action),
  
  versions: {
    node: () => process.versions.node,
    chrome: () => process.versions.chrome,
    electron: () => process.versions.electron
  },

  upload: () => {
    return ipcRenderer.invoke('selectFile')
  }
})
