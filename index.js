var divName = 'pointer';
var offX = -500;          
var offY = -35;          

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

const msg = new SpeechSynthesisUtterance();
  let voices = [];
  const voicesDropdown = document.querySelector('[name="voice"]');
  const options = document.querySelectorAll('[type="range"], [name="text"]');
  // const speakButton = document.querySelector('#say');
  const playButton = document.querySelector('#play');
  msg.text = document.querySelector('[name="text"]').value;

  function populateVoices() {
    voices = this.getVoices();
    voicesDropdown.innerHTML = voices
      .filter(voice => voice.name.length < 10)
      .filter(voice => voice.lang.includes('en'))
      .map(voice => `<option value="${voice.name}">${voice.name} (${voice.lang})</option>`)
      .join('');
  }

  function setVoice() {
    msg.voice = voices.find(voice => voice.name === this.value);
    toggle();
  }

  function toggle(startOver = true) {
    speechSynthesis.cancel();
    if (startOver) {
      speechSynthesis.speak(msg);
    }
  }

  function setOption() {
    console.log(this.name, this.value);
    msg[this.name] = this.value;
    toggle();
  }

  speechSynthesis.addEventListener('voiceschanged', populateVoices);
  voicesDropdown.addEventListener('change', setVoice);
  // options.forEach(option => option.addEventListener('change', setOption));
  // sayButton.addEventListener('click', toggle);
  playButton.addEventListener('click', toggle);