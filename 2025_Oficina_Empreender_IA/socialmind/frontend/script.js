const form = document.getElementById("postForm");
const postList = document.getElementById("postList");
const API_URL = "https://socialmind-backend.vercel.app/api/posts";

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

// --- IA Simulada ---
const btnGerar = document.getElementById("btnGerar");
const temaInput = document.getElementById("tema");
const resultadoIA = document.getElementById("resultadoIA");

// “Banco de ideias” simulando uma IA
const ideiasIA = {
  tecnologia: {
    texto: "A inovação está em cada linha de código. 💡 Desenvolver é transformar ideias em impacto real!",
    hashtags: "#Tecnologia #Inovação #Desenvolvimento"
  },
  viagens: {
    texto: "Viajar é colecionar memórias que cabem no coração e inspiram a próxima aventura. 🌍✈️",
    hashtags: "#Viagens #Aventura #Descobertas"
  },
  marketing: {
    texto: "Conte histórias que conectam e criam valor. Marketing é sobre emoção, não apenas alcance. 📣",
    hashtags: "#Marketing #Branding #Conteúdo"
  },
  saúde: {
    texto: "Cuide de quem mais importa: você. 💚 Pequenas atitudes hoje geram grandes resultados amanhã.",
    hashtags: "#Saúde #BemEstar #Equilíbrio"
  },
  default: {
    texto: "Deixe sua criatividade fluir! Escreva algo autêntico e envolvente. ✨",
    hashtags: "#Criatividade #Inspiração"
  }
};

btnGerar.addEventListener("click", () => {
  const tema = temaInput.value.toLowerCase();
  const ideia = ideiasIA[tema] || ideiasIA.default;
  
  resultadoIA.innerHTML = `
    <p><strong>Sugestão de Post:</strong><br>${ideia.texto}</p>
    <p><strong>Hashtags:</strong> ${ideia.hashtags}</p>
  `;

  // Preenche automaticamente o formulário principal
  document.getElementById("titulo").value = `Post sobre ${tema}`;
  document.getElementById("conteudo").value = ideia.texto;
  document.getElementById("hashtags").value = ideia.hashtags;
});
// --- Fim da IA Simulada ---

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