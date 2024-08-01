document.addEventListener('DOMContentLoaded', () => {
    // Adding elements without altering existing functionality
    const activityForm = document.getElementById('activity-form');
    const activityInput = document.getElementById('activity-input');
    const activityList = document.getElementById('activity-list');
    const goalForm = document.getElementById('goal-form');
    const goalInput = document.getElementById('goal-input');
    const goalList = document.getElementById('goal-list');
    const historyList = document.getElementById('history-list');
    const achievementList = document.getElementById('achievement-list');
    const quoteElement = document.getElementById('quote');

    // Function to add activity to the list
    function addActivity(activity) {
        const li = document.createElement('li');
        li.textContent = activity;
        activityList.appendChild(li);
        addToHistory(`Added activity: ${activity}`);
    }

    // Function to add goal to the list
    function addGoal(goal) {
        const li = document.createElement('li');
        li.textContent = goal;
        goalList.appendChild(li);
        addToHistory(`Set new goal: ${goal}`);
    }

    // Function to add entry to history
    function addToHistory(entry) {
        const li = document.createElement('li');
        li.textContent = entry;
        historyList.appendChild(li);
    }

    // Function to add achievement
    function addAchievement(achievement) {
        const div = document.createElement('div');
        div.textContent = achievement;
        achievementList.appendChild(div);
        addToHistory(`Achievement unlocked: ${achievement}`);
    }

    // Function to fetch and display a motivational quote
    function fetchQuote() {
        const quotes = [
            "The only way to achieve the impossible is to believe it is possible.",
            "You are never too old to set another goal or to dream a new dream.",
            "Your only limit is your mind.",
            "Push yourself because no one else is going to do it for you.",
            "Great things never come from comfort zones."
        ];
        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
        quoteElement.textContent = randomQuote;
    }

    // Event listener for adding activity
    activityForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const activity = activityInput.value.trim();
        if (activity) {
            addActivity(activity);
            activityInput.value = '';
        }
    });

    // Event listener for adding goal
    goalForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const goal = goalInput.value.trim();
        if (goal) {
            addGoal(goal);
            goalInput.value = '';
        }
    });

    // Initial fetch of motivational quote
    fetchQuote();
});
