rf.registerCustomType("date-selects", function(inputElement, flowId, args) {
	// control does not automatically trigger recalculation of fields on change
	this.$input = $(inputElement);
	this.flowId = flowId;
	
	this.$daySelect;
	this.$monthSelect;
	this.$yearSelect;
	this.name;
	this.id;
	this.value;
	this.classes;
	this.displayMonthNames = true;
	
	this.init = function() {
		var ct = this;
		this.name = this.$input.attr("name");
		this.value = this.$input.val();
		this.classes = this.$input.attr("class");
		this.id = this.$input.attr("id");
		
		if (args.displayMonthNames == false){
			this.displayMonthNames = args.displayMonthNames;
		}
		var yStart = new Date().getFullYear();
		if (args.yearStart){
			yStart = Number($(args.yearStart).val());
		}
		var yEnd = new Date().getFullYear() - 100;
		if (args.yearEnd){
			yEnd = Number($(args.yearEnd).val());
		}
		
		// create initial control parts
		this.$daySelect = $(ct.generateDays());
		this.$monthSelect = $(ct.generateMonths());
		this.$yearSelect = $(ct.generateYears(yStart, yEnd));
		
		// populate initial value
		this.refreshYearsAndSelect(this.value);
		
		// refresh control value on change
		this.$daySelect.change(function() {
			var currentDate = ct.$yearSelect.val();
			var newValue = ct.prefixWithZero($(this).val()) + "/" 
				+ ct.prefixWithZero(ct.$monthSelect.val()) + "/" 
				+ $("option[value='" + currentDate + "']", ct.$yearSelect).text();
			ct.refreshYearsAndSelect(newValue);
		});
		
		this.$monthSelect.change(function() {
			var currentDate = ct.$yearSelect.val();
			var newValue = ct.prefixWithZero(ct.$daySelect.val()) + "/" 
				+ ct.prefixWithZero($(this).val()) + "/" 
				+ $("option[value='" + currentDate + "']", ct.$yearSelect).text();
			ct.refreshYearsAndSelect(newValue);
		});
		
		// apply original validation
		var validation = this.$input.attr("rf.validation");
		if (validation) {
			this.$yearSelect.attr("rf.validation", validation);
		}
		var validationFunction = this.$input.attr("rf.validationfunction");
		if (validationFunction) {
			this.$yearSelect.attr("rf.validationfunction", validationFunction);
		}
		
		// apply inclusion
		var includeIf = this.$input.attr("rf.includeIf");
		if (includeIf) {
			this.$yearSelect.attr("rf.includeIf", includeIf);
		}
		var included = this.$input.data("rf.included");
		this.$yearSelect.data("rf.included", included);
		
		
		// assemble control
		this.$yearSelect.attr("name", this.name);
		var $container = $("<span>").addClass("dateSelects");
		if(this.classes){
			$container.attr("class", this.classes);
		}
		var control = $container.append($(this.$daySelect).after(this.$monthSelect).after(this.$yearSelect));
		
		this.$input.replaceWith(control);
	}
	
	this.generateDays = function() {
		var daySelect = document.createElement("select");
		daySelect.setAttribute("class", "days");
		if (this.id){
			daySelect.setAttribute("id", this.id + "_days");
		}
		var blankOption = document.createElement("option");
		blankOption.innerHTML = "Day";
		blankOption.setAttribute("value","");
		daySelect.appendChild(blankOption);
		
		var option;
		for (var i = 1; i <= 31; i++) {
			var day = this.prefixWithZero(i)
			option = document.createElement("option");
			option.setAttribute("value", i);
			option.innerHTML = day;
			daySelect.appendChild(option);
		}
		return daySelect;
	}
	
	this.generateMonths = function() {
		var monthSelect = document.createElement("select");
		monthSelect.setAttribute("class", "months");
		if (this.id){
			monthSelect.setAttribute("id", this.id + "_months");
		}
		var blankOption = document.createElement("option");
		blankOption.innerHTML = "Month";
		blankOption.setAttribute("value","");
		monthSelect.appendChild(blankOption);
		
		var months = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
		var option;
		for (var i = 1; i <= 12; i++) {
			option = document.createElement("option");
			option.setAttribute("value", i);
			if (this.displayMonthNames) {
				option.innerHTML = months[i - 1];
			} else {
				option.innerHTML = this.prefixWithZero(i);
			}
			monthSelect.appendChild(option);
		}
		return monthSelect;
	}
	
	this.generateYears = function(start, end) {
		var yearSelect = document.createElement("select");
		yearSelect.setAttribute("class", "years");
		if (this.id){
			yearSelect.setAttribute("id", this.id + "_years");
		}
		var blankOption = document.createElement("option");
		blankOption.innerHTML = "Year";
		blankOption.setAttribute("value","");
		yearSelect.appendChild(blankOption);
		
		var diff;
		var desc = true;
		if (start > end){
			diff = start - end;
		} else {
			diff = end - start;
			desc = false;
		}
		var option;
		var startYear = start	
		for (var i = 0; i < diff; i++) {
			option = document.createElement("option");
			var currentYear;
			if (desc){
				currentYear = startYear - i;
			} else {
				currentYear = startYear + i;
			}
			option.setAttribute("value", currentYear);
			option.innerHTML = currentYear;
			yearSelect.appendChild(option);
		}
		return yearSelect;
	}
	
	this.refreshYearsAndSelect = function(value) {
		var parsed = moment(value, "DD/MM/YYYY");
		var day;
		var month;
		var controlValue;
		if (parsed && parsed.isValid()){
			day = parsed.date();
			month = parsed.month() + 1
			controlValue = parsed.format("DD/MM/YYYY");
		} else {
			// set invalid date to be picked up by validation
			var dateParts = value.split("/");
			day = dateParts[0];
			month = dateParts[1];
			controlValue = value;
		}
		
		this.$daySelect.val(Number(day));
		this.$monthSelect.val(Number(month));

		this.refreshYearValues();
		this.$yearSelect.val(controlValue).change();
	}
	
	this.refreshYearValues = function() {
		var day = this.prefixWithZero(this.$daySelect.val());
		var month = this.prefixWithZero(this.$monthSelect.val());
		$("option[value]",this.$yearSelect).each(function(){
			var year = $(this).text();
			$(this).attr("value", day + "/" + month + "/" + year)
		});
	}
	
	this.prefixWithZero = function(value) {
		if (value < 10) {
			value = "0" + String(value);
		}
		return value;
	}
	this.init();
});