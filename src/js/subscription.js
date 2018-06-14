var handler = StripeCheckout.configure({
  key: "pk_test_6pRNASCoBOKtIshFeQd4XMUh",
  token: function(token) {
    // append your token id and email, submit your form
    $("#stripeToken").val(token.id);
    $("#stripeEmail").val(token.email);
    $("#myForm").submit();
  }
});

$("#1month").on("click", function(e) {
  $("#product").val("socks");
  openCheckout("Buy socks for $10", 1000);
  e.preventDefault();
});
$("#6months").on("click", function(e) {
  $("#product").val("shirts");
  openCheckout("Buy shirts for $30", 3000);
  e.preventDefault();
});
$("#1year").on("click", function(e) {
  $("#product").val("pants");
  openCheckout("Buy pants for $50", 5000);
  e.preventDefault();
});

function openCheckout(description, amount) {
  handler.open({
    name: "Demo Site",
    description: description,
    amount: amount
  });
}
// Close Checkout on page navigation
$(window).on("popstate", function() {
  handler.close();
});
