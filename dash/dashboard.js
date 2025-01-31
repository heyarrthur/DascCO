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

// CARROSSEL AUTOMÁTICO COM REDIRECIONAMENTO
const carouselCards = [
    { icon: "fas fa-bolt", title: "Versão 0.0.1.2", desc: "Novas funções e design implementados, saiba mais acessando nosso artigo.", link: "../blog/att01.html" },
    { icon: "fas fa-code", title: "Desenvolvimento Versão 0.0.1.3", desc: "Está sendo desenvolvido a nova atualização, onde irá conter chatGPT para te ajudar em suas funções diárias.", link: "../blog/att02.html" },
    { icon: "fas fa-cloud", title: "Armazenamento no LocalStorage", desc: "Maior segurança para seu dashCO.", link: "../blog/att03.html" },
    { icon: "fas fa-chart-line", title: "Meta de Usuários", desc: "É com muito orgulho e alegria que gostaria de comunicar que nossa plataforma já possui mais de 20 membros que a utilizam em seu dia dia!.", link: "../blog/att04.html" }    
];

let currentIndex = 0;
const carouselElement = document.querySelector(".carousel");

function updateCarousel() {
    const card = carouselCards[currentIndex];
    carouselElement.innerHTML = `
        <div class="carousel-card">
            <div class="card-icon"><i class="${card.icon}"></i></div>
            <div class="card-text">
                <h3>${card.title}</h3>
                <p>${card.desc}</p>
            </div>
            <div class="card-arrow" onclick="window.location.href='${card.link}'">
                <i class="fas fa-arrow-right"></i>
            </div>
        </div>
    `;

    currentIndex = (currentIndex + 1) % carouselCards.length;
}

setInterval(updateCarousel, 8000);
updateCarousel();

// MODAL NOVA PLATAFORMA
function openPlatformModal() {
    document.getElementById("platformModal").style.display = "flex";
}

function closePlatformModal() {
    document.getElementById("platformModal").style.display = "none";
}

// SALVAR NOVA PLATAFORMA NO LOCALSTORAGE
function savePlatform() {
    const name = document.getElementById("platformName").value;
    const desc = document.getElementById("platformDesc").value;
    const link = document.getElementById("platformLink").value;
    const type = document.getElementById("platformType").value;

    if (name.trim() === "" || desc.trim() === "" || link.trim() === "" || type.trim() === "") {
        alert("Preencha todos os campos!");
        return;
    }

    let platforms = JSON.parse(localStorage.getItem("platforms")) || [];
    platforms.push({ name, desc, link, type });

    localStorage.setItem("platforms", JSON.stringify(platforms));

    alert("Plataforma adicionada com sucesso!");
    closePlatformModal();
    loadPlatforms();
}

// CARREGAR PLATAFORMAS DO LOCALSTORAGE
function loadPlatforms() {
    const platformList = document.getElementById("platformList");
    platformList.innerHTML = "";

    let platforms = JSON.parse(localStorage.getItem("platforms")) || [];

    platforms.forEach((platform, index) => {
        platformList.innerHTML += `
            <div class="platform-card">
                <div class="platform-icon"><i class="fas fa-${getIconByType(platform.type)}"></i></div>
                <div class="platform-content">
                    <h3>${platform.name}</h3>
                    <p>${platform.desc}</p>
                </div>
                <div class="platform-actions">
                    <button class="open-link" onclick="window.open('${platform.link}', '_blank')">
                        <i class="fas fa-arrow-right"></i>
                    </button>
                    <button class="delete-btn" onclick="deletePlatform(${index})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
    });
}

// FUNÇÃO PARA DEFINIR ÍCONES POR TIPO DE PLATAFORMA
function getIconByType(type) {
    switch (type.toLowerCase()) {
        case "redes sociais": return "users";
        case "e-commerce": return "shopping-cart";
        case "blog": return "pen";
        case "educação": return "book";
        default: return "globe";
    }
}

// DELETAR PLATAFORMA
function deletePlatform(index) {
    let platforms = JSON.parse(localStorage.getItem("platforms")) || [];
    platforms.splice(index, 1);
    localStorage.setItem("platforms", JSON.stringify(platforms));
    loadPlatforms();
}

// SELECIONANDO ELEMENTOS DO DOM
const platformList = document.getElementById("platformList");
const expandBtn = document.getElementById("expandBtn");

// FUNÇÃO PARA EXPANDIR A LISTA DE PLATAFORMAS
function togglePlatformExpansion() {
    let platforms = JSON.parse(localStorage.getItem("platforms")) || [];
    const isExpanded = expandBtn.getAttribute("data-expanded") === "true";

    if (isExpanded) {
        renderPlatforms(platforms.slice(0, 12)); // Limitar a 12 plataformas
        expandBtn.innerHTML = "Mostrar Mais ⬇";
        expandBtn.setAttribute("data-expanded", "false");
    } else {
        renderPlatforms(platforms); // Mostrar todas as plataformas
        expandBtn.innerHTML = "Mostrar Menos ⬆";
        expandBtn.setAttribute("data-expanded", "true");
    }
}

// FUNÇÃO PARA RENDERIZAR A LISTA DE PLATAFORMAS
function renderPlatforms(platforms) {
    platformList.innerHTML = "";

    platforms.forEach((platform, index) => {
        platformList.innerHTML += `
            <div class="platform-card">
                <div class="platform-icon"><i class="fas fa-${getIconByType(platform.type)}"></i></div>
                <div class="platform-content">
                    <h3>${platform.name}</h3>
                    <p>${platform.desc}</p>
                </div>
                <div class="platform-actions">
                    <button class="open-link" onclick="window.open('${platform.link}', '_blank')">
                        <i class="fas fa-arrow-right"></i>
                    </button>
                    <button class="delete-btn" onclick="deletePlatform(${index})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
    });

    // Mostrar o botão de expansão apenas se houver mais de 12 plataformas
    expandBtn.style.display = platforms.length > 12 ? "block" : "none";
}

