class D_Asgard {
	constructor () {
		
	}

	// basic point creation:
	point ( vector = { x: 0, y: 0 } ) { 
			const pt = asgard.insertPoint( vector ); 
			console.log( pt ); 
			return pt 
		}

	points ( pointcount = 10 ) { return this.point( getRandomVector( pointcount ) ) }

	// basic edge creation:
	edge ( pt_a, pt_b ) { 
			const edge = asgard.insertEdge(pt_a, pt_b);
			console.log( edge );
			return edge 
	}

}

class D_Odin extends D_Asgard {
	constructor () {
		super();
	}
}

class D_Freya extends D_Odin {
	constructor () {
		super();
	}
}

class D_Bug extends D_Freya {
	constructor () {
		super();
	}
}

const test = new D_Bug();

// test.point();
// test.points();