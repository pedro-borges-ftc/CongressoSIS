const form = document.getElementById("postForm");
const postList = document.getElementById("postList");

// Temporariamente, os dados ficam no localStorage
let posts = JSON.parse(localStorage.getItem("posts")) || [];

function renderPosts() {
  postList.innerHTML = "";
  posts.forEach((p, index) => {
    const li = document.createElement("li");
    li.classList.add("post-item");
    li.innerHTML = `
      <h3>${p.titulo}</h3>
      <p>${p.conteudo}</p>
      <p><small>${p.hashtags}</small></p>
      <button onclick="deletePost(${index})">Excluir</button>
    `;
    postList.appendChild(li);
  });
}

function deletePost(index) {
  posts.splice(index, 1);
  localStorage.setItem("posts", JSON.stringify(posts));
  renderPosts();
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const novoPost = {
    titulo: document.getElementById("titulo").value,
    conteudo: document.getElementById("conteudo").value,
    hashtags: document.getElementById("hashtags").value,
  };
  posts.push(novoPost);
  localStorage.setItem("posts", JSON.stringify(posts));
  form.reset();
  renderPosts();
});

renderPosts();