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


