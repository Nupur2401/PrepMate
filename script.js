function toggleMenu() {
  const menu = document.getElementById("menu");
  menu.style.display = menu.style.display === "none" ? "block" : "none";
}

function goHome() {
  alert("Returning to Home Screen");
}

function selectSubject(subject) {
  alert("You selected: " + subject);
}
