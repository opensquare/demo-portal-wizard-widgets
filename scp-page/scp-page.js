function urlParse(){
	var hashtag = window.location.hash;
	if(hashtag!=''){;
		// check for existing page
		if($('#content aside[hash="'+hashtag+'"],#content article[hash="'+hashtag+'"]').length == 2 && $('#content aside[hash="'+hashtag+'"]').attr('uid') == $('#content article[hash="'+hashtag+'"]').attr('uid')){
			// switch to current page
			// hide current tab/page
			$('#content aside,#content article').removeClass('on');
			// select existing tab/page
			$('#content aside[hash="'+hashtag+'"],#content article[hash="'+hashtag+'"]').addClass('on');
		} else {
			try{
				var splithash = hashtag.split('?')
				var type = splithash[0].replace('#','');
				pageHandler[type]();
			} catch(error) {
				if(error.name == 'Error'){alert('Unknown page operation');} else {alert(error.message);};
				//window.history.back();
				window.location.hash = '';
			};
		};
	};
}

function addPage(uid, type, subtype, title, subtitle, payload, to) {
	//deselect all tabs & pages
	$('#content aside').removeClass('on');
	$('#content article').removeClass('on');
	//check if page already exists
	var pagecheck = $('#content aside[uid='+uid+'][type='+type+']');
	if(pagecheck.attr('uid') == uid) {
		//switch to tab
		pagecheck.addClass('on');
		//switch to page
		$('#content article[uid='+uid+'][type='+type+'][subtype='+subtype+']').addClass('on');
	} else {
		//create a new tab
		var hash = window.location.hash;
		$('<aside uid="'+uid+'" class="on" type="'+type+'" subtype="'+subtype+'" hash="'+hash+'"> \
				<div class="title">'+title+'</div> \
				<div class="subtitle">'+subtitle+'</div> \
			</aside>').appendTo('#content-asides');
		// create a new page container
		$('<article class="on" uid="'+uid+'" type="'+type+'" subtype="'+subtype+'" hash="'+hash+'"> \
				<section class="content-header"> \
                    <a href="#" class="action" onclick="removePage(\''+uid+'\');">close</a> \
                    <h2 class=\'title\'>'+title+'</h2> \
                    <h3 class=\'subtitle\'>'+subtitle+'</h3> \
                </section> \
                <section class="content-helper"></section> \
                <section class="content-body"> \
                    <div class="widget loading" name="'+payload+'" displayheader="false"></div> \
                </section> \
            </article>').appendTo('#content-articles');
		importWidgets('article[uid='+uid+']');
		$('div.widget[name='+payload+']').removeClass('loading');
	};
}

function removePage(uid) {
	// copy details to recently closed section
	// TODO - de-dupe and limit recently closed list 
	var oldPage = $('#content aside[uid="'+uid+'"]');
	var type = oldPage.attr('type');
	var subtype = oldPage.attr('subtype');
	var hash = oldPage.attr('hash');
	var title = oldPage.children('.title').text(); // TODO - limit to 40 characters
	$('#content #new-closed').append(' \
		<a class="new-square" href="'+hash+'" type="'+type+'" subtype="'+subtype+'")>'+title+'</a>');
	// remove tab/page
	$('#content aside[uid=' + uid +'],#content article[uid=' + uid +']').remove();
	// de-activate all tabs/pages and trigger showing existing page  
	$('#content aside,#content article').removeClass('on');
	setTimeout(function(){window.location.hash=$('#content-newpage-aside aside').first().attr('hash');},50);  // pause needed when removing large content

}

function updatePage(uid, title, subtitle, subtype) {
	// TODO - limit title to 40, subtitle to 25, uuencode url
	if(title != ''){$('#content aside[uid="'+uid+'"] .title,#content article[uid="'+uid+'"] .title').text(title);window.document.title=title;};
	if(subtitle != ''){$('#content aside[uid="'+uid+'"] .subtitle,#content article[uid="'+uid+'"] .subtitle').text(subtitle);};
	if(subtype != ''){$('#content aside[uid=' + uid + '],#content article[uid="'+uid+'"]').attr('subtype',subtype);};
}

//---------------------------------------------------------------------------------------------------------------------

function napierHandler() {
	var hash = window.location.hash;
	var splithash = hash.split('?')

	if(splithash[1].toLowerCase() == 'search') {
		napierSearch(splithash[2]);
		return true;
	};

	// Throw error if no operator handler for type supplied
	throw new Error();
}

function napierSearch(terms) {
	addPage('napiersearch', 'napier', 'search', 'Quotes search', '', 'scp-napier-search', '#content article.on');

	if(terms!='' || terms!=undefined){
		// Lookup predefined search
		var endpoint = '/proxy/napier/'

		// check if just a calcref
		var calcref = +terms;
		if(isNaN(calcref)){
			// Do a general quicksearch
			//importContent(endpoint+'search/quickSearch='+terms,'#content .napier-search-results','#napier?search?'+terms)
		} else {
			// Return a single calcref
			alert(calcref);
			$.get(endpoint+calcref, function(data) {
  				$('.napier-search-results').html(data);
				});
			//importContent(endpoint+calcref,'#content .napier-search-results','#napier?search?'+terms)
		};
	};
}

//---------------------------------------------------------------------------------------------------------------------


// Setup handlers for registered page types (TODO:should read from config somewhere)
var pageHandler = {
	internal: function(obj) {internalHandler();},
	quotes: function(obj) {napierHandler();},
	newbusiness: function(obj) {pactHandler();},
	servicing: function(obj) {pactHandler();},
	renewals: function(obj) {pactHandler();},
	accounts: function(obj) {pactHandler();},
	//claims: function(obj) {reportsHandler();}
	documents: function(obj) {mmHandler();}
};

// Bind the hash tag URL handler
window.onhashchange = urlParse;
