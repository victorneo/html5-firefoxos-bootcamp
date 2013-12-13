function dropImage(evt){
  var img = document.createElement('img');
  img.src = evt.target.result;
  return img;
}

document.addEventListener("DOMContentLoaded", function () {
  var submitBtn = document.getElementById("submitBtn");
  var messages = document.getElementById("messages");
  var messageInput = document.getElementById("message");

  // playing catch up for day3
  var ws = new WebSocket("ws://172.22.131.203:3000");

  window.addEventListener('beforeunload', function(){
    ws.close()
  });

  function whenClicked (event) {
    messages.innerHTML += messageInput.value + '<br />';
    ws.send(
      JSON.stringify({
        type: 'text',
        from: 'Victor Neo',
        content: messageInput.value,
      })
    );
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

  // Perform magic when a message is pushed to us
  ws.onmessage = function (message) {
    var msg = JSON.parse(message.data)

    // Notifications
    Notification.requestPermission(function() {
      new Notification(msg.from, {'body': 'Message: ' + msg.content, 'icon': '/logo.png'});
    });

    if (msg.type === 'text'){
      messages.innerHTML += msg.from + ': ' + msg.content;
    }
    else if (msg.type === 'image'){
      var img = document.createElement('img');
      img.src = msg.content;
      messages.appendChild(img);
    }
    else if (msg.type === 'text'){
      var href = document.createElement('a');
      img.href = msg.content;
      messages.appendChild(href);
    }
    messages.innerHTML += '<br />';
  };
});

