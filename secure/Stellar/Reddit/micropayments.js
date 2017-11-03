/**
* Find all the commenters on a page and set a "Lumens" link
* If the user clicks the link then generate a payment request
*/

console.log("micropayments.js loaded");

var accounts = [], 
accountStr = localStorage.getItem("stellar_accounts");
if (accountStr){
	accounts = JSON.parse(accountStr);
	console.dir(accounts);
	$(".comment").each(function(i){ 
		var name = $(this).attr("data-author");
		for (var i in accounts){
			if (accounts[i].name == name){
				// Lists can be nested only the first one is wanted.
				var list = $(this).find(".flat-list.buttons:first");
				// Get the url for this comment
				var embed = list.find('.bylink:first');
				var a = '<a data-inbound-url="' + embed.attr("data-inbound-url") + '">';
				var giftButton = $('<li>' + a + 'Lumens</a></li>').click(function(event) {
					event.preventDefault();
					console.log("Give lumens");
          Axon.Stellar.sendPayment();
				});
				list.append(giftButton);
			}
		}
	});
}
	

