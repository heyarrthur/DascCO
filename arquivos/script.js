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


// SELECIONAR ELEMENTOS
const fileUpload = document.getElementById("fileUpload");
const fileList = document.getElementById("fileList");

// CARREGAR ARQUIVOS SALVOS AO INICIAR
document.addEventListener("DOMContentLoaded", loadFiles);

// UPLOAD DE ARQUIVO
fileUpload.addEventListener("change", function (event) {
    const file = event.target.files[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const fileData = {
                name: file.name,
                data: e.target.result,
                size: file.size,
                date: new Date().toLocaleString()
            };

            const files = JSON.parse(localStorage.getItem("savedFiles")) || [];
            files.push(fileData);
            localStorage.setItem("savedFiles", JSON.stringify(files));

            loadFiles();
        };
        reader.readAsDataURL(file);
    }
});

// CARREGAR LISTA DE ARQUIVOS
function loadFiles() {
    fileList.innerHTML = "";
    const files = JSON.parse(localStorage.getItem("savedFiles")) || [];

    files.forEach((file, index) => {
        const fileItem = document.createElement("div");
        fileItem.classList.add("file-item");

        fileItem.innerHTML = `
            <span>${file.name} (${(file.size / 1024).toFixed(2)} KB)</span>
            <div class="file-actions">
                <button class="download-btn" onclick="downloadFile(${index})">
                    <i class="fas fa-download"></i>
                </button>
                <button class="delete-btn" onclick="deleteFile(${index})">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;

        fileList.appendChild(fileItem);
    });
}

// FAZER DOWNLOAD DO ARQUIVO
function downloadFile(index) {
    const files = JSON.parse(localStorage.getItem("savedFiles")) || [];
    const file = files[index];

    const link = document.createElement("a");
    link.href = file.data;
    link.download = file.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// EXCLUIR ARQUIVO
function deleteFile(index) {
    let files = JSON.parse(localStorage.getItem("savedFiles")) || [];
    files.splice(index, 1);
    localStorage.setItem("savedFiles", JSON.stringify(files));

    loadFiles();
}
