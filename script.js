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
