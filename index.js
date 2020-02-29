window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  
  const recognition = new SpeechRecognition();
  recognition.interimResults = true;
  recognition.lang = 'en-US';
  
  let p = document.createElement('p');
  const words = document.querySelector('.speech');
  words.appendChild(p);

  recognition.addEventListener('result', e => {
    const transcript = Array.from(e.results)
      .map(result => result[0])
      .map(result => result.transcript)
      .join('');

      const Script = transcript.replace();
      p.textContent = Script;

      if (e.results[0].isFinal) {
        p = document.createElement('p');
        words.appendChild(p);
      }
  });
  recognition.start();

const msg = new SpeechSynthesisUtterance();
  let voices = [];
  const voicesList = document.querySelector('[name="voice"]');
  const options = document.querySelectorAll('[type="range"], [name="text"]');
  // const speakButton = document.querySelector('#say');
  const playButton = document.querySelector('#play');
  msg.text = document.querySelector('.msg').value;
  console.log(msg);

  function populateVoices() {
    voices = this.getVoices();
    voicesList.innerHTML = voices
      .filter(voice => voice.name.length < 10)
      .filter(voice => voice.lang.includes('en'))
      .map(voice => `<option value="${voice.name}">${voice.name}</option>`)
      .join('');
  }

  function setVoice() {
    msg.voice = voices.find(voice => voice.name === this.value);
    toggle();
  }

  function setOption() {
    msg[this.name] = this.value;
    toggle();
  }
  function toggle(startOver = true) {
    speechSynthesis.cancel();
    if (startOver) {
      speechSynthesis.speak(msg);
    }
  }

  speechSynthesis.addEventListener('voiceschanged', populateVoices);
  voicesList.addEventListener('click', setVoice);
  options.forEach(option => option.addEventListener('change', setOption));
  // sayButton.addEventListener('click', toggle);
  playButton.addEventListener('click', toggle);

  