// FUNÇÃO PARA DELETAR UMA PLATAFORMA
function deletePlatform(index) {
    let platforms = JSON.parse(localStorage.getItem("platforms")) || [];
    platforms.splice(index, 1);
    localStorage.setItem("platforms", JSON.stringify(platforms));
    loadPlatforms();
}

// FUNÇÃO PARA CARREGAR AS PLATAFORMAS
function loadPlatforms() {
    let platforms = JSON.parse(localStorage.getItem("platforms")) || [];
    renderPlatforms(platforms.slice(0, 12)); // Mostra apenas 12 inicialmente
    expandBtn.setAttribute("data-expanded", "false");
}

// DEFINIR ÍCONES PELO TIPO DE PLATAFORMA
function getIconByType(type) {
    switch (type.toLowerCase()) {
        case "redes sociais": return "users";
        case "e-commerce": return "shopping-cart";
        case "blog": return "pen";
        case "educação": return "book";
        default: return "globe";
    }
}

// EVENTO AO CARREGAR A PÁGINA
document.addEventListener("DOMContentLoaded", loadPlatforms);

// ABRIR O CONTAINER DE NOTAS
function openNotesContainer() {
    document.getElementById("notesContainer").classList.add("active");
}

// FECHAR O CONTAINER DE NOTAS
function closeNotesContainer() {
    document.getElementById("notesContainer").classList.remove("active");
}

// ABRIR MODAL PARA NOVA NOTA
function openNewNoteModal() {
    document.getElementById("newNoteModal").style.display = "flex";
}

// FECHAR MODAL PARA NOVA NOTA
function closeNewNoteModal() {
    document.getElementById("newNoteModal").style.display = "none";
}

// SALVAR NOVA NOTA
function saveNote() {
    const noteTitle = document.getElementById("noteTitle").value.trim();
    if (!noteTitle) {
        alert("Digite um nome para a nota!");
        return;
    }

    const notes = JSON.parse(localStorage.getItem("notes")) || [];
    const note = { id: Date.now(), title: noteTitle, content: "" };
    notes.push(note);
    localStorage.setItem("notes", JSON.stringify(notes));

    renderNotes();
    closeNewNoteModal();
}

// RENDERIZAR NOTAS
function renderNotes() {
    const notesList = document.getElementById("notesList");
    notesList.innerHTML = "";
    const notes = JSON.parse(localStorage.getItem("notes")) || [];

    notes.forEach((note) => {
        const noteCard = document.createElement("div");
        noteCard.classList.add("note-card");

        noteCard.innerHTML = `
            <h3>${note.title}</h3>
            <div class="note-actions">
                <button class="open-note" onclick="openNoteEditor(${note.id})"><i class="fas fa-arrow-right"></i></button>
                <button class="delete-note" onclick="deleteNote(${note.id})"><i class="fas fa-trash"></i></button>
            </div>
        `;

        notesList.appendChild(noteCard);
    });
}

// ABRIR EDITOR DE NOTAS
function openNoteEditor(id) {
    const notes = JSON.parse(localStorage.getItem("notes")) || [];
    const note = notes.find((note) => note.id === id);

    if (note) {
        document.getElementById("noteTitleDisplay").innerText = note.title;
        document.getElementById("noteContent").value = note.content || "";
        document.getElementById("noteEditorContainer").classList.add("active");

        // Salvar ID da nota ativa
        document.getElementById("noteEditorContainer").setAttribute("data-note-id", id);
    }
}

