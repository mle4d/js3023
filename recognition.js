window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  
  const recognition = new SpeechRecognition();
  recognition.interimResults = true;
  recognition.lang = 'en-US';

  recognition.onresult = function (event) {
    for (var i = event.resultIndex; i < event.results.length; ++i) {
    if (event.results[i].isFinal) {
      text.value += event.results[i][0].transcript;
        const script = transcript.update();
          text.value = script;
          speak(transcript);
        }
      }
    }

    document.getElementById('say').onclick = function() {
      recognition.start();
    }