// AMBIL ELEMEN DARI HTML
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');
const filterBtns = document.querySelectorAll('.filter-btn');

// ARRAY UNTUK MENYIMPAN TUGAS
let tasks = [];


// FUNGSI TAMBAH TUGAS
addTaskBtn.addEventListener('click', function() {
    const taskText = taskInput.value.trim();
    
    if (taskText !== '') {
        const newTask = {
            id: Date.now(),
            text: taskText,
            completed: false
        };

        tasks.push(newTask);
        taskInput.value = '';
        renderTasks();
        saveTasksToLocal();
    }
});


// FUNGSI TAMPILKAN TUGAS
function renderTasks(filter = 'all') {
    taskList.innerHTML = '';
    
    // FILTER TUGAS
    let filteredTasks = [];
    if (filter === 'all') filteredTasks = tasks;
    if (filter === 'active') filteredTasks = tasks.filter(t => !t.completed);
    if (filter === 'completed') filteredTasks = tasks.filter(t => t.completed);

    // BUAT ELEMEN LIST
    filteredTasks.forEach(task => {
        const li = document.createElement('li');
        li.className = `task-item ${task.completed ? 'completed' : ''}`;
        
        li.innerHTML = `
            <span>${task.text}</span>
            <div class="task-actions">
                <button class="complete-btn" onclick="toggleComplete(${task.id})">${task.completed ? 'Batal' : 'Selesai'}</button>
                <button class="delete-btn" onclick="deleteTask(${task.id})">Hapus</button>
            </div>
        `;

        taskList.appendChild(li);
    });
}


// FUNGSI TANDAI SELESAI
function toggleComplete(taskId) {
    tasks = tasks.map(task => {
        if (task.id === taskId) {
            task.completed = !task.completed;
        }
        return task;
    });
    renderTasks();
    saveTasksToLocal();
}


// FUNGSI HAPUS TUGAS
function deleteTask(taskId) {
    tasks = tasks.filter(task => task.id !== taskId);
    renderTasks();
    saveTasksToLocal();
}


// FUNGSI FILTER TUGAS
filterBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        // HAPUS KELAS ACTIVE
        filterBtns.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        
        // TAMPILKAN TUGAS SESUAI FILTER
        renderTasks(this.dataset.filter);
    });
});


// FUNGSI SIMPAN KE LOCAL STORAGE
function saveTasksToLocal() {
    localStorage.setItem('todoTasks', JSON.stringify(tasks));
}


// FUNGSI AMBIL DATA DARI LOCAL STORAGE
function loadTasksFromLocal() {
    const savedTasks = localStorage.getItem('todoTasks');
    if (savedTasks) {
        tasks = JSON.parse(savedTasks);
        renderTasks();
    }
}


// JALANKAN FUNGSI LOAD SAAT HALAMAN SIAP
window.addEventListener('DOMContentLoaded', loadTasksFromLocal);


// BONUS: TAMBAH TUGAS DENGAN TOMBOL ENTER
taskInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addTaskBtn.click();
    }
});