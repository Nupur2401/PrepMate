function selectSubject(subject) {
  alert("You selected " + subject);

  // Hide subject selection, show chapter selection
  document.getElementById("subject-selection").style.display = "none";
  document.getElementById("chapter-selection").style.display = "block";

  // Populate chapters
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
