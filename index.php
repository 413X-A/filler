<?php
// Datenbankinformationen
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "notes_app";

// Verbindung zur Datenbank herstellen (ohne Auswahl einer Datenbank)
$conn = new mysqli($servername, $username, $password);

// Verbindung prüfen
if ($conn->connect_error) {
    die("Verbindung zur Datenbank fehlgeschlagen: " . $conn->connect_error);
}

// Erstellen der Datenbank, falls nicht vorhanden
$sql = "CREATE DATABASE IF NOT EXISTS $dbname";
if ($conn->query($sql) === TRUE) {
    echo "<p>Datenbank erfolgreich erstellt oder existiert bereits.</p>";
} else {
    die("Fehler beim Erstellen der Datenbank: " . $conn->error);
}

// Datenbank auswählen
$conn->select_db($dbname);

// Erstellen der Tabelle, falls nicht vorhanden
$sql = "
CREATE TABLE IF NOT EXISTS notes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    note TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)";
if ($conn->query($sql) === TRUE) {
    echo "<p>Tabelle 'notes' erfolgreich erstellt oder existiert bereits.</p>";
} else {
    die("Fehler beim Erstellen der Tabelle: " . $conn->error);
}

// Neue Notiz speichern, wenn das Formular abgeschickt wurde
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST["note"])) {
    $note = $conn->real_escape_string($_POST["note"]);
    $sql = "INSERT INTO notes (note) VALUES ('$note')";

    if ($conn->query($sql) === TRUE) {
        echo "<p>Notiz erfolgreich hinzugefügt!</p>";
    } else {
        echo "<p>Fehler beim Hinzufügen der Notiz: " . $conn->error . "</p>";
    }
}

// Alle Notizen abrufen
$sql = "SELECT id, note, created_at FROM notes ORDER BY created_at DESC";
$result = $conn->query($sql);
?>

<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <title>PHP Notizen App</title>
    <style>
        body { font-family: Arial, sans-serif; }
        .note { margin-bottom: 10px; }
        .note time { font-size: 0.8em; color: gray; }
    </style>
</head>
<body>
    <h1>Meine Notizen</h1>
    
    <!-- Formular zum Hinzufügen einer neuen Notiz -->
    <form method="post" action="">
        <input type="text" name="note" placeholder="Neue Notiz eingeben..." required>
        <button type="submit">Notiz hinzufügen</button>
    </form>

    <h2>Gespeicherte Notizen:</h2>
    <div id="notes">
        <?php
        // Notizen anzeigen, falls vorhanden
        if ($result->num_rows > 0) {
            while($row = $result->fetch_assoc()) {
                echo "<div class='note'>";
                echo "<p>" . htmlspecialchars($row["note"]) . "</p>";
                echo "<time>Erstellt am: " . $row["created_at"] . "</time>";
                echo "</div>";
            }
        } else {
            echo "<p>Noch keine Notizen vorhanden.</p>";
        }
        ?>
    </div>

    <?php
    // Datenbankverbindung schließen
    $conn->close();
    ?>
</body>
</html>
