function selectSubject(subject) {
  alert("You selected " + subject);

  document.getElementById("subject-selection").style.display = "none";
  document.getElementById("chapter-selection").style.display = "block";

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

  document.getElementById("chapter-selection").style.display = "none";
  document.getElementById("study-mode").style.display = "block";

  // Populate subsections for Notes and Unit Test
  const subsectionDropdown = document.getElementById("subsectionDropdown");
  const unitTestDropdown = document.getElementById("unitTestDropdown");

  subsectionDropdown.innerHTML = '<option value="">-- Choose a Subsection --</option>';
  unitTestDropdown.innerHTML = '<option value="">-- Choose a Subsection --</option>';

  let subsections = ["Introduction", "Key Concepts", "Examples"];
  subsections.forEach(subsection => {
    const option1 = document.createElement("option");
    option1.value = subsection;
    option1.textContent = subsection;
    subsectionDropdown.appendChild(option1);

    const option2 = document.createElement("option");
    option2.value = subsection;
    option2.textContent = subsection;
    unitTestDropdown.appendChild(option2);
  });

  // Populate exercises
  const exerciseDropdown = document.getElementById("exerciseDropdown");
  exerciseDropdown.innerHTML = '<option value="">-- Choose an Exercise --</option>';
  ["Exercise 1.1", "Exercise 1.2"].forEach(exercise => {
    const option = document.createElement("option");
    option.value = exercise;
    option.textContent = exercise;
    exerciseDropdown.appendChild(option);
  });
}

// ✅ Unit Test functions moved OUTSIDE goToStudyMode
function loadUnitTest() {
  const subsection = document.getElementById("unitTestDropdown").value;
  if (!subsection) {
    alert("Please select a subsection first!");
    return;
  }

  const unitTestContent = document.getElementById("unitTestContent");
  unitTestContent.innerHTML = "";

  let questions = [];
  if (subsection === "Introduction") {
    questions = [
      { q: "Q1: What is a prime number?", options: ["Divisible by 1 only", "Divisible by 1 and itself", "Divisible by 2 only", "None"], answer: "Divisible by 1 and itself" }
    ];
  } else if (subsection === "Key Concepts") {
    questions = [
      { q: "Q1: Which property is true for HCF?", options: ["Always greater than LCM", "Always divides both numbers", "Always prime", "None"], answer: "Always divides both numbers" }
    ];
  } else {
    questions = [
      { q: `Q1: Sample unit test for ${subsection}`, options: ["Option A", "Option B", "Option C", "Option D"], answer: "Option A" }
    ];
  }

  questions.forEach((item, index) => {
    let html = `<p>${item.q}</p>`;
    item.options.forEach(opt => {
      html += `
        <label>
          <input type="radio" name="unitQ${index}" value="${opt}"> ${opt}
        </label>`;
    });
    unitTestContent.innerHTML += html;
  });

  window.currentUnitTest = questions;
}

function submitUnitTest() {
  const questions = window.currentUnitTest || [];
  let score = 0;

  questions.forEach((item, index) => {
    const selected = document.querySelector(`input[name="unitQ${index}"]:checked`);
    if (selected && selected.value === item.answer) {
      score++;
    }
  });

  document.getElementById("unitTestResult").innerText =
    `You scored ${score} out of ${questions.length}`;
}
