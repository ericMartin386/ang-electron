const {app, BrowserWindow, Tray, Menu, ipcMain} = require('electron')
const path = require('path')
const url = require('url')
const log = require('electron-log');
const {autoUpdater} = require("electron-updater");
const trayIconPath = path.join(__dirname, './dist/ang-electron/update.ico');
const Positioner = require('electron-positioner');

let win = null
let tray = null

function sendStatusToWindow(text) {
  log.info(text);
  win.webContents.send('message', text);
}

autoUpdater.logger = log;
autoUpdater.logger.transports.file.level = 'info';
log.info('App starting...');

function sendStatusToWindow(text) {
    log.info(text);
    win.webContents.send('message', text);
  }

  function quitApp() {
    app.quit();
  }

  function createTray(){
    const contextMenu = Menu.buildFromTemplate([
      {label: 'Quit', click: quitApp },
    ])
    
    tray = new Tray(trayIconPath);
    tray.setToolTip = 'Angular Updater';
    tray.setContextMenu(contextMenu)

    tray.on('click', (event, bounds) => {
     showWindow(bounds);
    });

    tray.on('double-click', (event, bounds) => {
      showWindow(bounds);
     });
  }

function showWindow(bounds) {
  let positioner = new Positioner(win);
  positioner.move('trayBottomRight', bounds)
    
  win.show();
}

function createWindow() {
  if (win == null) {
    win = new BrowserWindow({width: 200, height: 400, show: false, frame: false, resizable: false})

    // load the dist folder from Angular
    log.info(path.join(__dirname, './dist/ang-electron/index.html'));

  
    win.loadURL(url.format({
      pathname: path.join(__dirname, './dist/ang-electron/index.html'),
      protocol: 'file:',
      slashes: true
    }));

    // Open the DevTools optionally:
    //win.webContents.openDevTools()

    //  log.info('about to look for updates...');
    //  autoUpdater.checkForUpdates();

    win.on('blur', () => {
      win.hide();
    });
  }
}

app.on('ready', startApi)


app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
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

  function startApi() {
    var proc = require('child_process').spawn;
    //  run server
    //var apipath = path.join(__dirname, '.\\src\\api\\bin\\dist\\win\\api.exe')
    var apipath = path.join(__dirname, '..\\src\\api\\bin\\dist\\win\\api.exe')
    // if (os.platform() === 'darwin') {
    //   apipath = path.join(__dirname, './/api//bin//dist//osx//Api')
    // }
    apiProcess = proc(apipath)
  
    apiProcess.stdout.on('data', (data) => {
      log.info(`stdout: ${data}`);
      
      createTray();
      createWindow();
    });
  }

