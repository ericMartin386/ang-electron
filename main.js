const {app, BrowserWindow, Menu} = require('electron')
const path = require('path')
const url = require('url')
const log = require('electron-log');
const {autoUpdater} = require("electron-updater");

let win

let template = []
if (process.platform === 'darwin') {
  // OS X
  const name = app.getName();
  template.unshift({
    label: name,
    submenu: [
      {
        label: 'About ' + name,
        role: 'about'
      },
      {
        label: 'Quit',
        accelerator: 'Command+Q',
        click() { app.quit(); }
      },
    ]
  })
}

autoUpdater.logger = log;
autoUpdater.logger.transports.file.level = 'info';
log.info('App starting...');

function sendStatusToWindow(text) {
    log.info(text);
    win.webContents.send('message', text);
  }

function createWindow () {
    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);

    win = new BrowserWindow({width: 800, height: 600})

    // load the dist folder from Angular
    win.loadURL(url.format({
    pathname: path.join(__dirname, 'dist/ang-electron/index.html'),
    protocol: 'file:',
    slashes: true
  }))

  // Open the DevTools optionally:
   // win.webContents.openDevTools()

   log.info('about to look for updates...');
   log.info(autoUpdater);
   autoUpdater.checkForUpdatesAndNotify();

  win.on('closed', () => {
    win = null
  })
}

app.on('ready', createWindow)


app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})

autoUpdater.on('checking-for-update', () => {
    log.info('Checking for update...');
  })
  autoUpdater.on('update-available', (info) => {
    log.info('Update available.');
  })
  autoUpdater.on('update-not-available', (info) => {
    log.info('Update not available.');
  })
  autoUpdater.on('error', (err) => {
    log.info('Error in auto-updater. ' + err);
  })
  autoUpdater.on('download-progress', (progressObj) => {
    let log_message = "Download speed: " + progressObj.bytesPerSecond;
    log_message = log_message + ' - Downloaded ' + progressObj.percent + '%';
    log_message = log_message + ' (' + progressObj.transferred + "/" + progressObj.total + ')';
    log.info(log_message);
  })
  autoUpdater.on('update-downloaded', (info) => {
    log.info('Update downloaded');
  });