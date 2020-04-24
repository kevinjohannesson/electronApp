// preload.js
const { ipcRenderer } = require('electron')

window.sendToElectron= function (channel, args) {
  ipcRenderer.sendToHost(channel, args)
  // console.log('send')
}
