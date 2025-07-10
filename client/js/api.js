const API_BASE = "http://localhost:5000/api";

function getHeaders() {
  return {
    "Content-Type": "application/json",
    Authorization: localStorage.getItem("token"),
  };
}

async function getBoards() {
  const res = await fetch(`${API_BASE}/boards`, {
    headers: getHeaders(),
  });
  return res.json();
}

async function createBoard(name) {
  const res = await fetch(`${API_BASE}/boards`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify({ name }),
  });
  return res.json();
}

async function getTasks(boardId) {
  const res = await fetch(`${API_BASE}/tasks/${boardId}`, {
    headers: getHeaders(),
  });
  return res.json();
}

async function createTask(boardId, taskData) {
  const res = await fetch(`${API_BASE}/tasks/${boardId}`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(taskData),
  });
  return res.json();
}
