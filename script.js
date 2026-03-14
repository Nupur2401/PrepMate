// Toggle menu
function toggleMenu() {
  const menu = document.getElementById("menu");
  menu.style.display = menu.style.display === "none" ? "block" : "none";
}

// Go back to home
function goHome() {
  document.getElementById("subject-selection").style.display = "block";
  document.getElementById("chapter-selection").style.display = "none";
}

// Handle subject selection
function selectSubject(subject) {
  console.log("Subject selected:", subject); // Debug log

  // Hide subject screen, show chapter screen
  document.getElementById("subject-selection").style.display = "none";
  document.getElementById("chapter-selection").style.display = "block";

  // Load chapters for the chosen subject
  loadChapters(subject);
}

// Fetch chapters from backend
async function loadChapters(subject) {
  try {
    const response = await fetch("http://localhost:3000/gemini", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        prompt: `List CBSE Class 10 ${subject} chapters`
      })
    });

    const data = await response.json();
    console.log("Gemini response:", data); // Debug log

    if (data.chapters) {
      populateDropdown(data.chapters);
    } else {
      console.error("No chapters returned:", data);
    }
  } catch (error) {
    console.error("Frontend error:", error);
  }
}

// Populate dropdown with chapters
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

// Placeholder functions for later
function fetchChapterInfo() {
  const chapter = document.getElementById("chapterDropdown").value;
  document.getElementById("chapterInfo").textContent =
    chapter ? `You selected: ${chapter}` : "";
}

function goToStudyMode() {
  alert("Study mode coming soon!");
}

function goToTestMode() {
  alert("Test mode coming soon!");
}
