let fitnessData = {
    caloriesBurned: 0,
    stepsTaken: 0,
    activeMinutes: 0,
    activities: [],
    goals: {
        calories: 2000,
        steps: 10000,
        activeMinutes: 60
    },
    history: {}
};

function updateDashboard() {
    document.getElementById('calories-value').textContent = fitnessData.caloriesBurned;
    document.getElementById('steps-value').textContent = fitnessData.stepsTaken;
    document.getElementById('active-minutes-value').textContent = fitnessData.activeMinutes;

    updateActivityList();
    updateGoalProgress();
    updateChart();
}

function updateActivityList() {
    const activityList = document.getElementById('activity-list');
    activityList.innerHTML = '';
    fitnessData.activities.forEach((activity, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            ${activity.name} - ${activity.duration} minutes (${activity.intensity} intensity)
            <button onclick="removeActivity(${index})">Remove</button>
        `;
        activityList.appendChild(li);
    });
}

function addActivity(name, duration, intensity) {
    fitnessData.activities.push({ name, duration, intensity });
    fitnessData.activeMinutes += duration;
    
    let calorieMultiplier;
    switch (intensity) {
        case 'low':
            calorieMultiplier = 3;
            break;
        case 'medium':
            calorieMultiplier = 5;
            break;
        case 'high':
            calorieMultiplier = 7;
            break;
        default:
            calorieMultiplier = 5;
    }
    
    fitnessData.caloriesBurned += Math.floor(duration * calorieMultiplier);
    fitnessData.stepsTaken += Math.floor(duration * 100 * (intensity === 'high' ? 1.5 : intensity === 'low' ? 0.5 : 1));
    
    updateDashboard();
    saveToHistory();
}

function removeActivity(index) {
    const removedActivity = fitnessData.activities.splice(index, 1)[0];
    fitnessData.activeMinutes -= removedActivity.duration;
    
    let calorieMultiplier;
    switch (removedActivity.intensity) {
        case 'low':
            calorieMultiplier = 3;
            break;
        case 'medium':
            calorieMultiplier = 5;
            break;
        case 'high':
            calorieMultiplier = 7;
            break;
        default:
            calorieMultiplier = 5;
    }
    
    fitnessData.caloriesBurned -= Math.floor(removedActivity.duration * calorieMultiplier);
    fitnessData.stepsTaken -= Math.floor(removedActivity.duration * 100 * (removedActivity.intensity === 'high' ? 1.5 : removedActivity.intensity === 'low' ? 0.5 : 1));
    
    updateDashboard();
    saveToHistory();
}

function setGoals(calories, steps, activeMinutes) {
    fitnessData.goals.calories = calories;
    fitnessData.goals.steps = steps;
    fitnessData.goals.activeMinutes = activeMinutes;
    updateGoalProgress();
}

function updateGoalProgress() {
    const calorieGoal = document.getElementById('calorie-goal-input');
    const stepGoal = document.getElementById('step-goal-input');
    const activeMinutesGoal = document.getElementById('active-minutes-goal-input');

    calorieGoal.value = fitnessData.goals.calories;
    stepGoal.value = fitnessData.goals.steps;
    activeMinutesGoal.value = fitnessData.goals.activeMinutes;

    updateProgressBar('calories-progress', fitnessData.caloriesBurned, fitnessData.goals.calories);
    updateProgressBar('steps-progress', fitnessData.stepsTaken, fitnessData.goals.steps);
    updateProgressBar('active-minutes-progress', fitnessData.activeMinutes, fitnessData.goals.activeMinutes);
}

function updateProgressBar(id, value, goal) {
    const progressBar = document.getElementById(id);
    const percentage = Math.min((value / goal) * 100, 100);
    progressBar.innerHTML = `<div style="width: ${percentage}%"></div>`;
}

function updateChart() {
    const ctx = document.getElementById('activity-chart').getContext('2d');
    const activityData = fitnessData.activities.map(activity => activity.duration);
    const activityLabels = fitnessData.activities.map(activity => activity.name);

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: activityLabels,
            datasets: [{
                label: 'Activity Duration (minutes)',
                data: activityData,
                backgroundColor: fitnessData.activities.map(activity => {
                    switch (activity.intensity) {
                        case 'low':
                            return 'rgba(75, 192, 192, 0.6)';
                        case 'medium':
                            return 'rgba(255, 206, 86, 0.6)';
                        case 'high':
                            return 'rgba(255, 99, 132, 0.6)';
                        default:
                            return 'rgba(75, 192, 192, 0.6)';
                    }
                }),
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            responsive: true,
            maintainAspectRatio: false
        }
    });
}

function saveToHistory() {
    const today = new Date().toISOString().split('T')[0];
    fitnessData.history[today] = {
        caloriesBurned: fitnessData.caloriesBurned,
        stepsTaken: fitnessData.stepsTaken,
        activeMinutes: fitnessData.activeMinutes,
        activities: [...fitnessData.activities]
    };
    localStorage.setItem('fitnessData', JSON.stringify(fitnessData));
}

function loadHistory(date) {
    const historyData = fitnessData.history[date];
    if (historyData) {
        const historyDiv = document.getElementById('history-data');
        historyDiv.innerHTML = `
            <h3>Data for ${date}</h3>
            <p>Calories Burned: ${historyData.caloriesBurned}</p>
            <p>Steps Taken: ${historyData.stepsTaken}</p>
            <p>Active Minutes: ${historyData.activeMinutes}</p>
            <h4>Activities:</h4>
            <ul>
                ${historyData.activities.map(activity => `
                    <li>${activity.name} - ${activity.duration} minutes (${activity.intensity} intensity)</li>
                `).join('')}
            </ul>
        `;
    } else {
        document.getElementById('history-data').innerHTML = '<p>No data available for this date.</p>';
    }
}

document.getElementById('add-activity-btn').addEventListener('click', () => {
    const name = document.getElementById('activity-name').value;
    const duration = parseInt(document.getElementById('activity-duration').value);
    const intensity = document.getElementById('activity-intensity').value;
    if (name && duration) {
        addActivity(name, duration, intensity);
        document.getElementById('activity-name').value = '';
        document.getElementById('activity-duration').value = '';
        document.getElementById('activity-intensity').value = 'low';
    }
});

document.getElementById('set-goals-btn').addEventListener('click', () => {
    const calories = parseInt(document.getElementById('calorie-goal-input').value);
    const steps = parseInt(document.getElementById('step-goal-input').value);
    const activeMinutes = parseInt(document.getElementById('active-minutes-goal-input').value);
    setGoals(calories, steps, activeMinutes);
});

document.getElementById('load-history-btn').addEventListener('click', () => {
    const date = document.getElementById('history-date').value;
    loadHistory(date);
});

function initDashboard() {
    const storedData = localStorage.getItem('fitnessData');
    if (storedData) {
        fitnessData = JSON.parse(storedData);
    }
    updateDashboard();
}

initDashboard();