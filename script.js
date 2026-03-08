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

  // Hide Chapter Selection, show Study Mode
  document.getElementById("chapter-selection").style.display = "none";
  document.getElementById("study-mode").style.display = "block";

  // Populate exercises
  const exerciseDropdown = document.getElementById("exerciseDropdown");
  exerciseDropdown.innerHTML = '<option value="">-- Choose an Exercise --</option>';
  let exercises = ["Exercise 1.1", "Exercise 1.2"];
  exercises.forEach(exercise => {
    const option = document.createElement("option");
    option.value = exercise;
    option.textContent = exercise;
    exerciseDropdown.appendChild(option);
  });

  // Populate subsections
  const subsectionDropdown = document.getElementById("subsectionDropdown");
  subsectionDropdown.innerHTML = '<option value="">-- Choose a Subsection --</option>';
  let subsections = ["Introduction", "Key Concepts", "Examples"];
  subsections.forEach(subsection => {
    const option = document.createElement("option");
    option.value = subsection;
    option.textContent = subsection;
    subsectionDropdown.appendChild(option);
  });
}

function goToTestMode() {
  const chapter = document.getElementById("chapterDropdown").value;
  if (!chapter) {
    alert("Please select a chapter first!");
    return;
  }
  alert("Test Mode for " + chapter + " coming soon!");
}

// Tab switching
function showStudyTab(tabId) {
  const tabs = document.querySelectorAll(".study-tab");
  tabs.forEach(tab => tab.style.display = "none");

  document.getElementById(tabId).style.display = "block";

  const buttons = document.querySelectorAll(".tab-button");
  buttons.forEach(btn => btn.classList.remove("active"));

  const activeBtn = Array.from(buttons).find(btn => tabId.includes(btn.textContent.toLowerCase()));
  if (activeBtn) activeBtn.classList.add("active");
}

// Notes functions
function loadNotes() {
  const subsection = document.getElementById("subsectionDropdown").value;
  if (!subsection) {
    alert("Please select a subsection first!");
    return;
  }
  document.getElementById("notesContent").innerHTML =
    `<h4>${subsection}</h4><p>Notes for ${subsection} will appear here.</p>`;
}

function moreExplanation() {
  const subsection = document.getElementById("subsectionDropdown").value;
  if (!subsection) return;
  document.getElementById("notesContent").innerHTML +=
    `<p><em>More explanation for ${subsection} coming soon...</em></p>`;
}

function watchVideo() {
  const subsection = document.getElementById("subsectionDropdown").value;
  if (!subsection) return;
  document.getElementById("notesContent").innerHTML +=
    `<p><a href="#">Suggested video for ${subsection} (placeholder)</
