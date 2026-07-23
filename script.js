const menuButton = document.querySelector('.menu-button');
const menu = document.querySelector('.top-menu');
const modal = document.getElementById('band-modal');
const openButtons = document.querySelectorAll('[data-open-band]');
const closeButtons = document.querySelectorAll('[data-close-band]');

menuButton.addEventListener('click', () => {
  const isOpen = menu.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
});

document.querySelectorAll('.top-menu a, .top-menu button').forEach(item => {

  item.addEventListener('click', () => {

    menu.classList.remove('open');

    menuButton.setAttribute('aria-expanded', 'false');

  });

});

function openBand() {
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');
  menu.classList.remove('open');
  document.querySelector('.close-button').focus();
}
function closeBand() {
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');
}
openButtons.forEach(button => button.addEventListener('click', openBand));
closeButtons.forEach(button => button.addEventListener('click', closeBand));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && modal.classList.contains('open')) closeBand();
});
/* =====================================================
   OUR MUSIC POP-UP AND AUDIO PLAYER
   ===================================================== */

const musicModal = document.getElementById("music-modal");
const musicOpenButtons = document.querySelectorAll("[data-open-music]");
const musicCloseButtons = document.querySelectorAll("[data-close-music]");
const songButtons = document.querySelectorAll(".song-button");

let activeAudio = null;
let activeSongButton = null;

function stopActiveSong() {
  if (activeAudio) {
    activeAudio.pause();
    activeAudio.currentTime = 0;
  }

  if (activeSongButton) {
    activeSongButton.classList.remove("playing");

    const activeIcon =
      activeSongButton.querySelector(".song-play-icon");

    const activeDescription =
      activeSongButton.querySelector(".song-information small");

    if (activeIcon) {
      activeIcon.textContent = "▶";
    }

    if (activeDescription) {
      activeDescription.textContent = "Play sample";
    }
  }

  activeAudio = null;
  activeSongButton = null;
}

function openMusicModal() {
  musicModal.classList.add("open");
  musicModal.setAttribute("aria-hidden", "false");
  document.body.classList.add("music-modal-open");

  if (typeof menu !== "undefined") {
    menu.classList.remove("open");
  }

  const closeButton =
    musicModal.querySelector(".music-close-button");

  if (closeButton) {
    closeButton.focus();
  }
}

function closeMusicModal() {
  stopActiveSong();

  musicModal.classList.remove("open");
  musicModal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("music-modal-open");
}

musicOpenButtons.forEach((button) => {
  button.addEventListener("click", openMusicModal);
});

musicCloseButtons.forEach((button) => {
  button.addEventListener("click", closeMusicModal);
});

songButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const audioFile = button.dataset.audio;
    const playIcon = button.querySelector(".song-play-icon");
    const description =
      button.querySelector(".song-information small");

    /*
      Clicking the song that is already playing pauses it.
    */
    if (
      button === activeSongButton &&
      activeAudio &&
      !activeAudio.paused
    ) {
      activeAudio.pause();
      button.classList.remove("playing");
      playIcon.textContent = "▶";
      description.textContent = "Play sample";
      return;
    }

    /*
      Clicking the paused active song resumes it.
    */
    if (
      button === activeSongButton &&
      activeAudio &&
      activeAudio.paused
    ) {
      activeAudio.play();
      button.classList.add("playing");
      playIcon.textContent = "Ⅱ";
      description.textContent = "Playing";
      return;
    }

    /*
      A different song was selected.
      Stop the previous song and begin the new one.
    */
    stopActiveSong();

    activeAudio = new Audio(audioFile);
    activeSongButton = button;

    button.classList.add("playing");
    playIcon.textContent = "Ⅱ";
    description.textContent = "Playing";

    activeAudio.play().catch((error) => {
      console.error("Unable to play audio:", error);

      button.classList.remove("playing");
      playIcon.textContent = "▶";
      description.textContent = "Audio unavailable";

      activeAudio = null;
      activeSongButton = null;
    });

    activeAudio.addEventListener("ended", () => {
      button.classList.remove("playing");
      playIcon.textContent = "▶";
      description.textContent = "Play again";

      activeAudio = null;
      activeSongButton = null;
    });
  });
});

document.addEventListener("keydown", (event) => {
  if (
    event.key === "Escape" &&
    musicModal.classList.contains("open")
  ) {
    closeMusicModal();
  }
});
const bookModal=document.getElementById("book-modal");

document
.querySelectorAll("[data-open-book]")
.forEach(b=>b.onclick=()=>{

bookModal.classList.add("open");

document.body.classList.add("music-modal-open");

});

document
.querySelectorAll("[data-close-book]")
.forEach(b=>b.onclick=()=>{

bookModal.classList.remove("open");

document.body.classList.remove("music-modal-open");

});