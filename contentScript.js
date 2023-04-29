
let appendAlertStyle = () => {
  const styleElement = document.createElement("style");

  styleElement.textContent = `
    .user-productivity-alert {
      position: relative;
      top: 40%;
      left: 50%;
      width: 40%;
      transform: translate(-50%, -50%);
      padding: 50px;
      opacity: 1.5;
      background-color: #fff;
      border-radius: 5px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
      z-index: 9999;
    }

    .user-productivity-alert h2 {
      margin: 0 0 10px;
    }

    .user-productivity-alert p {
      margin: 0;
    }

    .user-alert-background {
      position: fixed;
      z-index: 1;
      cursor: pointer;
      height: 100%;
      width: 100%;
      left: 0;
      top: 0;
      background-color: rgba(0,0,0, 0.9);
    }
  `;

  document.head.appendChild(styleElement);
};

let userProductivityAlert = (message) => {
  appendAlertStyle();
  const alertWindow = document.createElement("div");
  alertWindow.classList.add("user-alert-background");
  alertWindow.style.height = window.screen.height;

  const alertBox = document.createElement("div");
  alertBox.classList.add("user-productivity-alert");
  alertWindow.appendChild(alertBox);

  const titleElement = document.createElement("h2");
  titleElement.textContent = "User Productivity Alert...";
  alertBox.appendChild(titleElement);

  const messageElement = document.createElement("p");
  messageElement.textContent = message;
  alertBox.appendChild(messageElement);

  document.body.appendChild(alertWindow);

  alertWindow.addEventListener("click", function(event) {
    document.body.removeChild(alertWindow);
  });
};


chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    const websiteUrl = window.location.host;

    if (message.type === "startWebsiteTracking") {
      const websiteGoal = {
        url: websiteUrl,
        timeLimit: message.websiteGoals[websiteUrl].timeLimit,
        maxTabs: message.websiteGoals[websiteUrl].maxTabs,
        timeSpent: 0,
        numTabs: 1
      };

      const browserGoal = {
        timeSpent: 0,
        timeLimit: message.browserTime
      };
      localStorage.setItem("goal:"+websiteUrl, JSON.stringify(websiteGoal));
      localStorage.setItem("goal:browser", JSON.stringify(browserGoal));

      sendResponse({ success: true });
    }
  });
  
  let currentTabUrl = window.location.host;
  let currentTabStartTime = Date.now();
  setInterval(function() {
    const currentTime = Date.now();
    const timeElapsed = (currentTime - currentTabStartTime) / 1000; // Convert to seconds
  
    const websiteGoal = JSON.parse(localStorage.getItem("goal:"+currentTabUrl));
    const browserGoal = JSON.parse(localStorage.getItem("goal:browser"));

    if (websiteGoal) {
      websiteGoal.timeSpent += timeElapsed;
      if (websiteGoal.timeSpent > websiteGoal.timeLimit) {
        userProductivityAlert("You have exceeded daily limit for " + currentTabUrl + ". Please close this website.");
      }
      localStorage.setItem("goal:"+currentTabUrl, JSON.stringify(websiteGoal));
    }

    if(browserGoal) {
      browserGoal.timeSpent += timeElapsed;
      if (browserGoal.timeSpent > browserGoal.timeLimit) {
        userProductivityAlert("You have exceeded daily browsing limit. Please stop all browsing tasks and start again tomorrow.");
      }
      localStorage.setItem("goal:browser", JSON.stringify(browserGoal));
    }
  
    currentTabUrl = window.location.host;
    currentTabStartTime = currentTime;
  }, 10000); // Update every 10 seconds
  