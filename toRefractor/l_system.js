///////// L SYSTEMS
function createLSystem( 
	total_recursions = 2, 
	axiom = '0', 
	rules = { 0: '1[0]0', 1: '11' } ){

	// create array to store all created characters
	const all_chars = [];
	// explode axiom in an array of characters
	axiom = [ ...axiom ];
	const total_axiom_chars = axiom.length;
	let a;
	for (a = 0; a < total_axiom_chars; a++) {
		all_chars.push( axiom[a] );
	}

	let n = 0
	for (n = 0; n < total_recursions; n++) {
		for (let c = 0; c < all_chars.length; c++) {
			// loop c over all currently existing characters
			const current_char = all_chars[c];
			const total_rules = Object.keys(rules).length;
			let r;
			for (r = 0; r < total_rules; r++) {
				// loop r over all given rules
				const current_rule = Object.keys(rules)[r];
				if( current_rule == current_char ){
					// retrieve new character set from the rules
					const new_chars = [ ...Object.values(rules)[r] ];
					// change character to first new character 
					all_chars[c] = new_chars[0];
					// loop over remaining characters and adding to all_chars
					let nc;
					const total_new_chars = new_chars.length;
					for (nc = 1; nc < total_new_chars; nc++) {
						// loop nc over to be created characters
						// add new characters to the array
						all_chars.splice(c+1, 0, new_chars[nc]);
						// move c loop up one increment to account for the newly created character
						c++;
					}
				}	
			}
		}
	}

	return all_chars;
}

// draw the L-System
function drawLSystem(
	l_system = createLSystem(2), 
	axiom_position = {x: 0, y: -100}, 
	all_instructions = [ { angle: 0, current_location: axiom_position } ],
	rules = [
		{ char: '0', operation: (instruction)=>{ // operation instructions per character
				// 'extrude' new point from previous point and rotating it to instruction specified degrees
				const origin = instruction.current_location,
							extruded_location = { x: origin.x, y: ( origin.y + 25 ) },
							angle = instruction.angle;
				// rotate location to final destination
				const new_location = rotateVector( extruded_location, origin, angle );
				// create a line between previous and newly created point and add a leaf attribute
				const line = { start: instruction.current_location, end: new_location, leaf: true};
				// add to return values:
				output.lines.push(line);
			} },
		{ char: '1', operation: (instruction)=>{
				// 'extrude' new point from previous point and rotating it to instruction specified degrees
				const prev_location = instruction.current_location,
							extruded_location = { x: prev_location.x, y: ( prev_location.y + 25 ) },
							angle = instruction.angle;
				// insert a vector in the scene at the new location
				const new_location = rotateVector( extruded_location, prev_location, angle );
				// create a line between previous and newly created point
				const line = { start: instruction.current_location, end: new_location };
				// set current_loc to newly created:
				instruction.current_location = new_location;
				// add to return values:
				output.lines.push(line);
			} },
		{ char: '[', operation: (instruction)=>{
				// push new instructions
				all_instructions.push({ 
					angle: instruction.angle - 45, // subtract from previous angle
					current_location: instruction.current_location // save current_loc for edge creation
				})
			} },
		{ char: ']', operation: (instruction)=>{
				// remove last instructions
				all_instructions.pop()
				// get current instructions:
				instruction = all_instructions[ all_instructions.length-1 ];
				// add angle to current instructions
				instruction.angle += 45;
			} }
	],
	output = { lines: [] }
	){
	
	// loop over L-System's every character
	const total_chars = l_system.length;
	let c;
	for (c = 0; c < total_chars; c++) {
		// loop over every drawing rule
		const total_rules = rules.length;
		let r;
		for (r = 0; r < total_rules; r++) {
			// apply operation if character has a rule
			if( l_system[c] === rules[r].char ){
				// current instruction shorthand
				const instruction = all_instructions[ all_instructions.length-1 ];
				rules[r].operation(instruction);
			}
		}
	}
	return output
}