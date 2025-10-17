
    const taskInput = document.getElementById("taskInput");
    const addBtn = document.getElementById("addBtn");
    const taskList = document.getElementById("taskList");

    // Load tasks from local storage
    document.addEventListener("DOMContentLoaded", loadTasks);

    addBtn.addEventListener("click", addTask);
    taskInput.addEventListener("keypress", function(e) {
      if (e.key === "Enter") addTask();
    });

    function addTask() {
      const taskText = taskInput.value.trim();
      if (taskText === "") return;

      const li = document.createElement("li");
      li.className = "flex justify-between items-center bg-gray-50 border p-2 rounded-md";

      const span = document.createElement("span");
      span.textContent = taskText;
      span.className = "flex-grow cursor-pointer";
      span.addEventListener("click", () => {
        span.classList.toggle("line-through");
        span.classList.toggle("text-gray-400");
        saveTasks();
      });

      const delBtn = document.createElement("button");
      delBtn.textContent = "❌";
      delBtn.className = "ml-3 text-red-500 hover:text-red-700";
      delBtn.addEventListener("click", () => {
        li.remove();
        saveTasks();
      });

      li.appendChild(span);
      li.appendChild(delBtn);
      taskList.appendChild(li);

      taskInput.value = "";
      saveTasks();
    }

    function saveTasks() {
      const tasks = [];
      document.querySelectorAll("#taskList li").forEach(li => {
        const text = li.querySelector("span").textContent;
        const done = li.querySelector("span").classList.contains("line-through");
        tasks.push({ text, done });
      });
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function loadTasks() {
      const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
      tasks.forEach(t => {
        const li = document.createElement("li");
        li.className = "flex justify-between items-center bg-gray-50 border p-2 rounded-md";

        const span = document.createElement("span");
        span.textContent = t.text;
        span.className = "flex-grow cursor-pointer";
        if (t.done) {
          span.classList.add("line-through", "text-gray-400");
        }
        span.addEventListener("click", () => {
          span.classList.toggle("line-through");
          span.classList.toggle("text-gray-400");
          saveTasks();
        });

        const delBtn = document.createElement("button");
        delBtn.textContent = "❌";
        delBtn.className = "ml-3 text-red-500 hover:text-red-700";
        delBtn.addEventListener("click", () => {
          li.remove();
          saveTasks();
        });

        li.appendChild(span);
        li.appendChild(delBtn);
        taskList.appendChild(li);
      });
    }
  