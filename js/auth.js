// SIGNUP
async function signup() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const name = document.getElementById("name").value;

  const { data, error } = await supabase.auth.signUp({
    email,
    password
  });

  if (error) return alert(error.message);

  const user = data.user;

  // Save user profile
  await supabase.from("users").insert([
    {
      id: user.id,
      email: email,
      name: name
    }
  ]);

  alert("Signup successful!");
}


// LOGIN
async function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) return alert(error.message);

  window.location = "index.html";
}


// LOGOUT
async function logout() {
  await supabase.auth.signOut();
  window.location = "login.html";
}


// CHECK USER
async function getCurrentUser() {
  const { data } = await supabase.auth.getUser();
  return data.user;
}
