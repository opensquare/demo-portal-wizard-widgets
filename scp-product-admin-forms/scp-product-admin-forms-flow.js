{
	docBase: "/data",
    defaultInitalData: "scp-product-admin-forms-initial-data.xml",
	formLists: {
		main: [
            { id: "load-product", url: "loading.html", actions: [
                {
                    name: "next",
                    submission: {
                        url: "{{$script-runner-url}}/ProductAdmin/getProduct/output.xml",
                        method: "get",
                        data: {
                                uid: "xpath://uid"
                            },
                        postTransform: "xslt/fromScript.xsl", 
                        resultInsertPoint: "/"
                    }
                }
            ]},
            { id: "load-policy-templates", url: "loading.html", actions: [
					{
						name: "next",
						submission: { 
							url: "{{$script-runner-url}}/ProductAdmin/getCreateProductLists/output.xml",
							method: "get",
                            resultInsertPoint: "/data/lookups"
						}
					}
				]},
			{ id: "new-product", url: "new-product.html", actions: [
                "addAddon:addon.addAddon(index=next)",
				"deleteAddon:delete(xpath=addons/addonTemplate[index], index=?)",
                "next"
            ]},
            { id: "saving", url:"../quote-forms-common/12-saving.html", actions: [
					{
						name: "next",
						submission: {
                            preTransform: "xslt/toScript.xsl", 
							url: "{{$script-runner-url}}",
							data: {
								script: "ProductAdmin/script/createProduct.py",
								data: "[dataDocument]"
							},
							method: "post",
						}
					}
				]},
			{ id: "complete", url:"complete.html"},
		],
        addon: [
			{ id: "addAddon", docBase: "addons/addonTemplate[index]", url: "add-addon.html", actions: [ "cancel", "next" ] }
		]
	}
}
