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
								script: "Util/script/changeStatus.py",
								uid: "xpath://uid",
                                status: "xpath://status",
							},
							method: "post",
						}
					}
				]},
			{ id: "complete", url:"complete.html"},
		]
	}
}
