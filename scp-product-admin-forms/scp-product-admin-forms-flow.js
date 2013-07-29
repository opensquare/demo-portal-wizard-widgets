{
	docBase: "/data",
    defaultInitalData: "scp-product-admin-forms-initial-data.xml",
	formLists: {
		main: [
			{ id: "new-product", url: "new-product.html", actions: ["next"]},
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
			{ id: "complete", url:"complete.html"}
		]
	}
}
