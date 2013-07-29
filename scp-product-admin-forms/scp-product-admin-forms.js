function Widget_scp_product_admin_forms(thisWidget) {
    
	this.initExtend = function() {
		
	}
    
    this.onReadyExtend = function(){
        rf.loadFlow('widgets/scp-product-admin-forms/scp-product-admin-forms-flow.js', $('.rhinoforms-formContainer'), "");
    }
	
}
