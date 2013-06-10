function BankAccountValidation(key) {
	var lookupKey;

	this.init = function(){
		lookupKey = key;
		if($(":input[name='bank.name']").val()!== ''){
			displayMode();
		}
		$(".changeAccount").click(function(){
			findMode();
		});
		$(".reattemptValidation").click(function(){
			findMode();
		});
	}
	
	this.doValidation = function(accountNumber, sortCode) {
		var bav = this;
		$.getJSON(
			"//services.postcodeanywhere.co.uk/BankAccountValidation/Interactive/Validate/v2.00/json2.ws?callbackFunction=?",
			{
				Key: lookupKey,
				AccountNumber: accountNumber,
				SortCode: sortCode
			},
			function(data) {
				validationCallback(data);
			}
		)
	}
	function validationCallback(response) {
		// Test for an error
		if (response.length == 1 && typeof(response[0].Error) != "undefined") {
			invalidMode();
		}
		else {
			// Check if there were any items found
			if (response.length == 0 || !response[0].IsCorrect) {
				invalidMode();
			} else {
				var accountNumber = response[0].CorrectedAccountNumber;
				var sortCode = response[0].CorrectedSortCode;
				sortCode = sortCode.substring(0,2) + "-" + sortCode.substring(2,4) + "-" + sortCode.substring(4,6);
				var bank = response[0].Bank;
				var line1 = response[0].Branch;
				var line2 = response[0].ContactAddressLine1;
				var line3 = response[0].ContactPostTown;
				var postcode = response[0].ContactPostcode;
				setDetails(accountNumber, sortCode, bank, line1, line2, line3, postcode);
				displayMode();
			}
		}
	}
	function setDetails(accountNumber, sortCode, bank, line1, line2, line3, postcode){
		$("[name='account.number']").val(accountNumber).text(accountNumber);
		$("[name='account.sortCode']").val(sortCode).text(sortCode);
		$("[name='bank.name']").val(bank).text(bank);
		$("[name='bank.line1']").val(line1).text(line1);
		$("[name='bank.line2']").val(line2).text(line2);
		$("[name='bank.line3']").val(line1).text(line3);
		$("[name='bank.postCode']").val(postcode).text(postcode);
	}
	function invalidMode(){
		setDetails("","","","","","","");
		$(".findAccount").hide();
		$(".accountDetails").hide();
		$(".invalidAccount").show();
	}
	function displayMode(){
		$(".findAccount").hide();
		$(".accountDetails").show();
		$(".invalidAccount").hide();
	}
	
	function findMode(){
		setDetails("","","","","","","");
		$(".findAccount").show();
		$(".accountDetails").hide();
		$(".invalidAccount").hide();
	}
	
	this.init();
}