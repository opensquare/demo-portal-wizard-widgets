function Widget_scp_timeline() {

	this.onReadyExtend = function(){
        
    }
}
var timeline_data;
var tl;
function onLoad() {
    
    Timeline.OriginalEventPainter.prototype._showBubble = function(x, y, evt) {
        type = evt.getProperty('type');
        if(type == "note"){
            alert("This is a note: " + evt.getDescription());
        }else if(type=='version'){
            startTime = evt.getStart();
            startTime = startTime.getFullYear() + "-" + (startTime.getMonth()+1) + "-" + startTime.getDate() + " " + startTime.getHours() + ":" + startTime.getMinutes() + ":" + startTime.getSeconds();
            alert("Loading view at effective time: " + startTime);
            var hash = window.location.hash;
            if(hash.indexOf("?") > -1){
                hash = hash.substring(0, hash.indexOf("?"));
            }
            hash = hash + "?effectiveTime=" + startTime;
            window.location.hash = hash;
        }else if(type=='event'){
            startTime = evt.getStart();
            alert(startTime + ": " + evt.getProperty('title'));
        }
    }

    var tl_el = document.getElementById("tl");
    var eventSource1 = new Timeline.DefaultEventSource();
    
    var theme1 = Timeline.ClassicTheme.create();
    theme1.autoWidth = true; // Set the Timeline's "width" automatically.
                             // Set autoWidth on the Timeline's first band's theme,
                             // will affect all bands.
    var now = new Date();
    theme1.timeline_start = new Date(Date.UTC(now.getFullYear()-3, 0, 1));
    theme1.timeline_stop  = new Date(Date.UTC(now.getFullYear()+3, 0, 1));
    
    var bandInfos = [
        Timeline.createBandInfo({
            width:          45, // set to a minimum, autoWidth will then adjust
            intervalUnit:   Timeline.DateTime.MONTH, 
            intervalPixels: 125,
            eventSource:    eventSource1,
            date:           now,
            theme:          theme1,
            layout:         'original'  // original, overview, detailed
        })
    ];
                                                    
    // create the Timeline
    tl = Timeline.create(tl_el, bandInfos, Timeline.HORIZONTAL);
    
    var url = '.'; // The base url for image, icon and background image
                   // references in the data
    eventSource1.loadJSON(timeline_data, url); // The data was stored into the 
                                               // timeline_data variable.
    tl.layout(); // display the Timeline
}

var resizeTimerID = null;
function onResize() {
    if (resizeTimerID == null) {
        resizeTimerID = window.setTimeout(function() {
            resizeTimerID = null;
            tl.layout();
        }, 500);
    }
}

var timelineLoaded = false;

function loadTimeline(){
    if(!timelineLoaded){
        var url = document.URL;
        var queryString = url.substring(url.lastIndexOf("/") + 1).replace("?", "&");
        $.getJSON('proxy/script-runner/executeScript/Util/getTimeline/output.json?uid=' + queryString, function(data){
            timeline_data = data;
            onLoad();
            timelineLoaded = true;
       });
    }
}
