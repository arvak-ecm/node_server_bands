const Band = require('./band');

class Bands {
	constructor() {
		this.bands = [];
	}

	add(band = new Band()) {
		this.bands.push(band);
	}

	getAll() {
		return this.bands;
	}

	delete(id = '') {
		this.bands = this.bands.filter((band) => band.id !== id);
		return this.bands;
	}

	vote(id = '') {
		this.bands = this.bands.map((band) => {
			if (band.id === id) {
				band.vote++;
				return band;
			} else {
				return band;
			}
		});
		// console.table(this.bands);
	}
}

module.exports = Bands;
