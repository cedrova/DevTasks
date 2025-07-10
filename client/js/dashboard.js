document.addEventListener("DOMContentLoaded", () => {
  loadBoards();

  const boardForm = document.getElementById("boardForm");
  boardForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const boardName = document.getElementById("boardName").value;
    await createBoard(boardName);
    boardForm.reset();
    loadBoards();
  });
});

async function loadBoards() {
  const container = document.getElementById("boardsContainer");
  container.innerHTML = "";

  const boards = await getBoards();
  for (let board of boards) {
    const tasks = await getTasks(board._id);

    const div = document.createElement("div");
    div.className = "board";
    div.innerHTML = `
      <h3>${board.name}</h3>
      <ul>${tasks.map(t => `<li>${t.title} - ${t.status}</li>`).join("")}</ul>
      <form onsubmit="addTask(event, '${board._id}')">
        <input name="title" placeholder="Task title" required />
        <input name="description" placeholder="Description" />
        <input name="dueDate" type="date" />
        <select name="status">
          <option value="todo">To Do</option>
          <option value="in progress">In Progress</option>
          <option value="done">Done</option>
        </select>
        <button type="submit">Add Task</button>
      </form>
    `;
    container.appendChild(div);
  }
}

async function addTask(e, boardId) {
  e.preventDefault();
  const form = e.target;
  const task = {
    title: form.title.value,
    description: form.description.value,
    dueDate: form.dueDate.value,
    status: form.status.value,
  };
  await createTask(boardId, JSON.stringify(task));
  loadBoards();
}


function logout() {
  localStorage.removeItem("token");
  window.location.href = "login.html";
}