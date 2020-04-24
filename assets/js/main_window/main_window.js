let main_window_all_buttons = {
	all_buttons: document.querySelectorAll('[data-button]'),

	icons: function(){
		for (let i = this.all_buttons.length - 1; i >= 0; i--) {
			let current_button = this.all_buttons[i];
			// check the button target:
			let target = current_button.attributes['data-target'].value;
			switch(target){
				case 'child_window':
				// open a child window:
					current_button.addEventListener('click', function(){
						let source = current_button.attributes['data-src'].value;
						requestChildWindow(source);
					})
					break;
				default:
					console.log('default')
					break;
			}
		}
	}
}

main_window_all_buttons.icons();


function main_window_loading(bool){
  let loading_overlay = document.querySelector('.overlay');
  if(bool){
    // add loading overlay on main window
    loading_overlay.classList.add('is-visible');
  } else {
      // remove loading overlay on main window
      loading_overlay.classList.remove('is-visible');
    }
}