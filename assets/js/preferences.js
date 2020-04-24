class Preferences{
	constructor(){
		this.file_url = './assets/preferences.json';
		this.all_preferences = this.readAll();
	}

	readAll(){
		const fs = require('fs');
		let raw_data = fs.readFileSync(this.file_url);
		let parsed_data = JSON.parse(raw_data);
		return parsed_data
	}

	write(){
		const fs = require('fs');
		// convert object to json object to store in local file
		let json_object = JSON.stringify(this.all_preferences, null, 4);
    	fs.writeFileSync(this.file_url, json_object, (err) => {
    	if (err) throw err
    })
	}
}



class Preferences2{
	constructor(){
		this.file_url = './assets/preferences.json';
		this.all_preferences = this.readAll();
	}

	save(preference, value){
		this.all_preferences[preference] = value;
	}

	read(preference){
		preference = preference.split('.');
		let return_value = this.all_preferences;
		for (let i = 0; i < preference.length; i++) {
			return_value = return_value[preference[i]];
		}
		return return_value;
	}

	readAll(){
		const fs = require('fs');
		let raw_data = fs.readFileSync(this.file_url);
		let parsed_data = JSON.parse(raw_data);
		return parsed_data
	}

	write(){
		const fs = require('fs');
		// convert object to json object to store in local file
		let json_object = JSON.stringify(this.all_preferences, null, 4);
    	fs.writeFileSync(this.file_url, json_object, (err) => {
    	if (err) throw err
    })
	}
}