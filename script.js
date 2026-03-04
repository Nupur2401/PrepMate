function selectSubject(subject) {
  alert("You selected " + subject);

  // Hide subject selection, show chapter selection
  document.querySelector("main").style.display = "none";
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
  populateExercises(chapter);

  // Populate subsections
  populateSubsections(chapter);
}

function populateExercises(chapter) {
  const exerciseDropdown = document.getElementById("exerciseDropdown");
  exerciseDropdown.innerHTML = '<option value="">-- Choose an Exercise --</option>';

  let exercises = [];
  if (chapter === "Real Numbers" || chapter === "Chemical Reactions") {
    exercises = ["Exercise 1.1", "Exercise 1.2"];
  }

  exercises.forEach(exercise => {
    const option = document.createElement("option");
    option.value = exercise;
    option.textContent = exercise;
    exerciseDropdown.appendChild(option);
  });
}

function populateSubsections(chapter) {
  const subsectionDropdown = document.getElementById("subsectionDropdown");
  subsectionDropdown.innerHTML = '<option value="">-- Choose a Subsection --</option>';

  let subsections = [];
  if (chapter === "Real Numbers") {
    subsections = ["Introduction", "Euclid’s Division Lemma", "Fundamental Theorem of Arithmetic", "Applications"];
  } else if (chapter === "Chemical Reactions") {
    subsections = ["Introduction", "Types of Reactions", "Balancing Equations", "Applications"];
  }

  subsections.forEach(subsection => {
    const option = document.createElement("option");
    option.value = subsection;
    option.textContent = subsection;
    subsectionDropdown.appendChild(option);
  });
}
