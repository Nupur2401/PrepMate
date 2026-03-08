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

// Tab switching
function showStudyTab(tabId) {
  const tabs = document.querySelectorAll(".study-tab");
  tabs.forEach(tab => tab.style.display = "none");

  document.getElementById(tabId).style.display = "block";

  const buttons = document.querySelectorAll(".tab-button");
  buttons.forEach(btn => btn.classList.remove("active"));

  const activeBtn = Array.from(buttons).find(btn => btn.getAttribute("onclick").includes(tabId));
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
    `<p><a href="#">Suggested video for ${subsection} (placeholder)</a></p>`;
}

// Exercise functions
function loadExerciseQuestions() {
  const exercise = document.getElementById("exerciseDropdown").value;
  if (!exercise) {
    alert("Please select an exercise first!");
    return;
  }

  let questions = [];
  if (exercise === "Exercise 1.1") {
    questions = [
      "Q1: Find the HCF of 12 and 18.",
      "Q2: Use Euclid’s Division Lemma to show that 9 divides 36."
    ];
  } else {
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

  // Hide Chapter Selection, show Test Mode
  document.getElementById("chapter-selection").style.display = "none";
  document.getElementById("test-mode").style.display = "block";

  // Load sample questions
  const testContent = document.getElementById("testContent");
  testContent.innerHTML = "";

  let questions = [];
  if (chapter === "Real Numbers") {
    questions = [
      {
        q: "Q1: Which of the following is a prime number?",
        options: ["4", "9", "11", "15"],
        answer: "11"
      },
      {
        q: "Q2: HCF of 12 and 18 is?",
        options: ["2", "3", "6", "9"],
        answer: "6"
      }
    ];
  } else if (chapter === "Chemical Reactions") {
    questions = [
      {
        q: "Q1: Which reaction produces a precipitate?",
        options: ["Combination", "Double Displacement", "Decomposition", "Neutralization"],
        answer: "Double Displacement"
      },
      {
        q: "Q2: Which gas is released in a reaction of acid with metal?",
        options: ["Oxygen", "Hydrogen", "Carbon dioxide", "Nitrogen"],
        answer: "Hydrogen"
      }
    ];
  } else {
    questions = [
      {
        q: "Q1: Sample question for " + chapter,
        options: ["Option A", "Option B", "Option C", "Option D"],
        answer: "Option A"
      }
    ];
  }

  // Render questions
  questions.forEach((item, index) => {
    let html = `<p>${item.q}</p>`;
    item.options.forEach(opt => {
      html += `
        <label>
          <input type="radio" name="q${index}" value="${opt}"> ${opt}
        </label>`;
    });
    testContent.innerHTML += html;
  });

  // Save questions for evaluation
  window.currentTest = questions;
}

function submitTest() {
  const questions = window.currentTest || [];
  let score = 0;

  questions.forEach((item, index) => {
    const selected = document.querySelector(`input[name="q${index}"]:checked`);
    if (selected && selected.value === item.answer) {
      score++;
    }
  });

  document.getElementById("testResult").innerText =
    `You scored ${score} out of ${questions.length}`;
}

