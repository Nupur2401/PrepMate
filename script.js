function goToStudyMode() {
  const chapter = document.getElementById("chapterDropdown").value;
  if (!chapter) {
    alert("Please select a chapter first!");
    return;
  }

  // Hide Chapter Selection, show Study Mode
  document.getElementById("chapter-selection").style.display = "none";
  document.getElementById("study-mode").style.display = "block";

  // Populate exercises (generic for now)
  const exerciseDropdown = document.getElementById("exerciseDropdown");
  exerciseDropdown.innerHTML = '<option value="">-- Choose an Exercise --</option>';

  // For now, give every chapter two sample exercises
  let exercises = ["Exercise 1.1", "Exercise 1.2"];

  exercises.forEach(exercise => {
    const option = document.createElement("option");
    option.value = exercise;
    option.textContent = exercise;
    exerciseDropdown.appendChild(option);
  });

  // Populate subsections (example for Maths/Science)
  const subsectionDropdown = document.getElementById("subsectionDropdown");
  subsectionDropdown.innerHTML = '<option value="">-- Choose a Subsection --</option>';

  let subsections = [];
  if (chapter === "Real Numbers") {
    subsections = ["Introduction", "Euclid’s Division Lemma", "Fundamental Theorem of Arithmetic", "Applications"];
  } else if (chapter === "Chemical Reactions") {
    subsections = ["Introduction", "Types of Reactions", "Balancing Equations", "Applications"];
  } else {
    subsections = ["Overview", "Key Concepts", "Examples"]; // fallback for other chapters
  }

  subsections.forEach(subsection => {
    const option = document.createElement("option");
    option.value = subsection;
    option.textContent = subsection;
    subsectionDropdown.appendChild(option);
  });
}
