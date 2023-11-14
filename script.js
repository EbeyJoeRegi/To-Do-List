var allTab = document.getElementById("all-tab");
var pendingTab = document.getElementById("pending-tab");
var completedTab = document.getElementById("completed-tab");

function showTab(tabName) {
    allTab.style.display = "none";
    pendingTab.style.display = "none";
    completedTab.style.display = "none";

    document.getElementById(tabName + "-tab").style.display = "block";

    if (tabName === 'all') {
        updateAllTab();
    } else if (tabName === 'pending') {
        updatePendingTab();
    }
}

function updateAllTab() {
    var allTasks = document.getElementById("todo-list").innerHTML;
    document.getElementById("all-tab").innerHTML = `<h3>All Tasks</h3><ul id="todo-list">${allTasks}</ul>`;
}

function updatePendingTab() {
    var pendingTasks = document.getElementById("pending-list").innerHTML;
    document.getElementById("pending-tab").innerHTML = `<h3>Pending Tasks</h3><ul id="pending-list">${pendingTasks}</ul>`;
}

function addTask() {
    var taskInput = document.getElementById("taskInput");
    var taskText = taskInput.value;

    if (taskText.trim() !== "") {
        var listItem = document.createElement("li");
        listItem.className = "task";
        listItem.innerHTML = `
            <span>${taskText}</span>
            <button onclick="editTask(this)">Edit</button>
            <button onclick="deleteTask(this)">Delete</button>
            <button onclick="completeTask(this)">Complete</button>
        `;

        document.getElementById("todo-list").appendChild(listItem);
        document.getElementById("pending-list").appendChild(listItem.cloneNode(true)); // Add to pending tab by default
        taskInput.value = "";

        updateAllTab();
        updatePendingTab();
    }
}

function editTask(button) {
    var listItem = button.parentElement;
    var newText = prompt("Edit task:", listItem.firstChild.innerText);

    if (newText !== null) {
        listItem.firstChild.innerText = newText;

        updateAllTab();
        updatePendingTab();
    }
}

function deleteTask(button) {
    var listItem = button.parentElement;
    listItem.remove();

    updateAllTab();
    updatePendingTab();
}

function completeTask(button) {
    var listItem = button.parentElement;
    listItem.classList.toggle("completed");

    var completedList = document.getElementById("completed-list");
    var pendingList = document.getElementById("pending-list");

    if (listItem.classList.contains("completed")) {
        completedList.appendChild(listItem);
        pendingList.removeChild(listItem);
        button.innerText = "Undo";
    } else {
        document.getElementById("todo-list").appendChild(listItem);
        pendingList.appendChild(listItem);
        completedList.removeChild(listItem);
        button.innerText = "Complete";
    }

    updateAllTab();
    updatePendingTab();
}

// Show the "All" tab by default
showTab('all');
