function Utils() {

	this.isGreaterThan = function(a, b) {
		return a > b;
	}
	
	this.monthsBetween = function(a, b) {
		var duration = createDuration(a, b);
		return Math.floor(duration.asMonths());
	}

	this.yearsBetween = function(a, b) {
		var duration = createDuration(a, b);
		return Math.floor(duration.asYears());
	}
	
	function createDuration(a, b) {
		var ma = moment(a);
		var mb = moment(b);
		return moment.duration(mb.valueOf() - ma.valueOf());
	}
	
}
var utils = new Utils();