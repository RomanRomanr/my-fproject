
const btn = document.getElementById('btn');
const stop = document.getElementById('stop');
const audio = document.getElementById('audio');
const heartsLayer = document.getElementById('hearts');
const status = document.getElementById('status');

let heartsInterval = null;
let running = false;

function createHeart(){
  const el = document.createElement('div');
  el.className = 'heart';
  el.innerHTML = `
    <svg viewBox="0 0 32 29.6" xmlns="http://www.w3.org/2000/svg">
      <path d="M23.6 0c-2.9 0-4.9 1.9-5.6 3.3C17.3 1.9 15.3 0 12.4 0 7.4 0 3.6 3.9 3.6 8.8c0 9 12.5 13.5 12.9 13.7.3.1.6.1.9 0 .4-.2 12.9-4.7 12.9-13.7C28.4 3.9 24.6 0 19.6 0z" fill="currentColor"/>
    </svg>`;
  const left = Math.random() * 100;
  el.style.left = left + '%';
  const duration = 3500 + Math.random() * 3000;
  el.style.animationDuration = duration + 'ms';
  const sx = (Math.random() * 200 - 100) + 'px';
  el.style.setProperty('--sx', sx);
  const size = 18 + Math.random() * 34;
  el.style.width = size + 'px';
  el.style.height = size + 'px';
  const r = 200 + Math.floor(Math.random()*55);
  const g = 60 + Math.floor(Math.random()*80);
  const b = 100 + Math.floor(Math.random()*60);
  el.style.color = `rgb(${r},${g},${b})`;
  el.addEventListener('animationend', () => el.remove());
  heartsLayer.appendChild(el);
}

function startHearts(){
  if(heartsInterval) return;
  heartsInterval = setInterval(createHeart, 180 + Math.random()*220);
}

function stopHearts(){
  if(heartsInterval){
    clearInterval(heartsInterval);
    heartsInterval = null;
  }
  heartsLayer.querySelectorAll('.heart').forEach(h => h.remove());
}

function playAll(){
  if(running) return;
  running = true;
  status.textContent = 'Працює';
  startHearts();
  audio.currentTime = 0;
  const playPromise = audio.play();
  if(playPromise !== undefined){
    playPromise.catch(err => {
      status.textContent = 'Помилка відтворення аудіо';
      console.error('Audio play failed:', err);
    });
  }
}

function stopAll(){
  if(!running) return;
  running = false;
  status.textContent = 'Зупинено';
  stopHearts();
  try{ audio.pause(); audio.currentTime = 0; } catch(e){}
}

btn.addEventListener('click', () => {
  playAll();
});

stop.addEventListener('click', () => {
  stopAll();
});

window.addEventListener('pagehide', () => stopAll());




  