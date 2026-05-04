const electron = require('electron')
const { app, BrowserWindow } = require('electron')
const globalShortcut = electron.globalShortcut
const ipcMain = require('electron').ipcMain;




function createWindow () {
  var win = new BrowserWindow({
    width: 800,
    height: 600,
    //titleBarStyle: 'hidden',
     webPreferences: {
          nodeIntegration: true,
          contextIsolation: false,
          nativeWindowOpen: true,
          enableRemoteModule: true,
          sandbox:false,
          nodeIntegrationInSubFrames:true, //for subContent nodeIntegration Enable
          webviewTag:true //for webView
            
        }
  })

  win.loadFile('index.html')
  win.menuBarVisible = false
  
  
  try{
    globalShortcut.register('f5', function() {
		console.log('f5 is pressed')
		win.reload()
    })
    globalShortcut.register('CommandOrControl+R', function() {
        console.log('CommandOrControl+R is pressed')
        win.reload()
    })
  }
  catch (err) {
    console.log(err)
  }

  
  

}

 ipcMain.handle('get_user_path', async (event, fileName) => {
   //const fs = require('fs');
    const path = electron.app.getPath('userData');
    //const buf = await fs.promises.readFile(`${path}/${fileName}`);
  return path;
  })



app.whenReady().then(() => {


 
  createWindow()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})