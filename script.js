function selectSubject(subject) {
  alert("You selected " + subject);

  // Hide subject selection, show chapter selection
  document.querySelector("main").style.display = "none";
  document.getElementById("chapter-selection").style.display = "block";

  // Populate chapters (static for now)
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
  // Inside goToStudyMode()
  const exerciseDropdown = document.getElementById("exerciseDropdown");
  exerciseDropdown.innerHTML = '<option value="">-- Choose an Exercise --</option>';

  let exercises = [];
  if (chapter === "Real Numbers") {
    exercises = ["Exercise 1.1", "Exercise 1.2"];
  } else if (chapter === "Chemical Reactions") {
    exercises = ["Exercise 1.1", "Exercise 1.2"];
  }  

  exercises.forEach(exercise => {
    const option = document.createElement("option");
    option.value = exercise;
    option.textContent = exercise;
    exerciseDropdown.appendChild(option);
  });

    // Hide Chapter Selection, show Study Mode
    document.getElementById("chapter-selection").style.display = "none";
    document.getElementById("study-mode").style.display = "block";

    // Populate subsections (static for now, later via ChatGPT API)
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

function loadNotes() {
  const subsection = document.getElementById("subsectionDropdown").value;
  if (!subsection) {
    alert("Please select a subsection first!");
    return;
  }
  document.getElementById("notesContent").innerHTML =
    "<h4>" + subsection + "</h4><p>Notes for " + subsection + " will appear here.</p>";
}

function moreExplanation() {
  const subsection = document.getElementById("subsectionDropdown").value;
  if (!subsection) {
    alert("Please select a subsection first!");
    return;
  }
  document.getElementById("notesContent").innerHTML +=
    "<p><em>More explanation for " + subsection + " coming soon...</em></p>";
}

function watchVideo() {
  const subsection = document.getElementById("subsectionDropdown").value;
  if (!subsection) {
    alert("Please select a subsection first!");
    return;
  }
  document.getElementById("notesContent").innerHTML +=
    "<p><a href='#'>Suggested video for " + subsection + " (placeholder)</a></p>";
}

function loadExerciseQuestions() {
  const exercise = document.getElementById("exerciseDropdown").value;
  if (!exercise) {
    alert("Please select an exercise first!");
    return;
  }

  // Placeholder questions (later replaced by ChatGPT API)
  let questions = [];
  if (exercise === "Exercise 1.1") {
    questions = [
      "Q1: Find the HCF of 12 and 18.",
      "Q2: Use Euclid’s Division Lemma to show that 9 divides 36."
    ];
  } else if (exercise === "Exercise 1.2") {
    questions = [
      "Q1: Find the LCM of 15 and 20.",
      "Q2: Prove that √2 is irrational."
    ];
  }

  const contentDiv = document.getElementById("exerciseContent");
  contentDiv.innerHTML = "";
  questions.forEach((q, index) => {
    contentDiv.innerHTML += `
      <p>${q}</p>
      <button onclick="showAnswer(${index})">Show Answer</button>
      <button onclick="viewSolution(${index})">View Full Solution</button>
      <div id="answer-${index}" style="margin-left:20px; color:blue;"></div>
    `;
  });
}

function showAnswer(index) {
  document.getElementById("answer-" + index).innerHTML = "Answer: (placeholder)";
}

function viewSolution(index) {
  document.getElementById("answer-" + index).innerHTML = "Step-by-step solution (placeholder)";
}


function goToTestMode() {
  const chapter = document.getElementById("chapterDropdown").value;
  if (!chapter) {
    alert("Please select a chapter first!");
    return;
  }
  alert("Test Mode for " + chapter + " coming soon!");
}







