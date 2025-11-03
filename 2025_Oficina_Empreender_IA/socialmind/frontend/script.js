const API_URL = "https://congresso-sis-socialmind.vercel.app/api/posts";

const form = document.getElementById("postForm");
const postList = document.getElementById("postList");

async function carregarPosts() {
  postList.innerHTML = "<p>Carregando...</p>";
  try {
    const res = await fetch(API_URL);
    const posts = await res.json();

    postList.innerHTML = "";
    posts.forEach((p) => {
      const li = document.createElement("li");
      li.classList.add("post-item");
      li.innerHTML = `
        <h3>${p.titulo}</h3>
        <p>${p.conteudo}</p>
        <p><small>${p.hashtags}</small></p>
        <button onclick="excluirPost('${p._id}')">Excluir</button>
      `;
      postList.appendChild(li);
    });
  } catch (error) {
    postList.innerHTML = "<p>Erro ao carregar posts.</p>";
    console.error(error);
  }
}

async function salvarPost(e) {
  e.preventDefault();

  const novoPost = {
    titulo: document.getElementById("titulo").value,
    conteudo: document.getElementById("conteudo").value,
    hashtags: document.getElementById("hashtags").value,
  };

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(novoPost),
    });

    if (res.ok) {
      form.reset();
      carregarPosts();
    } else {
      alert("Erro ao salvar o post!");
    }
  } catch (error) {
    console.error("Erro ao salvar:", error);
  }
}

async function excluirPost(id) {
  if (!confirm("Deseja realmente excluir esta postagem?")) return;

  try {
    const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    if (res.ok) carregarPosts();
    else alert("Erro ao excluir o post.");
  } catch (error) {
    console.error("Erro ao excluir:", error);
  }
}

form.addEventListener("submit", salvarPost);
carregarPosts();

// --- IA Simulada (mantida igual) ---
/*const btnGerar = document.getElementById("btnGerar");
const temaInput = document.getElementById("tema");
const resultadoIA = document.getElementById("resultadoIA");

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

  document.getElementById("titulo").value = `Post sobre ${tema}`;
  document.getElementById("conteudo").value = ideia.texto;
  document.getElementById("hashtags").value = ideia.hashtags;
});*/
// --- Fim da IA Simulada ---

// --- Código Melhorado para Simulação da IA ---
const btnGenerate = document.getElementById("btnGenerate");
btnGenerate.addEventListener("click", () => {
  const topic = document.getElementById("tema").value;
  const response = fakeAI(topic);

  document.getElementById("resultadoIA").innerHTML =
    `<p>${response.post}</p><br><strong>${response.hashtags}</strong>`;
    
  document.getElementById("titulo").value = `Post sobre ${topic}`;
  document.getElementById("conteudo").value = response.post;
  document.getElementById("hashtags").value = response.hashtags;
});

function fakeAI(contentIdea) {
  const topic = contentIdea.trim();

  // Palavras-chave extraídas do tema
  const keywords = topic.split(" ").slice(0, 4);

  // Modelos de resposta
  const templates = [
    `Você já parou para pensar sobre *${topic}*? Esse tema vem ganhando destaque e pode ser o diferencial para quem deseja evoluir. Explore novas perspectivas e transforme conhecimento em ação.`,
    `O mundo está mudando rápido, e *${topic}* é uma das áreas que mais tem se destacado. Entenda suas oportunidades e prepare-se para o futuro adquirindo novas habilidades e uma visão estratégica.`,
    `Investir tempo para entender *${topic}* pode abrir portas incríveis. Aproveite para aprender mais, aplicar na prática e compartilhar com sua rede.`,
    `Uma das discussões mais importantes atualmente é sobre *${topic}*. Se você quer se destacar, comece agora a explorar ideias, criar projetos e buscar inovação.`,
    `Independentemente da sua área, *${topic}* pode trazer insights poderosos para sua trajetória. Continue estudando, experimentando e compartilhando suas descobertas.`
  ];

  // Hashtags dinâmicas
  const hashtagsBase = [
    "#Inovação", "#Tecnologia", "#Aprendizado", "#Produtividade", 
    "#Dicas", "#Tendências", "#Desenvolvimento", "#Estratégia"
  ];

  const hashtagsTopic = keywords.map(k => `#${k.replace(/[^\w]/g,'')}`);

  const text = templates[Math.floor(Math.random() * templates.length)];

  return {
    post: text,
    hashtags: hashtagsTopic.concat(hashtagsBase.slice(0, 3)).join(" ")
  };
}
// --- Fim da Melhoria para a IA Simulada ---