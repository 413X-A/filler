// musicHandler.js
function handleMusicForUser() {
    const currentUser = localStorage.getItem('currentUsername');
    const savedMusic = localStorage.getItem(`musicChoice_${currentUser}`);
    const musicPlayer = document.getElementById('musicPlayer');

    if (savedMusic) {
        musicPlayer.src = savedMusic;
        musicPlayer.loop = true; // Musik in einer Schleife abspielen
        musicPlayer.play();
    } else {
        musicPlayer.pause(); // Musik anhalten, wenn keine Auswahl vorhanden ist
    }
}
