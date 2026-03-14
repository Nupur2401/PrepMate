function toggleMenu() {
  const menu = document.getElementById("menu");
  menu.style.display = menu.style.display === "none" ? "block" : "none";
}

function goHome() {
  alert("Returning to Home Screen");
}

function selectSubject(subject) {
  // Hide Screen 1, show Screen 2
  document.getElementById("subject-selection").style.display = "none";
  document.getElementById("chapter-selection").style.display = "block";

  // Show default chapters for now
  let chapters = [];
  if (subject === "Maths") {
    chapters = ["Real Numbers", "Polynomials", "Pair of Linear Equations", "Triangles"];
  } else if (subject === "Science") {
    chapters = ["Chemical Reactions", "Acids Bases Salts", "Metals and Non-Metals", "Life Processes"];
  }

  populateDropdown(chapters);
}

function populateDropdown(chapters) {
  const dropdown = document.getElementById("chapterDropdown");
  dropdown.innerHTML = '<option value="">-- Choose a Chapter --</option>';

  chapters.forEach(chapter => {
    const option = document.createElement("option");
    option.value = chapter;
    option.textContent = chapter;
    dropdown.appendChild(option);
  });
}

function fetchChapterInfo() {
  const chapter = document.getElementById("chapterDropdown").value;
  document.getElementById("chapterInfo").textContent =
    chapter ? `You selected: ${chapter}` : "";
}
