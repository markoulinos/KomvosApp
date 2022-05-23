
// Render the PayPal button into #paypal-button-container
paypal.Buttons({

  // Set up the transaction
  createOrder: function (data, actions) {
    return actions.order.create({
      purchase_units: [{
        amount: {

          value: '10.00'
        }
      }]
    });
  },

  // Finalize the transaction
  onApprove: function (data, actions) {
    return actions.order.capture().then(function (orderData) {
      // Successful capture! For demo purposes:
      console.log('Capture result', orderData, JSON.stringify(orderData, null, 2));
      var transaction = orderData.purchase_units[0].payments.captures[0];
      alert('Transaction ' + transaction.status + ': ' + transaction.id + '\n\n Η συναλαγή ολοκληρώθηκε με επιτυχία');
      if (orderData.status === 'COMPLETED') {
        window.location.replace('http://localhost:1337/userprofile');
      }
      // Replace the above to show a success message within this page, e.g.
      const element = document.getElementById('paypal-button-container');
      element.innerHTML = '';
      element.innerHTML = '<h3>Thank you for your payment!</h3>';
      // Or go to another URL:  actions.redirect('thank_you.html');
    });
  }


}).render('#paypal-button-container');