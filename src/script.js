/*----- Funktion für die Empfehlungen auf der Startseite -----*/
const recommendations = document.querySelectorAll('.recommendation');
const dots = document.querySelectorAll('.dot');
let currentIndex = 0;
const total = recommendations.length;

// Funktion zum Anzeigen der aktuellen Empfehlung
function showRecommendation(index) {
    // Empfehlung aktualisieren
    recommendations.forEach((rec, i) => {
        rec.classList.remove('active');
        if (i === index) {
            rec.classList.add('active');
        }
    });

    // Dots aktualisieren
    dots.forEach((dot, i) => {
        dot.classList.remove('active');
        if (i === index) {
            dot.classList.add('active');
        }
    });
}

// Nächste Empfehlung anzeigen
function nextRecommendation() {
    currentIndex = (currentIndex + 1) % total;
    showRecommendation(currentIndex);
}

// Vorherige Empfehlung anzeigen
function prevRecommendation() {
    currentIndex = (currentIndex - 1 + total) % total;
    showRecommendation(currentIndex);
}

// Auto-Rotation alle 10 Sekunden
let autoRotate = setInterval(nextRecommendation, 10000);

// Funktion, um die Rotation neu zu starten, nachdem ein Button geklickt wurde
function resetAutoRotate() {
    clearInterval(autoRotate); // Bestehendes Intervall löschen
    autoRotate = setInterval(nextRecommendation, 5000); // Neues Intervall starten
}

// Navigation durch Buttons
document.getElementById('nextBtn').addEventListener('click', () => {
    nextRecommendation();
    resetAutoRotate(); // Intervall neu starten, wenn geklickt wurde
});

document.getElementById('prevBtn').addEventListener('click', () => {
    prevRecommendation();
    resetAutoRotate(); // Intervall neu starten, wenn geklickt wurde
});

// Wenn der Benutzer auf einen Dot klickt
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentIndex = index; // Setze den Index auf den Dot, der angeklickt wurde
        showRecommendation(currentIndex);
        resetAutoRotate(); // Intervall neu starten0
    });
});


/*----- Funktion zum Ändern der Sprache -----*/

// Funktion zur Sprachumschaltung
function switchLanguage(loadingNewPage) {
    let selectedLang;

    if (loadingNewPage) {
        selectedLang = localStorage.getItem("selectedLanguage") || document.getElementById("language-switch").value;
    } else {
        selectedLang = document.getElementById("language-switch").value;
    }

    localStorage.setItem("selectedLanguage", selectedLang); // Sprache im LocalStorage speichern

    // Aktuelle URL und Dateiname abrufen
    let currentUrl = window.location.href;

    if (!currentUrl.includes(".html")) {
        currentUrl += "index.html";
    }

    const fileName = currentUrl.substring(currentUrl.lastIndexOf('/') + 1);

    // URL zur gewünschten Sprache umschalten
    let newFileName;
    if (selectedLang === "en") {
        newFileName = fileName.includes("_en") ? fileName : fileName.replace(".html", "_en.html");
    } else {
        newFileName = fileName.includes("_en") ? fileName.replace("_en.html", ".html") : fileName;
    }

    // Seite neu laden mit der gewählten Sprache
    window.location.href = currentUrl.replace(fileName, newFileName);
}

// Sprache beim Laden der Seite setzen
window.addEventListener("DOMContentLoaded", () => {
    switchLanguage(true);
});