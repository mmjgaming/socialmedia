// CREATE GROUP
async function createGroup() {
  const name = prompt("Group name?");
  if (!name) return;

  const user = await getCurrentUser();

  const { data } = await supabase
    .from("groups")
    .insert([{ name, created_by: user.id }])
    .select();

  const groupId = data[0].id;

  await supabase.from("group_members").insert([
    {
      group_id: groupId,
      user_id: user.id
    }
  ]);

  loadGroups();
}


// LOAD GROUPS
async function loadGroups() {
  const user = await getCurrentUser();

  const { data } = await supabase
    .from("group_members")
    .select("groups(id, name)")
    .eq("user_id", user.id);

  const groupList = document.getElementById("groupList");
  groupList.innerHTML = "";

  data.forEach(item => {
    const group = item.groups;

    const div = document.createElement("div");
    div.innerText = group.name;

    div.onclick = () => {
      loadMessages(group.id);
      listenMessages(group.id);
    };

    groupList.appendChild(div);
  });
}
