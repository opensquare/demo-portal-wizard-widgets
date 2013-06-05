function Widget_common_docs_list() {

	this.initExtend = function() {
        pw.addListenerToChannel(this, "common_docs_list");
    }
	
	this.handleEvent = function(channel, event) {
        this.loadHTML();
    }

	this.onReadyExtend = function() {
			var url = document.URL;
			var application = $(":header a").html();
     		var policyId = url.substring(url.lastIndexOf("/") + 1);
     		policyId = policyId.substring(policyId.lastIndexOf("#") + 1);
			var getUrl = 'proxy/mailmerger/jobs/search/' + encodeURIComponent('%'+ policyId +'%');
			var noDocMsg = "No documents found.";
		
			$.ajax(getUrl).done(function(searchResultsArray) {

				$('.mm-documents').html('<ul name="docSearchResultsLists"></ul>');

				if(searchResultsArray.length === 0 ){
					$('.mm-documents').append(noDocMsg);

				} else {
					for (var i = 0; i < searchResultsArray.length; i++) {	
					var descArray = (searchResultsArray[i].description).split('|');
					var template = (searchResultsArray[i].template  === undefined) ? "" : searchResultsArray[i].template + " - ";
					var userDesc = (descArray[2] == "Not supplied" || descArray[2] === undefined) ? "" : descArray[2] + " ";
					var $searchItemHtml = $('<a class="pdf" target="_blank" href=' + 'proxy/mailmerger/output/document/'+searchResultsArray[i].id+'/0' + '>'
							+ template + descArray[0] + " - " + userDesc + moment(new Date(searchResultsArray[i].date)).format("DD/MM/YYYY") + '</a>');
					$('.mm-documents').append($searchItemHtml);
					}
				}
				
			});
	 
	};

}