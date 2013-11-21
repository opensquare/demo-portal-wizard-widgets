function Widget_home_quote_forms() {
	
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
		rf.loadFlow('widgets/home-quote-forms/home-quote-flow.js', $('.rhinoforms-quote-formContainer', this.$widgetDiv), initialData);


		var setLanguage = function() {
			var language = ($('#currentLocale').html().substring(2) == 'en') ? 'english' : 'finnish';
			$.getJSON('widgets/common-language-switcher/finnish.json', function(data) {
				$.each(data, function(key, val) {
					if(language == 'finnish'){replaceString(document.body, key, val);}
					else {replaceString(document.body, val, key);}	
				});
			});
		};

		rf.onEveryFormLoad(function(){
			setLanguage();
			$("div.field").first().addClass("on");
			$('form select').change( function(){
				$(this).addClass('changed');
			});
			$('form input, form select').focus(function() {
				$("div.field").removeClass("on");
				$(this).closest("div.field").addClass("on")
			});

			$('form input[type="radio"], form input[type="checkbox"]').change(function() {
				$("div.field").removeClass("on");
				$(this).closest("div.field").addClass("on")
			});

			$("input[type='radio'], input[type='text'], input[type='checkbox'], select").change( function() {
				$(this).siblings('.invalid-message').remove();
			});
		});

	}	
}

	