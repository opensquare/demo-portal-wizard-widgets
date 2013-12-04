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

var docWaitTime = 0;

function createDocLink(){
    var flowId = $("input[name='rf.flowId']").val();
    var url = $("#mm_job_proxy").attr('rf.source') + '?rf.flowId=' + flowId;
    $.getJSON(url, function(data) {
        var resolved = data["resolved"];
        if(pw.defined(resolved)){
            var status = data["status"];
            if(status == "FINISHED_SUCCESSFULLY"){
                var docUrl = $("#mm_doc_proxy").val();
                $("#docLink").html("<a target='new' href=\'" + docUrl + "\'>Click here to download your documents.</a>");
            }else{
                docFailed();
            }
        }else{
            docWaitTime = docWaitTime + 3000;
            if(docWaitTime >= 120000){
                docFailed();
            }else{
                setTimeout(createDocLink, 3000);
            }
        }
    });
}

function docFailed(){
    $("#docLink").html("<h5 class='errorMessage'>An error has occurred generating the application form. Please contact the service center on 0800 123 123</h5>");
}

	