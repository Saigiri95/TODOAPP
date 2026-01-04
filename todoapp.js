let tasks = [];
let currentFilter = "all";

const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const stats = document.getElementById("stats");
const filterBtns = document.querySelectorAll(".filter-btn");

addBtn.addEventListener("click", addTask);
taskInput.addEventListener("keypress", e => {
    if (e.key === "Enter") addTask();
});

filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        filterBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        currentFilter = btn.dataset.filter;
        renderTasks();
    });
});

function addTask() {
    const text = taskInput.value.trim();
    if (text === "") return;

    tasks.push({
        id: Date.now(),
        text: text,
        completed: false
    });

    taskInput.value = "";
    renderTasks();
}

function toggleTask(id) {
    tasks.forEach(task => {
        if (task.id === id) {
            task.completed = !task.completed;
        }
    });
    renderTasks();
}

function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    renderTasks();
}

function renderTasks() {
    taskList.innerHTML = "";

    let filteredTasks = tasks;
    if (currentFilter === "active") {
        filteredTasks = tasks.filter(t => !t.completed);
    } else if (currentFilter === "completed") {
        filteredTasks = tasks.filter(t => t.completed);
    }

    filteredTasks.forEach(task => {
        const li = document.createElement("li");
        li.className = `task ${task.completed ? "completed" : ""}`;

        li.innerHTML = `
            <input type="checkbox" ${task.completed ? "checked" : ""} onclick="toggleTask(${task.id})">
            <span>${task.text}</span>
            <button onclick="deleteTask(${task.id})">X</button>
        `;

        taskList.appendChild(li);
    });

    updateStats();
}

function updateStats() {
    const total = tasks.length;
    const completed = tasks.filter(t => t.completed).length;
    stats.textContent = `Total: ${total} | Completed: ${completed}`;
}

renderTasks();
