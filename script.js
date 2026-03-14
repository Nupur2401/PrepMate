function toggleMenu() {
  const menu = document.getElementById("menu");
  menu.style.display = menu.style.display === "none" ? "block" : "none";
}

function goHome() {
  document.getElementById("subject-selection").style.display = "block";
  document.getElementById("chapter-selection").style.display = "none";
  document.getElementById("messageBox").textContent = "Welcome back to Home!";
}

function selectSubject(subject) {
  // Hide Screen 1, show Screen 2
  document.getElementById("subject-selection").style.display = "none";
  document.getElementById("chapter-selection").style.display = "block";

  // Call backend to get chapters
  loadChapters(subject);
}

async function loadChapters(subject) {
  try {
    document.getElementById("chapterInfo").textContent = "Fetching chapters…";

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=YOUR_API_KEY",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                { text: `List CBSE Class 10 ${subject} chapters` }
              ]
            }
          ]
        })
      }
    );

    const data = await response.json();
    console.log("Gemini raw response:", data);

    // Extract text
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "";
    const chapters = text.split("\n").map(c => c.trim()).filter(Boolean);

    if (chapters.length > 0) {
      populateDropdown(chapters);
      document.getElementById("chapterInfo").textContent = "";
    } else {
      document.getElementById("chapterInfo").textContent =
        "No chapters returned from Gemini.";
    }
  } catch (error) {
    console.error("Frontend error:", error);
    document.getElementById("chapterInfo").textContent =
      "Error fetching chapters.";
  }
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
