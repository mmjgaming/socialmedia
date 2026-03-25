async function loadUsers() {
  const { data } = await supabase.from("users").select("*");

  const currentUser = await getCurrentUser();
  const userList = document.getElementById("userList");
  userList.innerHTML = "";

  data.forEach(user => {
    if (user.id === currentUser.id) return;

    const div = document.createElement("div");
    div.innerText = user.name;

    div.onclick = () => {
      const chatId = createChatId(currentUser.id, user.id);
      loadMessages(chatId);
      listenMessages(chatId);
    };

    userList.appendChild(div);
  });
}
