// Toggle menu visibility
function toggleMenu() {
  const menu = document.getElementById("menu");
  if (menu.style.display === "none" || menu.style.display === "") {
    menu.style.display = "block";
  } else {
    menu.style.display = "none";
  }
}

// Go back to Screen 1 (Home)
function goHome() {
  // Show subject selection
  document.getElementById("subject-selection").style.display = "block";

  // Hide other screens if they exist later
  const chapterSelection = document.getElementById("chapter-selection");
  const studyMode = document.getElementById("study-mode");
  const testMode = document.getElementById("test-mode");

  if (chapterSelection) chapterSelection.style.display = "none";
  if (studyMode) studyMode.style.display = "none";
  if (testMode) testMode.style.display = "none";

  // Close menu
  toggleMenu();
}

// Screen 1 - Home Screen
function selectSubject(subject) {
  alert("You selected " + subject);

  // Hide subject selection, show chapter selection
  document.getElementById("subject-selection").style.display = "none";
  document.getElementById("chapter-selection").style.display = "block";

  // Screen2 - Populate chapters
  const chapterDropdown = document.getElementById("chapterDropdown");
  chapterDropdown.innerHTML = '<option value="">-- Choose a Chapter --</option>';

  let chapters = [];
  if (subject === "Maths") {
    chapters = ["Real Numbers", "Polynomials", "Pair of Linear Equations", "Quadratic Equations"];
  } else if (subject === "Science") {
    chapters = ["Chemical Reactions", "Acids, Bases and Salts", "Metals and Non-Metals", "Carbon Compounds"];
  }

  chapters.forEach(chapter => {
    const option = document.createElement("option");
    option.value = chapter;
    option.textContent = chapter;
    chapterDropdown.appendChild(option);
  });
}

// 🔗 Integration with Copilot
function fetchChapterInfo() {
  const chapter = document.getElementById("chapterDropdown").value;
  const infoBox = document.getElementById("chapterInfo");

  if (!chapter) {
    infoBox.innerHTML = "";
    return;
  }

  // For now, show a placeholder while Copilot provides info
  infoBox.innerHTML = `<p>Loading information about <strong>${chapter}</strong>...</p>`;

  // Simulated integration: in a real app, this is where you'd call Copilot
  // For example, using an API endpoint that sends the chapter name to Copilot
  // and displays the response dynamically.
  setTimeout(() => {
    infoBox.innerHTML = `<h3>${chapter}</h3>
      <p>This chapter covers key concepts and examples. Copilot can provide notes, explanations, and practice questions here.</p>`;
  }, 1000);


function goToStudyMode() {
  const chapter = document.getElementById("chapterDropdown").value;
  if (!chapter) {
    alert("Please select a chapter first!");
    return;
  }
  alert("Study Mode for " + chapter + " coming soon!");
}

function goToTestMode() {
  const chapter = document.getElementById("chapterDropdown").value;
  if (!chapter) {
    alert("Please select a chapter first!");
    return;
  }
  alert("Test Mode for " + chapter + " coming soon!");
}



