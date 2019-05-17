const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const serialport = require('serialport');
const Readline = require('@serialport/parser-readline')
const portName = 'COM3';

const port = new serialport(portName, {
    baudRate: 9600,
});
const parser = port.pipe(new Readline({ delimiter: '\r\n' }))

// weo global para que no se muera
let mainWindow

app.on('ready', () => {
    // path al html
    const htmlPath = path.join('src', 'index.html')

    // ventana de navegador
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    });
	mainWindow.porto = port;

    // cargar el html
    mainWindow.loadFile(htmlPath)

    // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
})

// Quit when all windows are closed.
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

parser.on('data', datos => {
    try {
        mainWindow.webContents.send('cerial', datos)
    } catch(error) {
        mainWindow.webContents.send('cerial:error', error)
    }
})
