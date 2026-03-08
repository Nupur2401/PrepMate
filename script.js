function selectSubject(subject) {
  alert("You selected " + subject);
}

// Toggle menu visibility
function toggleMenu() {
  const menu = document.getElementById("menu");
  menu.style.display = (menu.style.display === "none" || menu.style.display === "") ? "block" : "none";
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
