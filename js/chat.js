let currentChatId = null;

// CREATE CHAT ID
function createChatId(uid1, uid2) {
  return uid1 < uid2 ? uid1 + "_" + uid2 : uid2 + "_" + uid1;
}


// SEND MESSAGE
async function sendMessage() {
  const input = document.getElementById("messageInput");
  const text = input.value;

  if (!text || !currentChatId) return;

  const user = await getCurrentUser();

  await supabase.from("messages").insert([
    {
      chat_id: currentChatId,
      sender_id: user.id,
      text: text
    }
  ]);

  input.value = "";
}


// LOAD MESSAGES
async function loadMessages(chatId) {
  currentChatId = chatId;

  const { data } = await supabase
    .from("messages")
    .select("*")
    .eq("chat_id", chatId)
    .order("created_at", { ascending: true });

  const chatBox = document.getElementById("chatBox");
  chatBox.innerHTML = "";

  const user = await getCurrentUser();

  data.forEach(msg => {
    const div = document.createElement("div");
    div.className = msg.sender_id === user.id ? "myMsg" : "otherMsg";
    div.innerText = msg.text;
    chatBox.appendChild(div);
  });
}


// REALTIME LISTENER
function listenMessages(chatId) {
  supabase
    .channel("chat")
    .on(
      "postgres_changes",
      {
        event: "INSERT",
        schema: "public",
        table: "messages",
        filter: `chat_id=eq.${chatId}`
      },
      payload => {
        loadMessages(chatId);
      }
    )
    .subscribe();
}
