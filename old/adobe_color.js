//adobe color theme page

changeAdobeColorWebsite();
function changeAdobeColorWebsite(){
  // setting up an alternative stylesheet to override some elements

  // allocating and creating elements
  let head = document.head,
      style = document.createElement('style');
  // formatting for the html tag
  style.type = 'text/css';
  // setting up various css tags
  let css_overrides = `
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

    /*Hiding elements to limit browsing*/
    .MainNav__menu___3RXa0{
      display: none !important;
    }
    .UserOptions__userOptionsContainer___3-RTI{
      display: none !important;
    }
    .Hero__hero___1-6hg{
      display: none !important;
    }
    .Footer__footer___2nhzB{
      display: none !important;
    }

    .Base__actionsMenu___2R7JG{
      z-index: -1;
    }
  `;

  // inserting the css styles as plain text in the style tag
  style.appendChild(document.createTextNode(css_overrides));
  // inserting the newly created styletag to the document <head></head> tags
  head.appendChild(style);

  // since adobe uses some sort of lazy loading we need to keep track of the amount of loaded elements
  let current_total_wrappers = 0,
      previous_total_wrappers = 0;
  // and keep track of newly created elements
  var mutationObserver = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      // check wether the mutation registered is regarding the right elements:
      if(mutation.target.classList.contains('Card__cardWrapper___FIINk')){
        // find all wrapper elements
        let wrappers = document.querySelectorAll('.Card__cardWrapper___FIINk');
        // store current total of wrapper elements:
        current_total_wrappers = wrappers.length;
        // check to see if there are more wrappers than previously stored:
        if(previous_total_wrappers != current_total_wrappers){
          // loop over newly found wrappers
          for (let i = previous_total_wrappers; i < current_total_wrappers; i++) {
            // creating an overlaying div for the hover effect:
            let div = document.createElement('div');
            div.classList.add('overlay_download')

            // creating a svg element for the download icon:
            var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            svg.setAttribute('width','36');
            svg.setAttribute('height','36');

            // adding click event to the svg icon:
            svg.addEventListener('click', function(){
              console.log('hallo ik ben een icon')
            })

            // creating path elements that make up the icon:
            var path_a = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            path_a.setAttribute('d','M24.793 20H20V2.5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5V20h-4.793a.5.5 0 0 0-.354.854L18 28l7.146-7.146a.5.5 0 0 0-.353-.854z');
            path_a.setAttribute('fill','white');
            var path_b = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            path_b.setAttribute('d','M30 26.5V30H6v-3.5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5V33a1 1 0 0 0 1 1h30a1 1 0 0 0 1-1v-6.5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5z');
            path_b.setAttribute('fill','white');
            
            // appending elements to the dom
            svg.appendChild(path_a);
            svg.appendChild(path_b);
            div.appendChild(svg);                    
            wrappers[i].appendChild(div)

            // toggle visibility on mouse events:
            wrappers[i].addEventListener('mouseenter', function(){
              this.querySelector('.overlay_download').classList.add('visible');
            }); 
            wrappers[i].addEventListener('mouseleave', function(){
              this.querySelector('.overlay_download').classList.remove('visible');
            }); 
          } 
          // store previous total of wrappers to compare in later moment
          previous_total_wrappers = current_total_wrappers; 
        }
      }
    });
  });   

  mutationObserver.observe(document.documentElement, {
    attributes: true,
    characterData: false,
    childList: true,
    subtree: true,
    attributeOldValue: false,
    characterDataOldValue: false
  });
}