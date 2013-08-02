function Widget_scp_internal_change_status(thisWidget) {
    
	this.initExtend = function() {
		
	}
    
    this.onReadyExtend = function(){
        var url = this.$widgetDiv.attr("page.id");
        var uid = url.substring(url.lastIndexOf("/") + 1);
        rf.loadFlow('widgets/scp-internal-change-status/scp-internal-change-status-flow.js', $('.rhinoforms-formContainer'), "<data><uid>" + uid + "</uid></data>");
    }
	
}
