const electron = require('electron')
const { app, BrowserWindow } = require('electron')
const globalShortcut = electron.globalShortcut

function createWindow () {
  var win = new BrowserWindow({
    width: 800,
    height: 600,
    //titleBarStyle: 'hidden',
     webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
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




app.whenReady().then(() => {
  createWindow()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})