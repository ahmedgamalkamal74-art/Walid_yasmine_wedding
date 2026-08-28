const weddingDate = new Date("2026-09-13T21:00:00+03:00").getTime();

function updateCountdown(){
  const now = Date.now();
  let diff = weddingDate - now;
  if(diff < 0) diff = 0;

  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const minutes = Math.floor((diff % 3600000) / 60000);
  const seconds = Math.floor((diff % 60000) / 1000);

  document.getElementById("days").textContent = String(days).padStart(2,"0");
  document.getElementById("hours").textContent = String(hours).padStart(2,"0");
  document.getElementById("minutes").textContent = String(minutes).padStart(2,"0");
  document.getElementById("seconds").textContent = String(seconds).padStart(2,"0");
}
updateCountdown();
setInterval(updateCountdown,1000);

const observer = new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting) entry.target.classList.add("show");
  });
},{threshold:.12});
document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));

// Optional music: put a file named music.mp3 beside index.html to enable it.
const btn = document.getElementById("musicBtn");
let audio;
btn.addEventListener("click", ()=>{
  if(!audio){
    audio = new Audio("music.mp3");
    audio.loop = true;
  }
  if(audio.paused){
    audio.play().then(()=>{
      btn.innerHTML = "♫ <span>إيقاف الموسيقى</span>";
    }).catch(()=>{
      btn.innerHTML = "♫ <span>ضع ملف music.mp3 أولًا</span>";
    });
  }else{
    audio.pause();
    btn.innerHTML = "♫ <span>تشغيل الموسيقى</span>";
  }
});