// FECHAR EDITOR DE NOTAS
function closeNoteEditor() {
    document.getElementById("noteEditorContainer").classList.remove("active");
}

// SALVAR CONTEÚDO DA NOTA
function saveNoteContent() {
    const noteId = document.getElementById("noteEditorContainer").getAttribute("data-note-id");
    const content = document.getElementById("noteContent").value.trim();

    let notes = JSON.parse(localStorage.getItem("notes")) || [];
    notes = notes.map((note) => {
        if (note.id == noteId) {
            note.content = content;
        }
        return note;
    });

    localStorage.setItem("notes", JSON.stringify(notes));
    alert("Anotações salvas com sucesso!");
}

// DELETAR NOTA
function deleteNote(id) {
    if (!confirm("Tem certeza que deseja excluir esta nota?")) return;

    let notes = JSON.parse(localStorage.getItem("notes")) || [];
    notes = notes.filter((note) => note.id !== id);

    localStorage.setItem("notes", JSON.stringify(notes));
    renderNotes();

    // Se a nota aberta for excluída, fecha o editor
    const noteEditor = document.getElementById("noteEditorContainer");
    if (noteEditor.getAttribute("data-note-id") == id) {
        closeNoteEditor();
    }
}

// INICIALIZAR NOTAS
document.addEventListener("DOMContentLoaded", renderNotes);

// ABRIR A CALCULADORA
function openCalculator() {
    document.getElementById("calculatorContainer").classList.add("active");
}

// FECHAR A CALCULADORA
function closeCalculator() {
    document.getElementById("calculatorContainer").classList.remove("active");
}

// INSERIR NÚMEROS
function insertNumber(num) {
    document.getElementById("calcScreen").value += num;
}

// INSERIR OPERADOR
function insertOperator(op) {
    let screen = document.getElementById("calcScreen").value;
    if (screen !== "" && !isNaN(screen.slice(-1))) {
        document.getElementById("calcScreen").value += op;
    }
}

// LIMPAR A TELA
function clearScreen() {
    document.getElementById("calcScreen").value = "";
}

// CALCULAR RESULTADO
function calculateResult() {
    try {
        let result = eval(document.getElementById("calcScreen").value);
        document.getElementById("calcScreen").value = result;
    } catch {
        document.getElementById("calcScreen").value = "Erro";
    }
}

// RECONHECER TECLADO PARA DIGITAÇÃO NA CALCULADORA
document.addEventListener("keydown", function(event) {
    const key = event.key;
    const validNumbers = "0123456789";
    const validOperators = "+-*/.";

    if (validNumbers.includes(key)) {
        insertNumber(key);
    } else if (validOperators.includes(key)) {
        insertOperator(key);
    } else if (key === "Enter") {
        calculateResult();
    } else if (key === "Backspace") {
        let screen = document.getElementById("calcScreen").value;
        document.getElementById("calcScreen").value = screen.slice(0, -1);
    } else if (key === "Escape") {
        closeCalculator();
    }
});

// ABRIR MODAL DE NOVA TAREFA
function openTaskModal() {
    document.getElementById("taskModal").style.display = "flex";
}

// FECHAR MODAL DE NOVA TAREFA
function closeTaskModal() {
    document.getElementById("taskModal").style.display = "none";
}

// ABRIR MODAL DE TAREFAS CONCLUÍDAS
function openCompletedTasksModal() {
    document.getElementById("completedTasksModal").style.display = "flex";
    renderCompletedTasks(); // Atualiza a lista de tarefas concluídas
}

// FECHAR MODAL DE TAREFAS CONCLUÍDAS
function closeCompletedTasksModal() {
    document.getElementById("completedTasksModal").style.display = "none";
}

// SALVAR NOVA TAREFA
function saveTask() {
    const name = document.getElementById("taskName").value.trim();
    const description = document.getElementById("taskDescription").value.trim();
    const dueDate = document.getElementById("taskDueDate").value;
    const category = document.getElementById("taskCategory").value;

    if (!name || !description || !dueDate) {
        alert("Por favor, preencha todos os campos!");
        return;
    }

    const task = {
        id: Date.now(),
        name,
        description,
        dueDate,
        category,
        completed: false
    };

    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    renderTasks(); // Atualiza a lista de tarefas
    closeTaskModal();
}

