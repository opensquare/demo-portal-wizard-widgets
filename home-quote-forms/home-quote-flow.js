{
	docBase: "/quote",
	defaultInitalData: "home-initial-data.xml",
	libraries: ["../quote-forms-common/js/utils.js","js/custom-types.js"],
	formLists: {
		main: [
			{ id: "initialisation", url: "../quote-forms-common/initialisation.html",
				actions: [
					"next",
					{
						name: "calc",
						target: "calculating",
						submission: {
							url: "{{$esb-url}}/calc/calcdata/{{//calcref}}.xml",
							method: "get",
							postTransform: "xslt/retrieveCalc.xsl",
							resultInsertPoint: "/"
						}
					}
				]
			},
			{ id: "customer", docBase: "/quote/customer", url: "customer.html", actions: ["next"]},
			{ id: "home", docBase: "/quote/home", url: "home.html", actions: ["back", "next"]},
			{ id: "calculating", url: "calculating.html", 
				actions: [
					{
						name: "next",
						submission: {
							preTransform: "xslt/toNapier.xsl",
							url: "{{$esb-url}}/home/quote/calc",
							data: {
								source: "home-new-business",
								quickSearch1: "xpath://customer/surname",
								quickSearch2: "xpath://customer/address/postcode",
								calcData: "[dataDocument]"
							},
							method: "post",
							postTransform: "xslt/fromNapier.xsl",
							resultInsertPoint: "/quote/products/product[name='Brilliant Basics']/calc"
						}
					}
				]
			},
            { id: "calculating2", url: "calculating.html", 
				actions: [
					{
						name: "next",
						submission: {
							preTransform: "xslt/toNapier.xsl",
							url: "{{$esb-url}}/home/quote/calc",
							data: {
								source: "home-new-business",
								quickSearch1: "xpath://customer/surname",
								quickSearch2: "xpath://customer/address/postcode",
								calcData: "[dataDocument]"
							},
							method: "post",
							postTransform: "xslt/fromNapier.xsl",
							resultInsertPoint: "/quote/products/product[name='More Than']/calc"
						}
					}
				]
			},
            { id: "calculating3", url: "calculating.html", 
				actions: [
					{
						name: "next",
						submission: {
							preTransform: "xslt/toNapier.xsl",
							url: "{{$esb-url}}/home/quote/calc",
							data: {
								source: "home-new-business",
								quickSearch1: "xpath://customer/surname",
								quickSearch2: "xpath://customer/address/postcode",
								calcData: "[dataDocument]"
							},
							method: "post",
							postTransform: "xslt/fromNapier.xsl",
							resultInsertPoint: "/quote/products/product[name='Moreness']/calc"
						}
					}
				]
			},
            { id: "cover", url: "cover.html", actions: [ "back" , "next"]},
			{ id: "quote", url: "quote.html", actions: ["back:customer", "sorry:sorry", "single:buy.singlePayment", "addItem:specifiedItem.editItem(index=next)", "editItem:specifiedItem.editItem(index=?)","deleteItem:delete(xpath=items/item[index], index=?)"]},
			{ id: "sorry", url: "sorry.html" , actions: [ "restart:customer" ]}
		],
        specifiedItem: [
			{ id: "editItem", docBase: "items/item[index]", url: "edit-item.html", actions: [ "cancel", "next" ] }
		],
		buy: [
			{ id: "singlePayment", url:"../quote-forms-common/10-single-payment.html", actions:["next:payment", "back:main.quote"]},
			{ id: "payment", docBase: "/quote/payment", url:"../quote-forms-common/11-payment.html", actions:["next"]},
			{ id: "saving", url:"../quote-forms-common/12-saving.html", actions:[
					{
						name: "next",
						submission: {
							url: "{{$esb-url}}",
							data: {
								script: "NewBusiness/script/importNBCaseFromForms.py",
								data: "[dataDocument]"
							},
							method: "post",
							resultInsertPoint: "/quote/pact"
						}
					}
				]},
			{ id: "complete", url:"../quote-forms-common/complete.html"}
		]
	}
}
