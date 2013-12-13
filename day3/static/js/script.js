function dropImage(evt){
  var img = document.createElement('img');
  img.src = evt.target.result;
  return img;
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

    var file = evt.dataTransfer.files[0];
    var fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = function(evt){
      img = dropImage(evt);
      messages.appendChild(img);
      messages.innerHTML += '<br />';
    };
  });
});

