function requestChildWindow(win){
	const open_dev_tools = true;
	// add a loading overlay to the main window:
	main_window_loading(true);
	// Access main process via electron remote:
	const { BrowserWindow } = require('electron').remote
	const remote = require ("electron").remote;
	const main_window = BrowserWindow.getAllWindows()[0];
	// Create a new window as a child of the main window:
	let child_window = new BrowserWindow({
	    parent: main_window, 
	    modal: true,
	    width: 650,
	    height: 650,
	    show: false,
	    webPreferences: {
	      nodeIntegration: true,
	      webviewTag: true
	    }
	})
	// load child_window HTML file
	child_window.loadURL(`file://${__dirname}/assets/pages/child_window_${win}.html`);
	if(open_dev_tools) child_window.webContents.openDevTools();
	// edit page after content is loaded:
	child_window.webContents.on('did-finish-load', ()=>{
		// insert javascript in the page:
		// attach functionality to the closing button:
		child_window.webContents.executeJavaScript(parseFunction(close_button))
		function close_button(){
			let button = document.querySelector('.close_button_wrapper');
			// hide and terminate child_window upon click:
			button.addEventListener('click', function(){
				const { remote } = require('electron');
				remote.getCurrentWindow().hide();
				remote.getCurrentWindow().close();
				// send confirmation to main main process:
				const { ipcRenderer } = require('electron');
				ipcRenderer.sendTo(1,'asynchronous-message', 'child_window_closed')
				// destroy child_window object in the main process
				remote.getCurrentWindow().destroy();
			})
		}
		// listen for confirmation in the main process
		const { ipcRenderer } = require('electron');
		ipcRenderer.once('asynchronous-message', (event, arg) => {
			if(arg == 'child_window_closed'){
				//turn off loading screen in main window
  				main_window_loading(false);
  			}	
   		})
	})
	// show window when the file is loaded:
	child_window.webContents.on('dom-ready', function(){
		child_window.show();
	}) 
}