document.addEventListener("DOMContentLoaded", function () {
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


// ظهور العناصر أثناء التمرير
const observer = new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add("show");
    }
  });
},{threshold:.12});

document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));


// 🎵 الموسيقى
const music = new Audio("music.mp3");
music.loop = true;
music.volume = 0.7;

const openInvitation = document.getElementById("openInvitation");
const welcomeScreen = document.getElementById("welcomeScreen");
const musicBtn = document.getElementById("musicBtn");


// 💌 فتح الدعوة
if(openInvitation){
  openInvitation.addEventListener("click", function(){

    music.play()
      .then(function(){
        if(musicBtn){
          musicBtn.innerHTML = "♫ <span>إيقاف الموسيقى</span>";
        }
      })
      .catch(function(error){
        console.log("Music error:", error);
      });

    if(welcomeScreen){
      welcomeScreen.classList.add("hide");
    }

    setTimeout(function(){
      startAutoScroll();
    },1500);

  });
}


// 🎵 زر الموسيقى
if(musicBtn){
  musicBtn.addEventListener("click", function(){

    if(music.paused){

      music.play();

      musicBtn.innerHTML = "♫ <span>إيقاف الموسيقى</span>";

    }else{

      music.pause();

      musicBtn.innerHTML = "♫ <span>تشغيل الموسيقى</span>";

    }

  });
}


// 📜 التمرير التلقائي
let autoScrolling = false;
let scrollTimer;

function startAutoScroll(){

  if(autoScrolling) return;

  autoScrolling = true;

  scrollTimer = setInterval(function(){

    if(
      window.innerHeight + window.scrollY >=
      document.documentElement.scrollHeight - 5
    ){

      clearInterval(scrollTimer);
      autoScrolling = false;
      return;
    }

    window.scrollBy(0,1);

  },80);
}


// 👆 إيقاف التمرير عند لمس/تحريك الصفحة
function stopAutoScroll(){

  clearInterval(scrollTimer);
  autoScrolling = false;

}

window.addEventListener("wheel", stopAutoScroll, {passive:true});
window.addEventListener("touchmove", stopAutoScroll, {passive:true});
  });
