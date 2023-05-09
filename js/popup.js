
document.addEventListener('DOMContentLoaded', function() {

  
    let updateCurrentDisplayedGoals = (goals) => {
    let {browserTime, websiteGoals} = goals;
    let browsingPTag = document.querySelector("#browsingLimit");
    browsingPTag.innerHTML = browserTime ? (browserTime / (60*60.0)) + " hrs" : "";
    let tbody = document.querySelector('#currentGoals tbody');
    tbody.innerHTML = '';
    for (let url in websiteGoals) {
      let row = document.createElement('tr');
      row.innerHTML = '<td class="url">' + url + '</td>' +
                      '<td class="timeLimit">' + (websiteGoals[url].timeLimit/(60*60.0)) + ' hrs</td>';
      tbody.appendChild(row);
    }
  };

  let getCurrentTab = async() => {
    let queryOptions = { active: true, lastFocusedWindow: true };
    let [tab] = await chrome.tabs.query(queryOptions);
    let url = (new URL(tab.url)).hostname;
    return {tabId: tab.id, url};
  };

  let updateGoals = async(goals, newWebsiteGoal, browserTime) => {
    let currentTab = await getCurrentTab();
    let websiteGoals = goals.websiteGoals;
    websiteGoals[currentTab.url] = newWebsiteGoal;
    goals = {browserTime, websiteGoals};
    localStorage.setItem('userProductivityGoals', JSON.stringify(goals));

    let message = {
      type: 'startWebsiteTracking',
      ...goals
    };
    
    chrome.tabs.sendMessage(currentTab.tabId, message);
    updateCurrentDisplayedGoals(goals);
  };

  let goals = JSON.parse(localStorage.getItem('userProductivityGoals')) || {browserTime: null, websiteGoals: {}};
  updateCurrentDisplayedGoals(goals);

  let form = document.getElementById('setGoals');
  let message = document.getElementById('message');
  document.getElementById('setGoals').addEventListener('submit', function(event) {
    event.preventDefault();

    let newBrowserTime = parseFloat(document.getElementById('browserTime').value)*60*60;
    let newWebsiteTime = parseFloat(document.getElementById('websiteTime').value)*60*60;

    let newWebsiteGoal = {
      timeLimit: newWebsiteTime
    };
    updateGoals(goals, newWebsiteGoal, newBrowserTime);
    if (!message.classList.contains('show')) {
      message.textContent = 'Your goals are set';
      message.classList.add('show');
    }
  });
});
  