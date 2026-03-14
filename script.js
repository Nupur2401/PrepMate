mykey = "AIzaSyBGvHRZLRZk-7qVu25e_mGD_5EpyXBIndI"

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

// Load all chapters for the subject dynamically from Gemini
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

//Populate all chapters in dropdown
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
  try {
    document.getElementById("notesContent").textContent = "Fetching subsections…";

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
                  text: `List the subsections or main topics covered in CBSE Class 10 ${subject}, Chapter ${chapter}. Provide the output as a simple numbered list of subsection titles only, without explanations.`
                }
              ]
            }
          ]
        })
      }
    );

    const data = await response.json();
    console.log("Gemini raw response (subsections):", data);

    if (!response.ok) {
      document.getElementById("notesContent").textContent =
        "Gemini error: " + (data.error?.message || "Unknown error");
      return;
    }

    // Extract text safely
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "";
    console.log("Extracted subsections:", text);

    // Clean up formatting: remove numbering, **bold**, and intro lines
    const subsections = text
      .split("\n")
      .map(s =>
        s
          .replace(/^\d+[\.\)]\s*/, "") // remove numbering like "1." or "2)"
          .replace(/\*\*/g, "")         // remove **bold markers**
          .trim()
      )
      .filter(Boolean);

    const filteredSubsections = subsections.filter(
      s =>
        !s.toLowerCase().includes("subsections") &&
        !s.toLowerCase().includes("here are")
    );

    // Populate dropdown
    const dropdown = document.getElementById("subsectionDropdown");
    dropdown.innerHTML = '<option value="">-- Choose a Subsection --</option>';

    if (filteredSubsections.length > 0) {
      filteredSubsections.forEach(sub => {
        const option = document.createElement("option");
        option.value = sub;
        option.textContent = sub;
        dropdown.appendChild(option);
      });
      document.getElementById("notesContent").textContent = "";
    } else {
      document.getElementById("notesContent").textContent =
        "No subsections returned from Gemini.";
    }
  } catch (error) {
    console.error("Frontend error:", error);
    document.getElementById("notesContent").textContent =
      "Error fetching subsections.";
  }
}
// Fetch Notes content
async function loadNotes(subject, chapter, subsection) {
  try {
    document.getElementById("notesContent").textContent = "Fetching notes…";

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
                  text: `Generate CBSE Class 10 ${subject} notes for Chapter ${chapter}, subsection ${subsection}. Keep explanations clear, concise, and student-friendly. Use bullet points.`
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
      document.getElementById("notesContent").textContent =
        "Gemini error: " + (data.error?.message || "Unknown error");
      return;
    }

    // Extract text safely
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "";
    console.log("Extracted notes:", text);

    // Clean up formatting: remove **bold**, numbering, intro lines
    const notes = text
      .split("\n")
      .map(line =>
        line
          .replace(/^\d+[\.\)]\s*/, "") // remove numbering
          .replace(/\*\*/g, "")         // remove bold markers
          .trim()
      )
      .filter(Boolean);

    const filteredNotes = notes.filter(
      n =>
        !n.toLowerCase().includes("here are") &&
        !n.toLowerCase().includes("notes for")
    );

    if (filteredNotes.length > 0) {
      document.getElementById("notesContent").innerHTML =
        "<ul>" + filteredNotes.map(n => `<li>${n}</li>`).join("") + "</ul>";
    } else {
      document.getElementById("notesContent").textContent =
        "No notes returned from Gemini.";
    }
  } catch (error) {
    console.error("Frontend error:", error);
    document.getElementById("notesContent").textContent =
      "Error fetching notes.";
  }
}
// More Explanation
async function fetchMoreExplanation(subject, chapter, subsection) {
  try {
    document.getElementById("notesContent").textContent = "Fetching detailed explanation…";

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
                  text: `Expand on CBSE Class 10 ${subject}, Chapter ${chapter}, subsection ${subsection}. Provide deeper explanation with examples and analogies suitable for students.`
                }
              ]
            }
          ]
        })
      }
    );

    const data = await response.json();
    console.log("Gemini raw response (explanation):", data);

    if (!response.ok) {
      document.getElementById("notesContent").textContent =
        "Gemini error: " + (data.error?.message || "Unknown error");
      return;
    }

    // Extract text safely
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "";
    console.log("Extracted explanation:", text);

    // Clean up formatting: remove numbering, **bold**, intro lines
    const explanation = text
      .split("\n")
      .map(line =>
        line
          .replace(/^\d+[\.\)]\s*/, "") // remove numbering
          .replace(/\*\*/g, "")         // remove bold markers
          .trim()
      )
      .filter(Boolean);

    const filteredExplanation = explanation.filter(
      e =>
        !e.toLowerCase().includes("explanation") &&
        !e.toLowerCase().includes("here is")
    );

    if (filteredExplanation.length > 0) {
      document.getElementById("notesContent").innerHTML =
        "<p>" + filteredExplanation.join("<br>") + "</p>";
    } else {
      document.getElementById("notesContent").textContent =
        "No explanation returned from Gemini.";
    }
  } catch (error) {
    console.error("Frontend error:", error);
    document.getElementById("notesContent").textContent =
      "Error fetching explanation.";
  }
}
// Watch Video
async function fetchVideo(subject, chapter, subsection) {
  try {
    document.getElementById("notesContent").textContent = "Searching for video…";

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
                  text: `Suggest a YouTube video link that explains CBSE Class 10 ${subject}, Chapter ${chapter}, subsection ${subsection}. Ensure the video is educational and relevant.`
                }
              ]
            }
          ]
        })
      }
    );

    const data = await response.json();
    console.log("Gemini raw response (video):", data);

    if (!response.ok) {
      document.getElementById("notesContent").textContent =
        "Gemini error: " + (data.error?.message || "Unknown error");
      return;
    }

    // Extract text safely
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "";
    console.log("Extracted video link:", text);

    // Clean up formatting: remove **bold**, numbering, intro lines
    const videoLink = text
      .replace(/\*\*/g, "")         // remove bold markers
      .replace(/^\d+[\.\)]\s*/, "") // remove numbering
      .trim();

    if (videoLink) {
      // If Gemini returns a URL, make it clickable
      if (videoLink.startsWith("http")) {
        document.getElementById("notesContent").innerHTML =
          `<a href="${videoLink}" target="_blank">Watch Video</a>`;
      } else {
        document.getElementById("notesContent").textContent = videoLink;
      }
    } else {
      document.getElementById("notesContent").textContent =
        "No video found for this topic.";
    }
  } catch (error) {
    console.error("Frontend error:", error);
    document.getElementById("notesContent").textContent =
      "Error fetching video.";
  }
}
// Revision Notes
async function fetchRevisionNotes(subject, chapter) {
  try {
    document.getElementById("revisionContent").textContent = "Fetching revision notes…";

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
                  text: `Generate concise revision notes for CBSE Class 10 ${subject}, Chapter ${chapter}. Focus on key formulas, definitions, and important concepts. Limit to 8–10 bullet points.`
                }
              ]
            }
          ]
        })
      }
    );

    const data = await response.json();
    console.log("Gemini raw response (revision):", data);

    if (!response.ok) {
      document.getElementById("revisionContent").textContent =
        "Gemini error: " + (data.error?.message || "Unknown error");
      return;
    }

    // Extract text safely
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "";
    console.log("Extracted revision notes:", text);

    // Clean up formatting: remove numbering, **bold**, intro lines
    const notes = text
      .split("\n")
      .map(line =>
        line
          .replace(/^\d+[\.\)]\s*/, "") // remove numbering
          .replace(/\*\*/g, "")         // remove bold markers
          .trim()
      )
      .filter(Boolean);

    const filteredNotes = notes.filter(
      n =>
        !n.toLowerCase().includes("revision") &&
        !n.toLowerCase().includes("here are")
    );

    if (filteredNotes.length > 0) {
      document.getElementById("revisionContent").innerHTML =
        "<ul>" + filteredNotes.map(n => `<li>${n}</li>`).join("") + "</ul>";
    } else {
      document.getElementById("revisionContent").textContent =
        "No revision notes returned from Gemini.";
    }
  } catch (error) {
    console.error("Frontend error:", error);
    document.getElementById("revisionContent").textContent =
      "Error fetching revision notes.";
  }
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
