const email = document.getElementById("email");
const password = document.getElementById("password");
const submit = document.getElementById("submit");

//const auth = JSON.parse(localStorage.getItem("auth"));
// console.log(auth.authenticate);

localStorage.setItem(
  "auth",
  JSON.stringify({
    authenticate: false,
  })
);

let responseData = [];
async function getData() {
  try {
    await fetch("https://mock-5-jsonserver.vercel.app/users")
      .then((res) => res.json())
      .then((res) => {
        responseData.push(res);
      });
  } catch (err) {
    console.log(err.message);
  }
}

getData();

submit.addEventListener("click", async (e) => {
  e.preventDefault();
  if (email.value && password.value) {
    let existingUser = responseData[0].filter((user) => {
      return user.email === email.value;
    });

    if (existingUser.length > 0) {
      let paswordmatch = existingUser.filter((user) => {
        return user.password === password.value;
      });
      if (paswordmatch.length > 0) {
        alert("login successful");
        const username = paswordmatch[0].username;
        localStorage.setItem(
          "auth",
          JSON.stringify({
            authenticate: true,
            username: username,
            avatar: paswordmatch[0].avatar,
          })
        );
        window.location.href = "../blogs.html";
      } else {
        alert("login failed");
        window.location.reload();
      }
    } else {
      alert("Please create your account");
      window.location.href = "../index.html";
    }
  } else {
    alert("Please enter all details");
  }
});
