// remove overlay on load
document.querySelector('.overlay').classList.remove('visible');

// load preferences
const pref = new Preferences();
const preferences = pref.all_preferences;

// read preferences
let point_display = preferences.odin.point_display,
		point_radius = preferences.odin.point_radius,
		point_color = preferences.odin.point_color;

// allocate all DOM elements
let point_display_input = document.querySelector('#point_display'),
		point_radius_input = document.querySelector('#point_radius'),
		point_color_input = document.querySelector('#point_color');

// fill DOM elements with the value's read from the json:
point_display_input.value = point_display;
point_radius_input.value = point_radius;
point_color_input.value = point_color;

let save_button = document.querySelector('#save_button');
save_button.addEventListener('click', function(){
	preferences.odin.point_display = point_display_input.value;
	preferences.odin.point_radius = point_radius_input.value;
	preferences.odin.point_color = point_color_input.value;
	pref.write();
	console.log(pref);
})