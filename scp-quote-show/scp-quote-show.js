function Widget_scp_quote_show() {
	
	this.onReadyBeforeChildImport = function() {
		var pageId = this.$widgetDiv.parents('article').attr('pageId');
		var calcId = pageId.split('/')[2];
		pw.notifyChannelOfEvent('scp-page.setPageTitles', { pageId: pageId, title: 'Quote Show', subTitle: 'Calc ' + calcId });
	}

	this.onReadyExtend = function() {

 		var ref = document.URL.substring(document.URL.lastIndexOf("/") + 1);
		var url = 'proxy/napier/' + ref;
	
		$.ajax({url:url, dataType: "html"}).done(function(result) {
			//Main napier response obj
			xmlDoc = $.parseXML(result)
			$jXML = $(xmlDoc)
			$response = $jXML.find( "calcResponse" ).text();
			$data = $jXML.find( "calcData" ).text();

			//Embedded data string xml
			if($data != ""){
				dataXML = $.parseXML($data)
				$jXMLData = $(dataXML)
				$data = $jXMLData.find( "calcData" ).contents();
				var dataHTML ="<div class='quoteData'><h3>Client Data</h3>";
				dataHTML = dataHTML + parseNode($data) +"</div><br/>"
				$('.napierCalc').append(dataHTML);
			}
			
			//Embedded response string xml
			if($response != ""){
				responseXML = $.parseXML($response)
				$jXMLResponse = $(responseXML)
				$quote = $jXMLResponse.find( "calcElement" ).contents();
				var responseHTML ="<div class='quoteResponse'><h3>Premium Breakdown</h3>";
				responseHTML = responseHTML + parseNode($quote) + "</div>"
				$('.napierCalc').append(responseHTML);
			}
		});

		function parseNode(node){
			nodeHTML = "";
			node.each(function(){
				if(this.nodeType === 1){
					displayNodeValue = "null";
					if(typeof (this.childNodes[0]) != 'undefined'){
						displayNodeValue = this.childNodes[0].nodeValue;
					}

					nodeHTML = nodeHTML + "<div><span class='property-label'>" + 
					 (this.localName).replace(/([A-Z])/g, ' $1') + 
					 "</span><span class='property-value'>" + 
					 displayNodeValue + "</span></div>";
				}
			})
			return nodeHTML;
		}
			
	};
	
}
