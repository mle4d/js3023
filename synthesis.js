const msg = new SpeechSynthesisUtterance();
  let voices = [];
  const voicesList = document.querySelector('[name="voice"]');
  const options = document.querySelectorAll('[type="range"], [class="text"]');
  // const speakButton = document.querySelector('#say');
  const playButton = document.querySelector('#play');
  msg.text = document.querySelector('.text').value;
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

  