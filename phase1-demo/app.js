// app.js
import { state } from "./state.js";
import { fetchUsers } from "./api.js";

const userList = document.getElementById("users");
const loadingText = document.getElementById("loading");

const renderUsers = () => {
  userList.innerHTML = "";

  state.users.forEach(user => {
    const li = document.createElement("li");
    li.textContent = user.name;
    userList.appendChild(li);
  });
};

const loadUsers = async () => {
  state.loading = true;
  loadingText.textContent = "Loading...";

  state.users = await fetchUsers(); // reference update

  state.loading = false;
  loadingText.textContent = "";
  renderUsers();
};

loadUsers();