// RENDERIZAR TAREFAS
function renderTasks() {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = ""; // Limpa a lista antes de renderizar

    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    tasks
        .filter((task) => !task.completed) // Mostra apenas tarefas não concluídas
        .forEach((task) => {
            const taskCard = document.createElement("div");
            taskCard.classList.add("task-card", task.category);

            taskCard.innerHTML = `
                <h3>${task.name}</h3>
                <p>${task.description}</p>
                <p><strong>Data:</strong> ${task.dueDate}</p>
                <div class="task-actions">
                    <button class="edit-task" onclick="editTask(${task.id})">
                        <i class="fas fa-pencil-alt"></i>
                    </button>
                    <button class="complete-task" onclick="completeTask(${task.id})">
                        Concluir
                    </button>
                    <button class="delete-task" onclick="deleteTask(${task.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `;

            taskList.appendChild(taskCard);
        });
}

// RENDERIZAR TAREFAS CONCLUÍDAS
function renderCompletedTasks() {
    const completedTaskList = document.getElementById("completedTaskList");
    completedTaskList.innerHTML = ""; // Limpa a lista antes de renderizar

    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    tasks
        .filter((task) => task.completed) // Mostra apenas tarefas concluídas
        .forEach((task) => {
            const completedCard = document.createElement("div");
            completedCard.classList.add("task-card", task.category);

            completedCard.innerHTML = `
                <h3>${task.name}</h3>
                <p>${task.description}</p>
                <p><strong>Data:</strong> ${task.dueDate}</p>
            `;

            completedTaskList.appendChild(completedCard);
        });
}

// COMPLETAR TAREFA
function completeTask(id) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.map((task) => {
        if (task.id === id) {
            task.completed = true;
        }
        return task;
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks();
}

// DELETAR TAREFA
function deleteTask(id) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.filter((task) => task.id !== id);

    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks();
}

// EDITAR TAREFA
function editTask(id) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const task = tasks.find((task) => task.id === id);

    if (task) {
        document.getElementById("taskName").value = task.name;
        document.getElementById("taskDescription").value = task.description;
        document.getElementById("taskDueDate").value = task.dueDate;
        document.getElementById("taskCategory").value = task.category;

        deleteTask(id); // Remove a tarefa para ser recriada ao salvar
        openTaskModal();
    }
}

// INICIAR TAREFAS AO CARREGAR A PÁGINA
document.addEventListener("DOMContentLoaded", renderTasks);

// ABRIR CONTAINER DA IA
function openAIContainer() {
    document.getElementById("aiContainer").style.display = "flex";
}

// FECHAR CONTAINER DA IA
function closeAIContainer() {
    document.getElementById("aiContainer").style.display = "none";
}

// ABRIR MODAL PARA CRIAR CHAT
function openAIChatModal() {
    document.getElementById("aiChatModal").style.display = "flex";
}

// FECHAR MODAL DE CRIAR CHAT
function closeAIChatModal() {
    document.getElementById("aiChatModal").style.display = "none";
}

// SALVAR NOVO CHAT
function saveAIChat() {
    const chatName = document.getElementById("aiChatName").value.trim();

    if (!chatName) {
        alert("Digite um nome para o chat!");
        return;
    }

    const chat = {
        id: Date.now(),
        name: chatName
    };

    const aiChats = JSON.parse(localStorage.getItem("aiChats")) || [];
    aiChats.push(chat);
    localStorage.setItem("aiChats", JSON.stringify(aiChats));

    renderAIChats();
    closeAIChatModal();
}

// RENDERIZAR CHATS SALVOS
function renderAIChats() {
    const aiChatList = document.getElementById("aiChatList");
    aiChatList.innerHTML = "";

    const aiChats = JSON.parse(localStorage.getItem("aiChats")) || [];

    aiChats.forEach((chat) => {
        const chatCard = document.createElement("div");
        chatCard.classList.add("ai-chat-card");

        chatCard.innerHTML = `
            <span>${chat.name}</span>
            <div class="chat-actions">
                <button class="open-chat" onclick="openChat('${chat.id}')"><i class="fas fa-arrow-right"></i></button>
                <button class="delete-chat" onclick="deleteChat(${chat.id})"><i class="fas fa-trash"></i></button>
            </div>
        `;

        aiChatList.appendChild(chatCard);
    });
}

// ABRIR CHAT
// function openChat(id) {
   // alert(`Abrindo chat ${id} (Aqui entra sua integração com a API da OpenAI)`);
// }

function openChat(id) {
    alert(`Em breve teremos essa atualização, por enquanto não está disponível essa integração!`);
}

// DELETAR CHAT
function deleteChat(id) {
    let aiChats = JSON.parse(localStorage.getItem("aiChats")) || [];
    aiChats = aiChats.filter((chat) => chat.id !== id);

    localStorage.setItem("aiChats", JSON.stringify(aiChats));
    renderAIChats();
}

// CARREGAR CHATS SALVOS AO INICIAR
document.addEventListener("DOMContentLoaded", renderAIChats);
