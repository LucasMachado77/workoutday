// Define o ano atual no span com id "year"
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById('year').textContent = new Date().getFullYear();
  });