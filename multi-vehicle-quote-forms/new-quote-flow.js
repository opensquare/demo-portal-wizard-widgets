{
	docBase: "/quote",
	defaultInitalData: "new-quote-initial-data.xml",
	libraries: ["js/utils.js"],
	formLists: {
		main: [
            { id: "initialisation", url: "../quote-forms-common/initialisation.html",
                actions: [
                    "next:main.customer(index=next)",
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
            { id: "customer", docBase: "/quote/drivers/driver[index]", url: "1-customer.html", actions: [ "back", "next" ] },
	       	{ id: "policy", docBase: "/quote/policyPermissions", url: "2-policy_builder.html",
	       		actions: [
	       		  "back:main.customer(index=1)", 

					"addAdditionalVehicle:additionalVehicle.editAdditionalVehicle(index=next)",
					"addAdditionalDriver:additionalDriver.editAdditionalDriver(index=next)",
					"editAdditionalDriver:additionalDriver.editAdditionalDriver(index=?)",
					"deleteAdditionalDriver:delete(xpath=additionalDrivers/driver[index], index=?)",

					"next"
	       		]
	        },
	        { id: "policyDetails", docBase: "/quote/policyOptions", url: "3-policy_details.html", actions: [ "back","next"] },
			{ id: "calculating", url: "8-calculating.html", 
				actions: [
					{
						name: "next",
						submission: {
							preTransform: "xslt/multiVehicleToNapier.xsl", 
							url: "{{$esb-url}}/action/motor/quote/calc",
							data: {
								source: "motor-new-business",
								calcType: "xpath://product/calc",
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
			{ id: "editAdditionalDriver", docBase: "/quote/drivers/driver[index]", url: "6-edit-additional-driver.html", 
				actions: [
				    "cancel",
					"back",
					
					"addConviction:conviction.editConviction(index=next)",
					"editConviction:conviction.editConviction(index=?)",
					"deleteConviction:delete(xpath=convictions/conviction[index], index=?)",
					
					"addClaim:claim.editClaim(index=next)",
					"editClaim:claim.editClaim(index=?)",
					"deleteClaim:delete(xpath=claims/claim[index], index=?)",
					
					"next:main.policy"
				]
			},
		],
		additionalVehicle: [
			{ id: "editAdditionalVehicle", docBase: "/quote/vehicles/vehicle[index]", url: "6-edit-additional-vehicle.html", 
				actions: [
				    "cancel",
					"back",
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
							url: "{{$script-runner-url}}",
							data: {
								script: "NewBusiness/script/createAndAcceptApplicationFromFormData.py",
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
