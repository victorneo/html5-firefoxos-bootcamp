document.addEventListener("DOMContentLoaded", function () {
  var submitBtn = document.getElementById("submitBtn");
  var messages = document.getElementById("messages");
  var messageInput = document.getElementById("message");

  function whenClicked (event) {
    messages.value += messageInput.value + '\n';
    messageInput.value = '';
  };

  submitBtn.addEventListener("click", whenClicked);
});

