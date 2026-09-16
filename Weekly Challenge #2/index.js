// ===================================================
// 🎓 STUDENT DATA PROCESSOR
// Nama Santri : [Isi Nama Kamu]
// Kelas       : [Isi Kelas Kamu]
// ===================================================

// 📦 Data Awal (Raw Data)
const studentName = "  aHmAd fAuZaN  ";
const ageText = "17 tahun";
const scoreText = "85.678";
const registrationText = "21-08-2026";

// ===================================================
// 🧩 PART 1 — 🧹 Clean the Name & Username
// ===================================================
// 1. Bersihkan spasi luar & ubah ke huruf kecil
const cleanedLower = studentName.trim().toLowerCase();

// 2. Pecah string menjadi array kata
const words = cleanedLower.split(" ");

// 3. Ubah huruf pertama setiap kata menjadi huruf besar (Title Case)
const cleanName = words
  .map(word => word.charAt(0).toUpperCase() + word.slice(1))
  .join(" ");

// 4. Buat username (pemisah titik & huruf kecil)
const userName = words.join(".").toLowerCase();


// ===================================================
// 🧩 PART 2 — 🔍 Analyze the Name
// ===================================================
const containsAhmad = cleanName.includes("Ahmad");
const first5Chars = cleanName.slice(0, 5);
const replacementName = cleanName.replace("Ahmad", "Budi");


// ===================================================
// 🧩 PART 3 — 🎂 Process the Age
// ===================================================
const age = parseInt(ageText);
const currentYear = new Date().getFullYear();
const birthYear = currentYear - age;


// ===================================================
// 🧩 PART 4 — 📊 Process the Score
// ===================================================
const score = parseFloat(scoreText);
const scoreFormatted = score.toFixed(2);
const scoreRound = Math.round(score);
const scoreFloor = Math.floor(score);
const scoreCeil = Math.ceil(score);


// ===================================================
// 🧩 PART 5 — 🏆 Determine the Grade
// ===================================================
let grade = "";
if (score >= 90 && score <= 100) {
  grade = "A";
} else if (score >= 80) {
  grade = "B";
} else if (score >= 70) {
  grade = "C";
} else if (score >= 60) {
  grade = "D";
} else {
  grade = "E";
}


// ===================================================
// 🧩 PART 6 — 📅 Process Registration Date
// ===================================================
const regParts = registrationText.split("-");
const regDay = Number(regParts[0]);
const regMonth = Number(regParts[1]);
const regYear = Number(regParts[2]);


// ===================================================
// 🧩 PART 7 & 8 — ⏰ Current Date, Time & Formatter
// ===================================================
const now = new Date();

// Function Formatter Tanggal (DD/MM/YYYY)
function formatDate(dateObj) {
  const day = String(dateObj.getDate()).padStart(2, "0");
  const month = String(dateObj.getMonth() + 1).padStart(2, "0"); // getMonth() dimulai dari 0
  const year = String(dateObj.getFullYear());
  return `${day}/${month}/${year}`;
}

const reportDateStr = formatDate(now);
const hoursStr = String(now.getHours()).padStart(2, "0");
const minutesStr = String(now.getMinutes()).padStart(2, "0");
const reportTimeStr = `${hoursStr}:${minutesStr}`;


// ===================================================
// 🧩 PART 9 — 🎲 Lucky Dice
// ===================================================
const dice = Math.floor(Math.random() * 6) + 1;
let diceResult = "";

if (dice === 6) {
  diceResult = "🔥 JACKPOT!";
} else if (dice === 1) {
  diceResult = "💀 BAD LUCK!";
} else {
  diceResult = "😎 GOOD LUCK!";
}


// ===================================================
// ⭐ BONUS KREATIVITAS (+5 Poin)
// 1. Email santri otomatis dari username
// 2. Status kelulusan akademis
// 3. Konversi nama hari ke Bahasa Indonesia
// ===================================================
const studentEmail = `${userName}@santri.sch.id`;
const isPassed = score >= 70 ? "LULUS (PASSED)" : "BELUM LULUS";

const daysIndo = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
const dayNameIndo = daysIndo[now.getDay()];


// ===================================================
// 🧩 PART 10 — 🖥️ FINAL REPORT
// ===================================================
console.log('╔════════════════════════════════════╗');
console.log('║      🎓 STUDENT DATA PROCESSOR     ║');
console.log('╚════════════════════════════════════╝');

console.log('👤 STUDENT');
console.log('────────────────────────────────────');
console.log(`Original Name : "${studentName}"`);
console.log(`Clean Name    : ${cleanName}`);
console.log(`Username      : ${userName}`);
console.log(`Email (Bonus) : ${studentEmail}`);

console.log('\n🔎 NAME ANALYSIS');
console.log('────────────────────────────────────');
console.log(`Contains Ahmad : ${containsAhmad}`);
console.log(`First 5 chars  : ${first5Chars}`);
console.log(`Replacement    : ${replacementName}`);

console.log('\n🎂 AGE');
console.log('────────────────────────────────────');
console.log(`Age Text       : ${ageText}`);
console.log(`Age            : ${age}`);
console.log(`Birth Year     : ${birthYear}`);

console.log('\n📊 SCORE');
console.log('────────────────────────────────────');
console.log(`Original Score : ${scoreText}`);
console.log(`Formatted      : ${scoreFormatted}`);
console.log(`Round          : ${scoreRound}`);
console.log(`Floor          : ${scoreFloor}`);
console.log(`Ceil           : ${scoreCeil}`);
console.log(`Grade          : ${grade}`);
console.log(`Status (Bonus) : ${isPassed}`);

console.log('\n📅 REGISTRATION');
console.log('────────────────────────────────────');
console.log(`Date           : ${registrationText}`);
console.log(`Parsed Day     : ${regDay}`);
console.log(`Parsed Month   : ${regMonth}`);
console.log(`Parsed Year    : ${regYear}`);

console.log('\n🕐 REPORT GENERATED');
console.log('────────────────────────────────────');
console.log(`Date           : ${reportDateStr} (${dayNameIndo})`);
console.log(`Time           : ${reportTimeStr}`);

console.log('\n🎲 LUCKY DICE');
console.log('────────────────────────────────────');
console.log(`Dice           : ${dice}`);
console.log(`Result         : ${diceResult}`);

console.log('\n╔════════════════════════════════════╗');
console.log('║       🚀 PROCESS COMPLETE!         ║');
console.log('╚════════════════════════════════════╝');