function dropImage(evt){
  var img = document.createElement('img');
  var messages = document.getElementById("messages");
  img.src = evt.target.result;
  messages.appendChild(img);
  messages.innerHTML += '<br />';
}

document.addEventListener("DOMContentLoaded", function () {
  var submitBtn = document.getElementById("submitBtn");
  var messages = document.getElementById("messages");
  var messageInput = document.getElementById("message");

  function whenClicked (event) {
    messages.innerHTML  += messageInput.value + '<br />';
    messageInput.value = '';
  };

  submitBtn.addEventListener("click", whenClicked);

  // demo2
  var target = document.getElementById('target-drop');
  target.addEventListener('dragover', function(evt){
    evt.preventDefault();
  });

  target.addEventListener('drop', function(evt){
    evt.preventDefault();
    evt.stopPropagation();
    console.log('dropped');

    var file = evt.dataTransfer.files[0];
    var fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = dropImage;
  });
});

