function Widget_multi_vehicle_quote_forms() {
	
	this.onReadyExtend = function() {
		var calcref = this.$widgetDiv.attr('calcref');
		var params = this.$widgetDiv.attr('params');
		
		var cr;
		
		// SCP
		if (typeof calcref != 'undefined') {
			cr = calcref;
		}
		
		// CP
		if (typeof params != 'undefined') {
			var paramsObj = {};
			params.replace(/([^=&]+)=([^&]*)/g, function(m, key, value) {
				paramsObj[key] = value;
			});
			if (typeof paramsObj.ref != 'undefined' && paramsObj.ref != null && paramsObj.ref.indexOf("{") == -1) {
				cr = paramsObj.ref;
			}
		}
		
		var initialData;
		if (typeof cr != 'undefined') {
			initialData = '<quote><calcref>' + cr + '</calcref></quote>';
		}
		rf.loadFlow('widgets/multi-vehicle-quote-forms/new-quote-flow.js', $('.rhinoforms-quote-formContainer', this.$widgetDiv), initialData);


		var setLanguage = function() {
			var language = ($('#currentLocale').html().substring(2) == 'en') ? 'english' : 'finnish';
			$.getJSON('widgets/common-language-switcher/finnish.json', function(data) {
				$.each(data, function(key, val) {
					if(language == 'finnish'){replaceString(document.body, key, val);}
					else {replaceString(document.body, val, key);}	
				});
			});
		};

		rf.onEveryFormLoad(setLanguage);

	}	
}