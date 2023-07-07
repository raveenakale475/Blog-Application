const auth = JSON.parse(localStorage.getItem("auth"));
if (auth.authenticate === false) {
  window.location.href = "../index.html";
} else {
  const username = document.getElementById("username");
  const title = document.getElementById("title");
  const content = document.getElementById("content");
  const category = document.getElementById("category");
  const submit = document.getElementById("submit");
  const date = document.getElementById("date");
  username.value = auth.username;
  username.setAttribute("disabled", true);

  submit.addEventListener("click", async (e) => {
    e.preventDefault();
    if (title.value && content.value && category.value && date.value) {
      try {
        let headerList = {
          "Content-Type": "application/json",
        };

        let bodyContent = JSON.stringify({
          username: auth.username,
          avatar: auth.avatar,
          title: title.value,
          content: content.value,
          category: category.value,
          date: date.value,
          likes: 0,
          comments: [],
        });

        let response = await fetch(
          "https://mock-5-jsonserver.vercel.app/blogs",
          {
            method: "POST",
            body: bodyContent,
            headers: headerList,
          }
        );

        alert("Post has been added successfully");

        title.value = "";
        content.value = "";
      } catch (err) {
        console.log(err.message);
      }
    } else {
      alert("Please fill all required field");
    }
  });
}
