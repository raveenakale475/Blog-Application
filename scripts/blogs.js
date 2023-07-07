const auth = JSON.parse(localStorage.getItem("auth"));
if (auth.authenticate === false) {
  window.location.href = "../index.html";
} else {
  const all_blogs = document.getElementById("all-blogs");
  all_blogs.innerText = "blogs";

  let url = "https://mock-5-jsonserver.vercel.app/blogs?_page=1&_limit=4";

  async function getData() {
    try {
      await fetch(url)
        .then((res) => res.json())
        .then((data) => {
          // console.log(data);
          Displaydata(data);
        });
    } catch (err) {
      alert(err.message);
    }
  }

  getData();

  const category = document.getElementById("category");

  category.addEventListener("change", async () => {
    if (category.value === "Selectcategory") {
      url = "https://mock-5-jsonserver.vercel.app/blogs?_page=1&_limit=4";
      getData();
    } else {
      url = `https://mock-5-jsonserver.vercel.app/blogs?category=${category.value}&_page=1&_limit=4`;
      getData();
    }
  });

  const date = document.getElementById("date");

  date.addEventListener("change", async () => {
    if (date.value === "sortbydate") {
      url = "https://mock-5-jsonserver.vercel.app/blogs?_page=1&_limit=4";
      getData();
    } else if (date.value === "Ascending") {
      url =
        "https://mock-5-jsonserver.vercel.app/blogs?_sort=date&_order=asc&_page=1&_limit=4";
      getData();
    } else if (date.value === "Descending") {
      url =
        "https://mock-5-jsonserver.vercel.app/blogs?_sort=date&_order=desc&_page=1&_limit=4";
      getData();
    }
  });

  const search = document.getElementById("search");

  search.addEventListener("change", async () => {
    setTimeout(() => {
      url = `https://mock-5-jsonserver.vercel.app/blogs?title=${search.value}&_page=1&_limit=4`;
      getData();
    }, 1000);
  });

  async function deleteblog(id) {
    try {
      let headerList = {
        "Content-Type": "application/json",
      };

      let response = await fetch(
        `https://mock-5-jsonserver.vercel.app/blogs/${id}`,
        {
          method: "DELETE",
          headers: headerList,
        }
      );

      alert("Deleted Successfully");
      getData();
    } catch (err) {
      console.log(err.message);
    }
  }

  let flag = false;

  function Displaydata(data) {
    all_blogs.innerHTML = null;

    data.map((item) => {
      let blogItem = document.createElement("div");
      blogItem.setAttribute("id", "carditem");

      let blogContent = document.createElement("div");

      blogContent.innerHTML = `
        <h1>Username:- ${item.username}</h1>
        <p>Category:- ${item.category}</p>
        <p>Date:- ${item.date}</p>
        <h1>Title:- ${item.title}</h1>
        <p>Content:- ${item.content}</p>
        `;
      const avatar = document.createElement("img");
      avatar.setAttribute("src", item.avatar);
      avatar.setAttribute("alt", item.username);
      avatar.style.width = "140px";
      avatar.style.borderRadius = "50%";

      const button_div = document.createElement("div");
      button_div.setAttribute("id", "content");
      item.username === auth.username
        ? (button_div.style.display = "flex")
        : (button_div.style.display = "none");

      let button = document.createElement("button");
      button.innerText = "Edit";
      // button.setAttribute("id", "edit");
      // button.addEventListener("click", () => {
      //   OpenModal(item);
      // });

      let like_div = document.createElement("div");
      like_div.style.display = "flex";
      like_div.style.gap = "5px";

      let like_para = document.createElement("p");
      like_para.innerText = item.likes;

      let like_img = document.createElement("img");
      like_img.src =
        "https://icones.pro/wp-content/uploads/2021/04/icone-noire-jaune.png";
      like_img.style.width = "50px";
      like_img.style.cursor = "pointer";
      like_div.append(like_img, like_para);

      flag == false
        ? like_img.addEventListener("click", async () => {
            try {
              let headersList = {
                "Content-Type": "application/json",
              };

              let bodyContent = JSON.stringify({
                likes: item.likes + 1,
              });

              let response = await fetch(
                `https://mock-5-jsonserver.vercel.app/blogs/${item.id}`,
                {
                  method: "PATCH",
                  body: bodyContent,
                  headers: headersList,
                }
              );

              flag = true;
              getData();
            } catch (err) {
              console.log(err);
            }
          })
        : null;

      let comment_div = document.createElement("div");
      comment_div.style.display = "flex";
      comment_div.style.gap = "5px";
      let comment_para = document.createElement("p");
      comment_para.innerText = item.comments.length;
      let comment_img = document.createElement("img");
      comment_img.src = "https://static.thenounproject.com/png/1002927-200.png";
      comment_img.style.width = "50px";
      comment_img.style.cursor = "pointer";
      comment_div.append(comment_img, comment_para);

      comment_img.addEventListener("click", () => {
        OpenModal(item.comments, item.id);
      });

      let show_comment = document.createElement("div");
      show_comment.style.display = "flex";
      show_comment.style.flexDirection = "column";
      show_comment.style.gap = "10px";
      show_comment.style.padding = "10px";
      show_comment.style.width = "50%";
      show_comment.style.margin = "auto";

      let comment_data = item.comments;
      comment_data.map((Item, index) => {
        console.log(Item);
        let cardComment = document.createElement("div");
        cardComment.style.display = "flex";
        cardComment.style.flexDirection = "column";
        cardComment.style.gap = "10px";
        cardComment.style.padding = "10px";
        cardComment.style.textAlign = "center";
        cardComment.style.border = "1px solid #ccc";

        let cardCommentUsername = document.createElement("h4");
        cardCommentUsername.innerText = Item.username;

        let cardCommentCmnt = document.createElement("p");
        cardCommentCmnt.innerText = Item.content;

        cardComment.append(cardCommentUsername, cardCommentCmnt);
        show_comment.append(cardComment);
      });

      let del_button = document.createElement("button");
      del_button.innerText = "Delete";
      del_button.addEventListener("click", () => {
        deleteblog(item.id);
      });

      let social_icon = document.createElement("div");
      social_icon.style.display = "flex";
      social_icon.style.gap = "50px";
      social_icon.append(like_div, comment_div);

      button_div.append(button, del_button);
      blogContent.appendChild(button_div);
      blogItem.append(avatar, blogContent);
      all_blogs.append(blogItem, social_icon, show_comment);
    });
  }

  // Get the modal
  const modal = document.getElementById("myModal");
  const modalUserName = document.getElementById("modal_username");
  modalUserName.value = auth.username;
  modalUserName.setAttribute("disabled", true);
  const modalComment = document.getElementById("modal-comment");

  const postComment = document.getElementById("add_btn");

  async function OpenModal(comments, id) {
    modal.style.display = "block";

    postComment.addEventListener("click", async () => {
      if (modalComment.value) {
        try {
          let headersList = {
            "Content-Type": "application/json",
          };

          let bodyContent = JSON.stringify({
            comments: [
              ...comments,
              { username: auth.username, content: modalComment.value },
            ],
          });

          let response = await fetch(
            `https://mock-5-jsonserver.vercel.app/blogs/${id}`,
            {
              method: "PATCH",
              body: bodyContent,
              headers: headersList,
            }
          );

          alert("Comment added successfully");
          modal.style.display = "none";
          getData();
        } catch (err) {
          console.error(err);
        }
      } else {
        alert("Please fill all credentials");
      }
    });
  }

  // Get the <span> element that closes the modal
  const span = document.querySelector(".close");

  // When the user clicks on <span> (x), close the modal
  span.addEventListener("click", () => {
    modal.style.display = "none";
  });

  // When the user clicks anywhere outside of the modal, close it
  window.addEventListener("click", (event) => {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  });

  const signout = document.getElementById("signout");
  signout.addEventListener("click", () => {
    alert("Sign out sucessfully");
    window.location.href = "../index.html";
  });
}
