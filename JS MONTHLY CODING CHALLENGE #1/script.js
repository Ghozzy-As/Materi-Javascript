// 1. DATA STATE (Inisialisasi angka awal persis seperti contoh gambar)
const candidates = [
  { id: "game", name: "Mini Game", icon: "🎮", votes: 7 },
  { id: "store", name: "Mini Store", icon: "🛒", votes: 2 },
  { id: "todo", name: "To-Do App", icon: "📝", votes: 4 },
  { id: "quiz", name: "Quiz App", icon: "🧠", votes: 3 }
];

// 2. DOM SELECTIONS
const totalVotesText = document.querySelector("#totalVotesText");
const leaderTitle = document.querySelector("#leaderTitle");
const leaderDesc = document.querySelector("#leaderDesc");
const feedbackChoice = document.querySelector("#feedbackChoice");

const resetBtn = document.querySelector("#resetBtn");
const fullscreenBtn = document.querySelector("#fullscreenBtn");

// 3. MAIN UPDATE FUNCTION
function updatePollData() {
  // Hitung total vote seluruh kandidat
  const totalVotes = candidates.reduce((sum, item) => sum + item.votes, 0);
  totalVotesText.textContent = totalVotes;

  // Cari kandidat dengan vote terbanyak (Leader)
  let leader = candidates[0];
  candidates.forEach(c => {
    if (c.votes > leader.votes) {
      leader = c;
    }
  });

  // Update statistik setiap kandidat
  candidates.forEach(c => {
    const votesElem = document.querySelector(`#votes-${c.id}`);
    const percentElem = document.querySelector(`#percent-${c.id}`);
    const barElem = document.querySelector(`#bar-${c.id}`);

    // Hitung persentase
    const percentage = totalVotes === 0 ? 0 : Math.round((c.votes / totalVotes) * 100);

    // Update DOM tiap card
    if (votesElem) votesElem.textContent = c.votes;
    if (percentElem) percentElem.textContent = `${percentage}%`;
    if (barElem) barElem.style.width = `${percentage}%`;
  });

  // Update tampilan Current Leader
  if (totalVotes === 0) {
    leaderTitle.textContent = "-";
    leaderDesc.textContent = "Belum ada vote yang masuk.";
  } else {
    leaderTitle.textContent = `${leader.icon} ${leader.name}`;
    leaderDesc.textContent = `${leader.votes} vote — sementara berada di posisi pertama 🔥`;
  }
}

// 4. EVENT LISTENERS FOR VOTE BUTTONS
candidates.forEach(c => {
  const btn = document.querySelector(`#btn-${c.id}`);
  if (btn) {
    btn.addEventListener("click", () => {
      // Tambahkan vote
      c.votes++;
      
      // Update feedback banner
      feedbackChoice.textContent = `${c.icon} ${c.name}`;
      
      // Render ulang UI
      updatePollData();
    });
  }
});

// 5. RESET BUTTON LOGIC
resetBtn.addEventListener("click", () => {
  candidates.forEach(c => c.votes = 0);
  feedbackChoice.textContent = "Semua vote telah di-reset!";
  updatePollData();
});

// 6. FULLSCREEN BUTTON LOGIC
fullscreenBtn.addEventListener("click", () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().catch(err => {
      console.log(`Error attempting to enable fullscreen: ${err.message}`);
    });
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }
});

// Inisialisasi awal saat halaman pertama kali dimuat
updatePollData();