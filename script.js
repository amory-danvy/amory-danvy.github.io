document.addEventListener("DOMContentLoaded", () => {
    const changePhotoButton = document.getElementById("change-photo");
    const uploadPhotoInput = document.getElementById("upload-photo");
    const profilePic = document.getElementById("profile-pic");

    // Ouvre la fenêtre de sélection de fichier quand on clique sur "Changer de photo"
    changePhotoButton.addEventListener("click", () => {
        uploadPhotoInput.click();
    });

    // Change l'image de profil après le téléchargement
    uploadPhotoInput.addEventListener("change", (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                profilePic.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    });
});
