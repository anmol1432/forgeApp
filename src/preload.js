// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
const { contextBridge, ipcRenderer, Notification } = require('electron');


contextBridge.exposeInMainWorld('electron', {
    node: () => process.versions.node,
    chrome: () => process.versions.chrome,
    electron: () => process.versions.electron,
    electronNotification: "New",
    send: (args) => ipcRenderer.send('test', args),
    setTitle: (title) => ipcRenderer.send('set-title', title),
    openUrl: () => ipcRenderer.invoke('openUrl')
    // we can also expose variables, not just functions
});



window.myAPI = {
    desktop: true
}