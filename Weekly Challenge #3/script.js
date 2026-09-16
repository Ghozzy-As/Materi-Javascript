let students = [];
let isEditing = false;
let editId = null;
let alertTimeout = null;

// DOM Elements
const studentForm = document.getElementById("studentForm");
const studentIdInput = document.getElementById("studentId");
const studentNameInput = document.getElementById("studentName");
const studentScoreInput = document.getElementById("studentScore");
const formTitle = document.getElementById("formTitle");
const submitBtn = document.getElementById("submitBtn");
const cancelBtn = document.getElementById("cancelBtn");

const studentList = document.getElementById("studentList");
const alertContainer = document.getElementById("alertContainer");
const totalStudentsEl = document.getElementById("totalStudents");
const averageScoreEl = document.getElementById("averageScore");

// Inisialisasi saat aplikasi pertama dibuka
document.addEventListener("DOMContentLoaded", () => {
    loadStudentsFromStorage();
    renderStudents();
    updateStats();
});

// Event Listener untuk Form Submit (Add / Update)
studentForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = studentNameInput.value.trim();
    const score = parseFloat(studentScoreInput.value);

    if (!name || isNaN(score)) return;

    if (isEditing) {
                updateStudent(editId, name, score);
            } else {
                addStudent(name, score);
            }
        });

        // Event Listener untuk Tombol Batal Edit
        cancelBtn.addEventListener("click", resetForm);

        // Ambil data dari LocalStorage
        function loadStudentsFromStorage() {
            const storedData = localStorage.getItem("students");
            if (storedData) {
                students = JSON.parse(storedData);
            } else {
                students = [];
            }
        }

        // Simpan data ke LocalStorage
        function saveStudentsToStorage() {
            localStorage.setItem("students", JSON.stringify(students));
        }

        // Render daftar siswa ke DOM
        function renderStudents() {
            studentList.innerHTML = "";

            if (students.length === 0) {
                studentList.innerHTML = `<div class="empty-state">Belum ada data siswa. Silakan tambahkan data di atas.</div>`;
                return;
            }

            students.forEach((student, index) => {
                const item = document.createElement("div");
                item.className = "student-item";

                item.innerHTML = `
                    <div class="student-info">
                        <span class="student-num">${index + 1}.</span>
                        <span class="student-name">${escapeHtml(student.name)}</span>
                    </div>
                    <div class="student-actions">
                        <span class="score-badge">${student.score}</span>
                        <button type="button" class="btn-action btn-edit" onclick="setEditMode(${student.id})">✏️ Ubah</button>
                        <button type="button" class="btn-action btn-delete" onclick="deleteStudent(${student.id})">🗑️ Hapus</button>
                    </div>
                `;

                studentList.appendChild(item);
            });
        }

// Fungsi Tambah Student
function addStudent(name, score) {
    const newStudent = {
        id: Date.now(),
        name: name,
        score: score
    };

    students.push(newStudent);
    saveStudentsToStorage();
    renderStudents();
    updateStats();
    resetForm();

    showAlert(`✅ Data siswa <strong>${escapeHtml(name)}</strong> berhasil ditambahkan.`);
}

// Persiapan Form ke Mode Edit
function setEditMode(id) {
    const student = students.find((s) => s.id === id);
    if (!student) return;

    isEditing = true;
    editId = id;

    studentIdInput.value = student.id;
    studentNameInput.value = student.name;
    studentScoreInput.value = student.score;

    formTitle.innerText = "✏️ Edit Siswa";
    submitBtn.innerText = "💾 Update Siswa";
    cancelBtn.classList.remove("hidden");
    
    studentNameInput.focus();
}

// Fungsi Update Student
function updateStudent(id, name, score) {
    const index = students.findIndex((s) => s.id === id);

    if (index !== -1) {
        students[index].name = name;
        students[index].score = score;

        saveStudentsToStorage();
        renderStudents();
        updateStats();
        resetForm();

        showAlert(`🔄 Data siswa <strong>${escapeHtml(name)}</strong> berhasil diperbarui.`);
    }
}

// Fungsi Delete Student dengan Konfirmasi
function deleteStudent(id) {
    const student = students.find((s) => s.id === id);
    if (!student) return;

    const isConfirmed = confirm(`Apakah kamu yakin ingin menghapus siswa ${student.name}?`);

    if (isConfirmed) {
        students = students.filter((s) => s.id !== id);

        saveStudentsToStorage();
        renderStudents();
        updateStats();

        if (isEditing && editId === id) {
            resetForm();
        }

        showAlert(`🗑️ Data siswa <strong>${escapeHtml(student.name)}</strong> berhasil dihapus.`);
    }
}

// Reset Form ke keadaan awal
function resetForm() {
    studentForm.reset();
    studentIdInput.value = "";
    isEditing = false;
    editId = null;

    formTitle.innerText = "➕ Tambah Siswa";
    submitBtn.innerText = "➕ Tambah Siswa";
    cancelBtn.classList.add("hidden");
}

// Update Statistik Total Siswa & Rata-rata Nilai
function updateStats() {
    const total = students.length;
    totalStudentsEl.innerText = total;

    if (total === 0) {
        averageScoreEl.innerText = "0";
        return;
    }

    const totalScore = students.reduce((sum, s) => sum + Number(s.score), 0);
    const avg = totalScore / total;

    averageScoreEl.innerText = Number.isInteger(avg) ? avg : avg.toFixed(1);
}

// Menampilkan Alert Notification (Otomatis Hilang 3 Detik)
function showAlert(message) {
    alertContainer.innerHTML = message;
    alertContainer.classList.remove("hidden");

    if (alertTimeout) {
        clearTimeout(alertTimeout);
    }

    alertTimeout = setTimeout(() => {
        alertContainer.classList.add("hidden");
    }, 3000);
}

// Sanitasi Input
function escapeHtml(string) {
    const div = document.createElement("div");
    div.innerText = string;
    return div.innerHTML;
}