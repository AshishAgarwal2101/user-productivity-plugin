
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