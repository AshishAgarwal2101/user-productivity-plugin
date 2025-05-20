
document.addEventListener('DOMContentLoaded', function() {

  
  let updateCurrentDisplayedGoals = async (goals) => {
    let {browserTime, websiteGoals} = goals;
    const currentTab = await getCurrentTab();
    let browsingPTag = document.querySelector("#browsingLimit");
    browsingPTag.innerHTML = browserTime ? (browserTime / (60)) + " mins" : "";
    let tbody = document.querySelector('#currentGoals tbody');
    tbody.innerHTML = '';
    for (let url in websiteGoals) {
      let row = document.createElement('tr');
      row.innerHTML = '<td class="url">' + url + '</td>' +
                      '<td class="timeLimit">' + (websiteGoals[url].timeLimit/(60)) + ' mins</td>';
      tbody.appendChild(row);
    }

    const websiteUrlGoalSetting = document.getElementById('websiteUrl');
    websiteUrlGoalSetting.innerHTML = currentTab.url ? currentTab.url : "this website";
    const browserTimeSetter = document.getElementById('browserTime');
    const websiteTimeSetter = document.getElementById('websiteTime');
    browserTimeSetter.value = browserTime ? (browserTime / (60)) : 0;
    websiteTimeSetter.value = websiteGoals[currentTab.url] ? (websiteGoals[currentTab.url].timeLimit / (60)) : 0;
    
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
    
    //chrome.tabs.sendMessage(currentTab.tabId, message);
    await chrome.tabs.sendMessage(currentTab.tabId, message).catch(error => {
        console.error('Failed to send message:', error);
    });
    updateCurrentDisplayedGoals(goals);
  };

  let goals = JSON.parse(localStorage.getItem('userProductivityGoals')) || {browserTime: null, websiteGoals: {}};
  updateCurrentDisplayedGoals(goals);

  let form = document.getElementById('setGoals');
  let message = document.getElementById('message');
  document.getElementById('setGoals').addEventListener('submit', function(event) {
    event.preventDefault();

    let newBrowserTime = parseInt(document.getElementById('browserTime').value)*60;
    let newWebsiteTime = parseInt(document.getElementById('websiteTime').value)*60;

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
  