// musicHandler.js
function handleMusicForUser() {
    const currentUser = localStorage.getItem('currentUsername');
    const savedSong = localStorage.getItem(`${currentUser}_selectedSong`); // Hole die gespeicherte Musik für den aktuellen Benutzer
    const savedTimestamp = localStorage.getItem(`${currentUser}_musicTimestamp`); // Hole den gespeicherten Zeitstempel

    const musicSelect = document.getElementById("musicSelect");
    if (savedSong) {
        musicSelect.value = savedSong; // Setze die Auswahl im Dropdown
        const musicPlayer = document.getElementById("musicPlayer");
        musicPlayer.src = savedSong; // Setze die Quelle des Players
        musicPlayer.play(); // Spiele die Musik ab

    }
}
