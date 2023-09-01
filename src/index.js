const { app, BrowserWindow, Notification, ipcMain, dialog, Menu, shell } = require('electron');
const path = require('path');
let { spawn, exec } = require("child_process");

// app is used for lifecycle of the app  
// browser for chromium 

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}
let win;
const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      // nodeIntegration: true,
    },
    icon: path.join(__dirname, 'assets/6.png'),
  });

  // and load the index.html of the app.
  // mainWindow.loadFile(path.join(__dirname, 'kbsaas/index.html'));
  // mainWindow.loadURL('https://igtuat-13579.knowmax.io/knotify/#/')
  // mainWindow.loadURL('http://localhost:4200/#/')


  const menu = Menu.buildFromTemplate([
    {
      label: app.name,
      submenu: [
        {
          click: () => mainWindow.webContents.send('update-counter', 1),
          label: 'Increment'
        },
        {
          click: () => mainWindow.webContents.send('update-counter', -1),
          label: 'Decrement'
        }
      ]
    }

  ])

  Menu.setApplicationMenu(menu)
  mainWindow.loadFile(path.join(__dirname, 'index.html'))

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
  win = mainWindow;
};


async function handleFileOpen() {
  const { canceled, filePaths } = await dialog.showOpenDialog({})
  if (!canceled) {
    console.log(filePaths)
    return filePaths[0]
  }
}


ipcMain.handle('openUrl', () => {
  console.log(path.join(__dirname, 'scripts/bt.bat'))
  // shell.openPath(path.join(__dirname, 'scripts/bt.bat'))
  // shell.openExternal('https://github.com')

})


ipcMain.on('test', (e, args) => {
  let { t, b } = args
  let notify = new Notification({
    title: t,
    body: b
  })
  notify.show()
  notify.on('click', () => {
    win.show();
  })
})


function handleSetTitle(event, title) {
  const webContents = event.sender
  const win = BrowserWindow.fromWebContents(webContents)
  win.setTitle(title)
}

ipcMain.on('set-title', handleSetTitle)

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

app.whenReady().then(() => {
  console.log("app started");
  exec(path.join(__dirname, 'scripts/bt.bat'), (err, stdout, stderr) => {
    if (err) {
      console.error("errv=>", err);
      return;
    }
    console.log("====>", stdout);
  });
})


// BrowserWindow.once('did-finish-load', (e) => {
//   createWindow();
// })
// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
