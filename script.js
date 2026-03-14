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

  // Call Gemini directly to get chapters
  loadChapters(subject);
}

async function loadChapters(subject) {
  try {
    document.getElementById("chapterInfo").textContent = "Fetching chapters…";

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=AIzaSyBGvHRZLRZk-7qVu25e_mGD_5EpyXBIndI",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `List all CBSE Class 10 ${subject} chapters as plain text, one per line, no extra words.`
                }
              ]
            }
          ]
        })
      }
    );

    const data = await response.json();
    console.log("Gemini raw response:", data);

    if (!response.ok) {
      document.getElementById("chapterInfo").textContent =
        "Gemini error: " + (data.error?.message || "Unknown error");
      return;
    }

    // Extract text safely
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "";
    console.log("Extracted text:", text);

    // Clean up formatting: remove numbering, **bold**, and intro lines
    const chapters = text
      .split("\n")
      .map(c =>
        c
          .replace(/^\d+[\.\)]\s*/, "") // remove numbering like "1." or "2)"
          .replace(/\*\*/g, "")         // remove **bold markers**
          .trim()
      )
      .filter(Boolean);

    const filteredChapters = chapters.filter(
      c =>
        !c.toLowerCase().includes("chapter list") &&
        !c.toLowerCase().includes("here are")
    );

    if (filteredChapters.length > 0) {
      populateDropdown(filteredChapters);
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

  if (!chapter) {
    document.getElementById("chapterInfo").textContent = "";
    return;
  }

  // Hide Screen 2, show Screen 3
  document.getElementById("chapter-selection").style.display = "none";
  document.getElementById("chapter-details").style.display = "block";

  // Show header
  document.getElementById("chapterTitle").textContent = `Chapter: ${chapter}`;

  // Fetch details from Gemini
  loadChapterDetails(chapter);
}

function showTab(tabName) {
  // Hide all tabs
  document.querySelectorAll(".tab-content").forEach(tab => tab.style.display = "none");
  // Show selected tab
  document.getElementById(tabName + "Tab").style.display = "block";
}

// Fetch subsections for Notes tab
async function fetchSubsections(subject, chapter) {
  const response = await fetch(GEMINI_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: `List the subsections or main topics covered in CBSE Class 10 ${subject}, Chapter ${chapter}. Provide only a numbered list of subsection titles.` }] }]
    })
  });
  const data = await response.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "";
  const subsections = text.split("\n").map(s => s.replace(/^\d+[\.\)]\s*/, "").trim()).filter(Boolean);

  const dropdown = document.getElementById("subsectionDropdown");
  dropdown.innerHTML = '<option value="">-- Choose a Subsection --</option>';
  subsections.forEach(sub => {
    const option = document.createElement("option");
    option.value = sub;
    option.textContent = sub;
    dropdown.appendChild(option);
  });
}

// Fetch Notes content
async function fetchNotes() {
  const subsection = document.getElementById("subsectionDropdown").value;
  if (!subsection) return;
  document.getElementById("notesContent").textContent = "Loading notes…";

  const response = await fetch(GEMINI_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: `Generate CBSE Class 10 notes for Chapter ${currentChapter}, subsection ${subsection}. Keep explanations clear, concise, and student-friendly. Use bullet points.` }] }]
    })
  });
  const data = await response.json();
  document.getElementById("notesContent").textContent = data.candidates?.[0]?.content?.parts?.[0]?.text || "No notes found.";
}

// More Explanation
async function fetchMoreExplanation() {
  const subsection = document.getElementById("subsectionDropdown").value;
  if (!subsection) return;
  document.getElementById("notesContent").textContent = "Loading explanation…";

  const response = await fetch(GEMINI_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: `Expand on CBSE Class 10 Chapter ${currentChapter}, subsection ${subsection}. Provide deeper explanation with examples and analogies.` }] }]
    })
  });
  const data = await response.json();
  document.getElementById("notesContent").textContent = data.candidates?.[0]?.content?.parts?.[0]?.text || "No explanation found.";
}

// Watch Video
async function fetchVideo() {
  const subsection = document.getElementById("subsectionDropdown").value;
  if (!subsection) return;
  document.getElementById("notesContent").textContent = "Searching video…";

  const response = await fetch(GEMINI_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: `Suggest a YouTube video link that explains CBSE Class 10 Chapter ${currentChapter}, subsection ${subsection}. Ensure the video is educational and relevant.` }] }]
    })
  });
  const data = await response.json();
  document.getElementById("notesContent").textContent = data.candidates?.[0]?.content?.parts?.[0]?.text || "No video found.";
}

// Revision Notes
async function fetchRevisionNotes() {
  document.getElementById("revisionContent").textContent = "Loading revision notes…";
  const response = await fetch(GEMINI_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: `Generate concise revision notes for CBSE Class 10 Chapter ${currentChapter}. Focus on key formulas, definitions, and important concepts. Limit to 8–10 bullet points.` }] }]
    })
  });
  const data = await response.json();
  document.getElementById("revisionContent").textContent = data.candidates?.[0]?.content?.parts?.[0]?.text || "No revision notes found.";
}

// Unit Test
async function generateUnitTest() {
  document.getElementById("unitTestContent").textContent = "Generating test…";
  const response = await fetch(GEMINI_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: `Generate a unit test for CBSE Class 10 Chapter ${currentChapter}. Include 20 questions of mixed difficulty (MCQs, short answers, long answers). Provide answers at the end.` }] }]
    })
  });
  const data = await response.json();
  document.getElementById("unitTestContent").textContent = data.candidates?.[0]?.content?.parts?.[0]?.text || "No test generated.";
}

function backToChapters() {
  document.getElementById("chapter-details").style.display = "none";
  document.getElementById("chapter-selection").style.display = "block";
}
