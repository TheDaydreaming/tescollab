const taskInput = document.getElementById("taskInput");
const addButton = document.getElementById("addButton");
const taskList = document.getElementById("taskList");
const taskCount = document.getElementById("taskCount");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function displayTasks() {

    taskList.innerHTML = "";

    tasks.forEach(function (task, index) {

        const li = document.createElement("li");

        li.className = "task";

        if (task.completed) {
            li.classList.add("completed");
        }

        li.innerHTML = `
            <input 
                type="checkbox" 
                ${task.completed ? "checked" : ""}
                onchange="toggleTask(${index})"
            >

            <span>${task.text}</span>

            <button 
                class="delete-button"
                onclick="deleteTask(${index})"
            >
                Hapus
            </button>
        `;

        taskList.appendChild(li);
    });

    taskCount.textContent = `${tasks.length} tugas`;
}

function addTask() {

    const text = taskInput.value.trim();

    if (text === "") {
        alert("Tugas tidak boleh kosong!");
        return;
    }

    tasks.push({
        text: text,
        completed: false
    });

    taskInput.value = "";

    saveTasks();

    displayTasks();
}

function toggleTask(index) {

    tasks[index].completed = !tasks[index].completed;

    saveTasks();

    displayTasks();
}

function deleteTask(index) {

    tasks.splice(index, 1);

    saveTasks();

    displayTasks();
}

addButton.addEventListener("click", addTask);

taskInput.addEventListener("keydown", function (event) {

    if (event.key === "Enter") {
        addTask();
    }

});

displayTasks();