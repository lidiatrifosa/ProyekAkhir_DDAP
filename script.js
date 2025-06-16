// Discussion logic
const discussionForm = document.getElementById("discussionForm");
const discussionList = document.getElementById("discussionList");
let discussions = JSON.parse(localStorage.getItem("discussions") || "[]");
function renderDiscussions() {
  discussionList.innerHTML = discussions
    .map(
      (d, i) => `
    <div class="chat-bubble p-3 mb-2${i % 2 === 1 ? " bg-blue" : ""}">
      <div class="fw-bold mb-1">${d.username || "Anonim"}</div>
      <div>${d.message}</div>
      <div class="text-end text-muted small mt-1">${d.time}</div>
    </div>
  `
    )
    .join("");
}
discussionForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const username = document.getElementById("username").value.trim();
  const message = document.getElementById("message").value.trim();
  if (!message) return;
  const time = new Date().toLocaleString("id-ID");
  discussions.unshift({ username, message, time });
  localStorage.setItem("discussions", JSON.stringify(discussions));
  renderDiscussions();
  discussionForm.reset();
});
renderDiscussions();

// Mood Tracker logic
const moodEmojis = document.querySelectorAll(".mood-emoji");
const saveMoodBtn = document.getElementById("saveMood");
const moodHistory = document.getElementById("moodHistory");
let selectedMood = null;
let moods = JSON.parse(localStorage.getItem("moods") || "[]");
moodEmojis.forEach((emoji) => {
  emoji.addEventListener("click", function () {
    moodEmojis.forEach((e) =>
      e.classList.remove("border", "border-3", "border-pastelpink-500")
    );
    this.classList.add("border", "border-3", "border-pastelpink-500");
    selectedMood = this.dataset.mood;
    saveMoodBtn.disabled = false;
  });
});
saveMoodBtn.addEventListener("click", function () {
  if (!selectedMood) return;
  const time = new Date().toLocaleDateString("id-ID");
  moods.unshift({ mood: selectedMood, time });
  localStorage.setItem("moods", JSON.stringify(moods));
  renderMoods();
  saveMoodBtn.disabled = true;
  moodEmojis.forEach((e) =>
    e.classList.remove("border", "border-3", "border-pastelpink-500")
  );
  selectedMood = null;
});
function renderMoods() {
  moodHistory.innerHTML = moods
    .map(
      (m) => `
      <li class="list-group-item">
        ${m.time}: <span class="text-capitalize">${m.mood}</span>
      </li>
    `
    )
    .join("");
}
renderMoods();

// Navbar active link logic
function updateActiveNav() {
  const hash = window.location.hash || "#home";
  const navLinks = document.querySelectorAll(".navbar-nav .nav-link");

  navLinks.forEach((link) => {
    if (link.getAttribute("href") === hash) {
      link.classList.add("pastelpink-text", "fw-semibold");
    } else {
      link.classList.remove("pastelpink-text", "fw-semibold");
    }
  });
}

updateActiveNav();
window.addEventListener("hashchange", updateActiveNav);
