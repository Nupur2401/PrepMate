function showTab(tabId) {
  const tabs = document.querySelectorAll(".tab-content");
  tabs.forEach(tab => tab.style.display = "none");

  document.getElementById(tabId).style.display = "block";

  const buttons = document.querySelectorAll(".tab-button");
  buttons.forEach(btn => btn.classList.remove("active"));

  const activeBtn = Array.from(buttons).find(btn => btn.textContent.toLowerCase() === tabId);
  if (activeBtn) activeBtn.classList.add("active");
}

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
