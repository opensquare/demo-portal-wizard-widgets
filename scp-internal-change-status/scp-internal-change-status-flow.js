{
	docBase: "/data",
	formLists: {
		main: [
			{ id: "change-status", url: "change-status.html", actions: [
                "next"
            ]},
            { id: "saving", url:"../quote-forms-common/12-saving.html", actions: [
					{
						name: "next",
						submission: {
							url: "{{$script-runner-url}}",
							data: {
								script: "ProductAdmin/script/changeStatus.py",
								data: "[dataDocument]"
							},
							method: "post",
						}
					}
				]},
			{ id: "complete", url:"complete.html"},
		]
	}
}
