{
	docBase: "/quote",
	defaultInitalData: "new-quote-initial-data.xml",
	libraries: ["js/utils.js"],
	formLists: {
		main: [
            { id: "initialisation", url: "../quote-forms-common/initialisation.html",
                actions: [
                    "next",
                    {
                        name: "calc",
                        target: "calculating",
                        submission: {
							url: "{{$esb-url}}/resource/calc/calcdata/{{//calcref}}.xml",
							method: "get",
							postTransform: "xslt/retrieveCalc.xsl",
							resultInsertPoint: "/"
						}
                    }
                ]},
	       	{ id: "vehicle", docBase: "/quote/vehicle", url: "1-car.html", actions: [ "next"] },
			{ id: "customer", docBase: "/quote/customer", url: "1-customer.html", actions: [ "back", "next" ] },
			{ id: "driver", docBase: "/quote/customer", url: "2-driver.html",
				actions: [
					"back",
					
					"addConviction:conviction.editConviction(index=next)",
					"editConviction:conviction.editConviction(index=?)",
					"deleteConviction:delete(xpath=convictions/conviction[index], index=?)",
					
					"addClaim:claim.editClaim(index=next)",
					"editClaim:claim.editClaim(index=?)",
					"deleteClaim:delete(xpath=claims/claim[index], index=?)",
					
					"next"
				]
			},
			{ id: "drivers", url: "5-drivers.html", 
				actions: [
					"back", 

					"addAdditionalDriver:additionalDriver.editAdditionalDriver(index=next)",
					"editAdditionalDriver:additionalDriver.editAdditionalDriver(index=?)",
					"deleteAdditionalDriver:delete(xpath=additionalDrivers/driver[index], index=?)",

					"next"
				]
			},
			{ id: "calculating", url: "8-calculating.html", 
				actions: [
					{
						name: "next",
						submission: {
							preTransform: "xslt/toNapier.xsl", 
							url: "{{$esb-url}}/motor/quote/calc",
							data: {
								source: "motor-new-business",
                                quickSearch1: "xpath://customer/surname",
                                quickSearch2: "xpath://customer/address/postcode",
                                quickSearch3: "xpath://customer/email",
                                quickSearch4: "xpath://vehicle/reg",
								calcData: "[dataDocument]"
							},
							method: "post",
							postTransform: "xslt/fromNapier.xsl",
							resultInsertPoint: "/quote/calc"
						}
					}
				]
			},
			{ id: "quote", url: "9-quote.html", actions: [ "back:vehicle", "finish", "sorry:sorry", "single:buy.singlePayment", "multiple:buy.multiplePayment" ] },
			{ id: "sorry", url: "sorry.html" , actions: [ "restart:vehicle" ]}
		],
		conviction: [
			{ id: "editConviction", docBase: "convictions/conviction[index]", url: "3-edit-conviction.html", actions: [ "cancel", "next" ] }
		],
		claim: [
			{ id: "editClaim", docBase: "claims/claim[index]", url: "4-edit-claim.html", actions: [ "cancel", "next" ] }
		],
		additionalDriver: [
			{ id: "editAdditionalDriver", docBase: "/quote/additionalDrivers/driver[index]", url: "6-edit-additional-driver.html", 
				actions: [
				    "cancel",
					"back",
					
					"addConviction:conviction.editConviction(index=next)",
					"editConviction:conviction.editConviction(index=?)",
					"deleteConviction:delete(xpath=convictions/conviction[index], index=?)",
					
					"addClaim:claim.editClaim(index=next)",
					"editClaim:claim.editClaim(index=?)",
					"deleteClaim:delete(xpath=claims/claim[index], index=?)",
					
					"next"
				]
			},
		],
		buy: [
			{ id: "singlePayment", url:"../quote-forms-common/10-single-payment.html", actions:["next:payment", "back:main.quote"]},
			{ id: "multiplePayment", url:"10-multiple-payment.html", actions:["next:payment", "back:main.quote"]},
			{ id: "payment", docBase: "/quote/payment", url:"../quote-forms-common/11-payment.html", actions:["next"]},
            { id: "saving", url:"../quote-forms-common/12-saving.html", actions: [
					{
						name: "next",
						submission: {
							url: "{{$esb-url}}/motor/quote/create",
							data: {
								scriptData: "[dataDocument]"
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
