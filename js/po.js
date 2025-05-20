
document.addEventListener('DOMContentLoaded', function() {
  // const showFormButton = document.getElementById('showForm');
  // const formWrapper = document.getElementById('formWrapper');
  // showFormButton.addEventListener('click', function() {
  //   formWrapper.style.display = 'block';
  //   goalsWrapper.style.display = 'none';
  // });

  // const showGoalsButton = document.getElementById('showGoals');
  // const goalsWrapper = document.getElementById('goalsWrapper');
  // showGoalsButton.addEventListener('click', function() {
  //   goalsWrapper.style.display = 'block';
  //   formWrapper.style.display = 'none';
  // });


  const tabButtons = document.querySelectorAll('.tab-button');
  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      //Remove success addition of goals message, it it is shown
      let message = document.getElementById('message');
      message.textContent = '';
      message.classList.remove('show');

      // Remove active class from all buttons and content
      tabButtons.forEach(btn => btn.classList.remove('active'));
      document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
      });
      
      // Add active class to clicked button and corresponding content
      button.classList.add('active');
      const tabId = button.getAttribute('data-tab');
      document.getElementById(tabId).classList.add('active');
    });
  });
});