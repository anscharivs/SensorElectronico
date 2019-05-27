const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const serialport = require('serialport');
const Readline = require('@serialport/parser-readline')
const portName = 'COM7';//Puerto serial

const port = new serialport(portName, {
    baudRate: 9600,
});
const parser = port.pipe(new Readline({ delimiter: '\r\n' }))

let mainWindow

app.on('ready', () => {
    // Busca el html
    const htmlPath = path.join('src', 'index.html')

    //Configuración de la ventana
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    });
	mainWindow.porto = port;

    //Cargar el html
    mainWindow.loadFile(htmlPath)

    //Cuando se cierra la ventana
  mainWindow.on('closed', function () {

    mainWindow = null
  })
})

//Salir al cerrar ventanas
app.on('window-all-closed', function () {

  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {

  if (mainWindow === null) createWindow()
})

parser.on('data', datos => {
    try {
        mainWindow.webContents.send('cerial', datos)
    } catch(error) {
        mainWindow.webContents.send('cerial:error', error)
    }
})
