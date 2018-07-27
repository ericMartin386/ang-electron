const {app, BrowserWindow, Menu, ipcMain} = require('electron')
const path = require('path')
const url = require('url')
const log = require('electron-log');
const {autoUpdater} = require("electron-updater");

let win

function sendStatusToWindow(text) {
  log.info(text);
  win.webContents.send('message', text);
}

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
    log.info(path.join(__dirname, './dist/ang-electron/index.html'));
    win.loadURL(url.format({
    pathname: path.join(__dirname, './dist/ang-electron/index.html'),
    protocol: 'file:',
    slashes: true
  }))

  // Open the DevTools optionally:
  win.webContents.openDevTools()

  //  log.info('about to look for updates...');
  //  autoUpdater.checkForUpdates();

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
    sendStatusToWindow('Checking for update...');
    log.info('Checking for update...');
  })
  autoUpdater.on('update-available', (info) => {
    sendStatusToWindow('Update available.');
    log.info('Update available.');
  })
  autoUpdater.on('update-not-available', (info) => {
    sendStatusToWindow('Update not available.');
    log.info('Update not available.');
  })
  autoUpdater.on('error', (err) => {
    sendStatusToWindow('Error in auto-updater.');
    log.info('Error in auto-updater. ' + err);
  })
  autoUpdater.on('download-progress', (progressObj) => {
    let log_message = "Download speed: " + progressObj.bytesPerSecond;
    log_message = log_message + ' - Downloaded ' + progressObj.percent + '%';
    log_message = log_message + ' (' + progressObj.transferred + "/" + progressObj.total + ')';
    log.info(log_message);
  })
  autoUpdater.on('update-downloaded', (info) => {
    sendStatusToWindow('Update downloaded; will install in 5 seconds');
    log.info('Update downloaded');

    // Wait 5 seconds, then quit and install
    // In your application, you don't need to wait 5 seconds.
    // You could call autoUpdater.quitAndInstall(); immediately
    setTimeout(function() {
      autoUpdater.quitAndInstall();  
    }, 5000)
  });

  ipcMain.on('request-software-update', (event, arg) => {
    
    log.info('about to look for updates...');
    autoUpdater.checkForUpdates();
});