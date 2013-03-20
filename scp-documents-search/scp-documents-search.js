function Widget_scp_documents_search() {
	
	this.onReadyExtend = function() {
		$('button[name="searchButton"]', this.$widgetDiv).click(function() {

			$('.mm-search-results').html('<ul><span class="loading"></span></ul>');

			var searchTerm = $('input[name="searchValue"]', this.$widgetDiv).val();
			var url = 'proxy/mailmerger/jobs/search/' + encodeURIComponent(searchTerm);

			$.ajax(url).done(function(searchResultsArray) {

				$('.mm-search-results').contents().remove();
				$('.mm-search-results').html('<ul name="docSearchResultsLists"></ul>');

				for (var i = 0; i < searchResultsArray.length; i++) {
					var $searchItemHtml = $('<li calcref="'+searchResultsArray[i].id+'">' + '<span>'
							+ searchResultsArray[i].template +'</span>' + '<span>' + searchResultsArray[i].description + '</span>' + '<span>' +
							 moment(new Date(searchResultsArray[i].date)).format("DD/MM/YYYY") + '</span>' + '<span>' + searchResultsArray[i].status + '</span>' +
							 '<a class="button" target="Document" href=' + 'proxy/mailmerger/output/document/'+searchResultsArray[i].id+'/0' +'>show</a></li>');
					$('ul[name="docSearchResultsLists"], this.$widgetDiv').append($searchItemHtml);
				}
			});
		});	
	};

}

