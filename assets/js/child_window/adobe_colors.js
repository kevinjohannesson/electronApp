// In embedder page.

const webview = document.querySelector('webview')
webview.addEventListener('ipc-message', (event) => {
  if(event.channel=='colors'){
    // save colorscheme in preferences
    const pref = new Preferences();
    const preferences = pref.all_preferences;
    preferences.current_colorscheme = event.args[0];
    pref.write();
    const { ipcRenderer } = require('electron');
    // use IPC to send the colorscheme to the main window:
    ipcRenderer.sendTo(1,'colorscheme_changed', event.args[0] );
  }
})


function changePage(callback){
  const open_dev_tools = true;
  const webview = document.querySelector('webview')

  webview.addEventListener('dom-ready', () => {
    if(open_dev_tools) webview.openDevTools();
    // setting up an alternative stylesheet to override some elements:
    // querys to override:
    let css_querys = {
      navbar: '.Header__header___1TMAp',
      footer: '.Footer__footer___2nhzB',
      user_options: '.UserOptions__userOptionsWrap___2un3P',
      ad: '.Hero__hero___1-6hg',
      action_menu: '.Base__actionsMenu___2R7JG',
      searchbar_container: '.SearchBarWithLibrarySelector__searchAndLibrarySelectorContainer___utDFh'
    }
    // using insertCSS to load the css over the external page in the webview
    webview.insertCSS(`
      /*CSS for custom elements*/
      .scheme_overlay { 
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 3;
        background-color: black;
        opacity: 0;
        visibility: hidden;
        transition: opacity 0.4s, visibility 0.4s
      } 

      .scheme_overlay.visible {
        opacity: 0.75;
        visibility: visible 
      }

      .download_menu{
        height: 50px;
        width: 50px;

        transition: all 0.7s ease;
      }

      .download_menu:hover{
        animation-name: hvr-bob;
        animation-duration: 1s;
        animation-iteration-count: infinite;
        animation-timing-function: ease-in-out;
      }

      @keyframes hvr-bob {
        0% {
          transform: translateY(0px);
        }
        25% {
          transform: translateY(2px);
        }
        75% {
          transform: translateY(-2px);
        }
        100% {
          transform: translateY(0px);
        }
      }

      .download_menu.collapsed{
        height: 0;
      }

      /*Hiding elements to limit browsing*/
      ${css_querys.navbar}{
        display: none !important;
      }
      ${css_querys.user_options}.UserOptions__userOptionsContainer___3-RTI{
        display: none !important;
      }
      ${css_querys.ad}{
        display: none !important;
      }
      ${css_querys.footer}{
        display: none !important;
      }

      ${css_querys.action_menu}{
        z-index: -3 !important;
      }

      ${css_querys.searchbar_container}{
        padding-right: 100px !important;
        padding-left: 100px !important;
      }
    `);
    // insert javascript in the webview page
    webview.executeJavaScript(parseFunction(jsToExecute2));


    function jsToExecute2(elements){
      // store css_querys for easy changing
      let css_querys = {
        root_id: 'color-root',
        card_wrapper_class: 'Card__cardWrapper___FIINk',
        masonry_grid_class: 'Masonry__masonry___Awfpa',
        theme_class: 'Theme__theme___2NcED'
      }
      // store total wrappers to compare later on
      let current_total_wrappers = 0,
          previous_total_wrappers = 0,
          wrappers = document.querySelectorAll('.Card__cardWrapper___FIINk');

      // set up observer to check for masonry layout change
      const targetNode = document.querySelector(css_querys.root);

      // Options for the observer (which mutations to observe)
      const observer_config = { attributes: false, childList: true, subtree: true };

      // Callback function to execute when mutations are observed
      const callback = function(mutationsList, observer) {
        for(let mutation of mutationsList) {
          if (mutation.type === 'childList') {
            if(mutation.addedNodes){
              if(mutation.addedNodes.length){
                if(mutation.addedNodes[0].classList.contains('Masonry__masonry___Awfpa')){
                  // masonrygrid layout is reset, so the wrappercounter need to be reset as well
                  current_total_wrappers = 0;
                  previous_total_wrappers = 0;
                }
              }
            }
            if( mutation.target.classList.contains(css_querys.card_wrapper_class) ){
              // store current total of wrapper elements:
              let all_wrappers = document.querySelectorAll('.Card__cardWrapper___FIINk');
              current_total_wrappers = all_wrappers.length;
              // check to see if there are more wrappers than previously stored:
              if(previous_total_wrappers != current_total_wrappers){
                // loop over newly found wrappers
                for (let i = previous_total_wrappers; i < current_total_wrappers; i++) {
                  addDownloadMenu(all_wrappers[i]);
                  // store previous total of wrappers to compare in later moment
                  previous_total_wrappers = current_total_wrappers; 
                }
              }
            }
          }
        }
      };
      // Create an observer instance linked to the callback function
      const observer = new MutationObserver(callback);


      function addDownloadMenu(cardwrapper){
        // adds download functionality to the card wrappers:
        // creating an overlaying div for the hover effect:
        let overlay_div = document.createElement('div');
        overlay_div.classList.add('scheme_overlay')
        // creating a svg element for the download icon:
        let download_icon_svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        // creating a svg element for the icon button:
        let checkmark_icon_svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        // set up viewboxes
        download_icon_svg.setAttribute('viewBox','0 0 492 492');
        checkmark_icon_svg.setAttribute('viewBox','0 0 512 512');
        // assigning class for styling:
        download_icon_svg.classList.add('download_menu');
        checkmark_icon_svg.classList.add('download_menu');
        checkmark_icon_svg.classList.add('collapsed');

        // adding click event to the svg icon that allows downloading of the underlying colorscheme:
        download_icon_svg.addEventListener('click', function(){
          // send message to renderer process containing the current colorscheme:
          // get the div element containing the swatch list in each wrapper element
          let colorscheme_wrapper_div = cardwrapper.querySelector('.'+css_querys.theme_class);
          let colorscheme = [];
          for (let i = 0; i < colorscheme_wrapper_div.childNodes.length; i++) {
            colorscheme[i] = colorscheme_wrapper_div.childNodes[i].style.backgroundColor;
          }
          // use ipc to send data to the host electron window object
          sendToElectron('colors', colorscheme);
          // remove download icon
          download_icon_svg.classList.add('collapsed');
          // show checkmark icon
          checkmark_icon_svg.classList.remove('collapsed');
        })

        // creating path elements that make up the download icon:
        let download_icon_path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        download_icon_path.setAttribute('d','M442.668,268.536l-16.116-16.12c-5.06-5.068-11.824-7.872-19.024-7.872c-7.208,0-14.584,2.804-19.644,7.872 L283.688,355.992V26.924C283.688,12.084,272.856,0,258.02,0h-22.804c-14.832,0-28.404,12.084-28.404,26.924v330.24 L102.824,252.416c-5.068-5.068-11.444-7.872-18.652-7.872c-7.2,0-13.776,2.804-18.84,7.872l-16.028,16.12 c-10.488,10.492-10.444,27.56,0.044,38.052l177.576,177.556c5.056,5.056,11.84,7.856,19.1,7.856h0.076 c7.204,0,13.972-2.8,19.028-7.856l177.54-177.552C453.164,296.104,453.164,279.028,442.668,268.536z');
        download_icon_path.setAttribute('fill','white');
        let checkmark_icon_path = document.createElementNS('http://www.w3.org/2000/svg', 'path')
        checkmark_icon_path.setAttribute('d', 'm256 0c-141.164062 0-256 114.835938-256 256s114.835938 256 256 256 256-114.835938 256-256-114.835938-256-256-256zm129.75 201.75-138.667969 138.664062c-4.160156 4.160157-9.621093 6.253907-15.082031 6.253907s-10.921875-2.09375-15.082031-6.253907l-69.332031-69.332031c-8.34375-8.339843-8.34375-21.824219 0-30.164062 8.339843-8.34375 21.820312-8.34375 30.164062 0l54.25 54.25 123.585938-123.582031c8.339843-8.34375 21.820312-8.34375 30.164062 0 8.339844 8.339843 8.339844 21.820312 0 30.164062zm0 0');
        checkmark_icon_path.setAttribute('fill','white');        
        // appending elements to the dom
        download_icon_svg.appendChild(download_icon_path);
        // download_icon_svg.appendChild(download_icon_path_b);
        checkmark_icon_svg.appendChild(checkmark_icon_path)
        overlay_div.appendChild(download_icon_svg); 
        overlay_div.appendChild(checkmark_icon_svg);    
        cardwrapper.appendChild(overlay_div)

        cardwrapper.addEventListener('mouseenter', function(){
          this.querySelector('.scheme_overlay').classList.add('visible');
        }); 
        cardwrapper.addEventListener('mouseleave', function(){
          this.querySelector('.scheme_overlay').classList.remove('visible');
          // re-instate download icon and remove the checkmark icon
          if(download_icon_svg.classList.contains('collapsed')){
            download_icon_svg.classList.remove('collapsed');
            checkmark_icon_svg.classList.add('collapsed');
          }         
        }); 
      }

      // add an observer when the element is available:
      function addObserverWhenAvailable(observer_object, target_query, config){
        let target_node = document.querySelector(target_query);
        // check if target node exists in the DOM:
        if(!target_node){
          // the node does not exist yet, try again in 100ms
          window.setTimeout(addObserverWhenAvailable, 100);
          return;
        }
        if(!config){
          config = {
            attributes: true,
            childList: true,
            subtree: true,
          }
        }
        observer_object.observe(target_node, config);
      }
      // Start observing the target node for configured mutations
      addObserverWhenAvailable(observer, '#'+css_querys.root_id, observer_config);
    }
    callback();
  })
}


changePage(function(){
  document.querySelector('.overlay').classList.remove('visible');
})

