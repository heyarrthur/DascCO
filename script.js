// Abrir e fechar modal
function openModal() {
    document.getElementById("registerModal").style.display = "flex";
}

function closeModal() {
    document.getElementById("registerModal").style.display = "none";
}

// Mostrar/ocultar senha
function togglePassword(id) {
    let input = document.getElementById(id);
    input.type = input.type === "password" ? "text" : "password";
}

// Registrar usuário
function register() {
    let user = document.getElementById("registerUser").value;
    let pass = document.getElementById("registerPass").value;
    let confirmPass = document.getElementById("confirmPass").value;

    if (user === "" || pass === "" || confirmPass === "") {
        alert("Preencha todos os campos!");
        return;
    }

    if (pass !== confirmPass) {
        alert("As senhas não coincidem!");
        return;
    }

    // Armazenar no LocalStorage
    let users = JSON.parse(localStorage.getItem("users")) || [];
    if (users.some(u => u.username === user)) {
        alert("Usuário já cadastrado!");
        return;
    }

    users.push({ username: user, password: pass });
    localStorage.setItem("users", JSON.stringify(users));

    alert("Registrado com sucesso!");
    closeModal();
}

// Fazer login
function login() {
    let user = document.getElementById("loginUser").value;
    let pass = document.getElementById("loginPass").value;

    let users = JSON.parse(localStorage.getItem("users")) || [];
    let validUser = users.find(u => u.username === user && u.password === pass);

    if (validUser) {
        alert("Login bem-sucedido!");
        window.location.href = "dash/index.html"; // Redirecionar para a próxima página
    } else {
        alert("Usuário ou senha inválidos!");
    }
}


// Seleciona elementos do DOM
const profilePicInput = document.getElementById("profilePic");
const profileImage = document.getElementById("profileImage");
const usernameDisplay = document.getElementById("username");

// CARREGAR NOME E FOTO SALVOS NO LOCALSTORAGE
document.addEventListener("DOMContentLoaded", () => {
    const savedName = localStorage.getItem("username");
    const savedPic = localStorage.getItem("profilePic");

    if (savedName) usernameDisplay.innerText = savedName;
    if (savedPic) profileImage.src = savedPic;

    updateCarousel();
    loadPlatforms();
});

// TROCAR FOTO DE PERFIL
profilePicInput.addEventListener("change", (event) => {
    const reader = new FileReader();
    reader.onload = function () {
        profileImage.src = reader.result;
        localStorage.setItem("profilePic", reader.result);
    };
    reader.readAsDataURL(event.target.files[0]);
});

// MODAL EDITAR NOME
function openEditModal() {
    document.getElementById("editModal").style.display = "flex";
}

function closeEditModal() {
    document.getElementById("editModal").style.display = "none";
}

function saveName() {
    const newName = document.getElementById("editName").value;
    if (newName.trim() !== "") {
        usernameDisplay.innerText = newName;
        localStorage.setItem("username", newName);
        closeEditModal();
    }
}

// SELECIONAR ELEMENTOS DO CHAT
const chatMessages = document.getElementById("chatMessages");
const userInput = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");

// ENVIAR MENSAGEM PARA A IA
async function sendMessage() {
    const userMessage = userInput.value.trim();
    if (!userMessage) return;

    // Adiciona mensagem do usuário na interface
    chatMessages.innerHTML += `<div class="user-message">${userMessage}</div>`;

    // Limpa input
    userInput.value = "";

    try {
        const response = await fetch("http://localhost:10000/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userMessage })
        });

        const data = await response.json();

        if (data.botReply) {
            // Exibir resposta do ChatGPT
            chatMessages.innerHTML += `<div class="bot-message">${data.botReply}</div>`;
        } else {
            chatMessages.innerHTML += `<div class="bot-message">Erro ao obter resposta da IA.</div>`;
        }

        // Scroll para última mensagem
        chatMessages.scrollTop = chatMessages.scrollHeight;
    } catch (error) {
        console.error("Erro ao enviar mensagem:", error);
        chatMessages.innerHTML += `<div class="bot-message">Erro de conexão com a API.</div>`;
    }
}

// EVENTO DE CLIQUE NO BOTÃO
sendBtn.addEventListener("click", sendMessage);

// ENVIAR MENSAGEM AO PRESSIONAR ENTER
userInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") sendMessage();
});

