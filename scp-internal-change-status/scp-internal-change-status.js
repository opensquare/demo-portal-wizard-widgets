function Widget_scp_internal_change_status(thisWidget) {
    
	this.initExtend = function() {
		
	}
    
    this.onReadyExtend = function(){
        rf.loadFlow('widgets/scp-internal-change-status/scp-internal-change-status-flow.js', $('.rhinoforms-formContainer'), "");
    }
	
}
