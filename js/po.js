/*
function openTab(evt, tabName) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += " active";
}
document.addEventListener('DOMContentLoaded', function() {
  var tablinks = document.getElementsByClassName("tablinks");
  if (tablinks.length > 0) {
    tablinks[0].click();
  }
});
*/
const showFormButton = document.getElementById('showForm');
const formWrapper = document.getElementById('formWrapper');
showFormButton.addEventListener('click', function() {
  formWrapper.style.display = 'block';
  goalsWrapper.style.display = 'none';
});

const showGoalsButton = document.getElementById('showGoals');
const goalsWrapper = document.getElementById('goalsWrapper');
showGoalsButton.addEventListener('click', function() {
  goalsWrapper.style.display = 'block';
  formWrapper.style.display = 'none';
});