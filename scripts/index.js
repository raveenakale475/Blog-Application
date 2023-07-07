const username = document.getElementById("username");
const avatar = document.getElementById("avatar");
const email = document.getElementById("email");
const password = document.getElementById("password");
const submit = document.getElementById("submit");

submit.addEventListener("click", async (e) => {
  e.preventDefault();

  if (username.value && avatar.value && email.value && password.value) {
    try {
      let headerList = {
        "Content-Type": "application/json",
      };

      let bodyContent = JSON.stringify({
        username: username.value,
        avatar: avatar.value,
        email: email.value,
        password: password.value,
      });

      let response = await fetch("https://mock-5-jsonserver.vercel.app/users", {
        method: "POST",
        body: bodyContent,
        headers: headerList,
      });

      alert("Sign up successfully");
      window.location.href = "../signin.html";

      let data = await response.json();
    } catch (err) {
      console.log(err.message);
    }
  } else {
    alert("Please fill correct details");
  }
});

localStorage.setItem(
  "auth",
  JSON.stringify({
    authenticate: false,
  })
);
