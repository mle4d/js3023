var divName = 'pointer';
var offX = -500;          
var offY = -30;          

function mouseX(evt) {
  if (!evt) evt = window.event; 
  if (evt.pageX) 
  return evt.pageX; 
  else if (evt.clientX)
  return evt.clientX + (document.documentElement.scrollLeft ?  document.documentElement.scrollLeft : document.body.scrollLeft); 
  else return 0;
}
function mouseY(evt) {
  if (!evt) evt = window.event; 
  if (evt.pageY) 
  return evt.pageY; 
  else if (evt.clientY)
  return evt.clientY + (document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop); 
  else return 0;
}

function follow(evt) {
    var obj = document.getElementById(divName).style;
    obj.left = (parseInt(mouseX(evt))+offX) + 'px';
    obj.top = (parseInt(mouseY(evt))+offY) + 'px'; 
    }
document.onmousemove = follow;

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
  msg.text = document.querySelector('.speech').value;
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
      speechSynthesis.speak(speech);
    }
  }

  speechSynthesis.addEventListener('voiceschanged', populateVoices);
  voicesList.addEventListener('click', setVoice);
  options.forEach(option => option.addEventListener('change', setOption));
  // sayButton.addEventListener('click', toggle);
  playButton.addEventListener('click', toggle);

  