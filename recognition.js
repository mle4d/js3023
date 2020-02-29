window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  
  const recognition = new SpeechRecognition();
  recognition.interimResults = true;
  recognition.lang = 'en-US';
  
  // let p = document.createElement('p');
  // const words = document.querySelector('.speech');
  // words.appendChild(p);

  // recognition.addEventListener('result', e => {
  //   const transcript = Array.from(e.results)
  //     .map(result => result[0])
  //     .map(result => result.transcript)
  //     .join('');

  //     const Script = transcript.replace();
  //     p.textContent = Script;

  //     if (e.results[0].isFinal) {
  //       p = document.createElement('p');
  //       words.appendChild(p);
  //     }
      recognition.onresult = function (event) {
        for (var i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            text.value += event.results[i][0].transcript;
          }
        }
      }
      // msg(result.transcript)
  
  recognition.start();