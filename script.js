let fitnessData = {
    caloriesBurned: 0,
    stepsTaken: 0,
    activeMinutes: 0,
    activities: [],
    goals: {
        calories: 2000,
        steps: 10000,
        activeMinutes: 60
    }
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
            ${activity.name} - ${activity.duration} minutes
            <button onclick="removeActivity(${index})">Remove</button>
        `;
        activityList.appendChild(li);
    });
}

function addActivity(name, duration) {
    fitnessData.activities.push({ name, duration });
    fitnessData.activeMinutes += duration;
    fitnessData.caloriesBurned += Math.floor(duration * 5); 
    fitnessData.stepsTaken += Math.floor(duration * 100); 
    updateDashboard();
}

function removeActivity(index) {
    const removedActivity = fitnessData.activities.splice(index, 1)[0];
    fitnessData.activeMinutes -= removedActivity.duration;
    fitnessData.caloriesBurned -= Math.floor(removedActivity.duration * 5);
    fitnessData.stepsTaken -= Math.floor(removedActivity.duration * 100);
    updateDashboard();
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
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
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

document.getElementById('add-activity-btn').addEventListener('click', () => {
    const name = document.getElementById('activity-name').value;
    const duration = parseInt(document.getElementById('activity-duration').value);
    if (name && duration) {
        addActivity(name, duration);
        document.getElementById('activity-name').value = '';
        document.getElementById('activity-duration').value = '';
    }
});

document.getElementById('set-goals-btn').addEventListener('click', () => {
    const calories = parseInt(document.getElementById('calorie-goal-input').value);
    const steps = parseInt(document.getElementById('step-goal-input').value);
    const activeMinutes = parseInt(document.getElementById('active-minutes-goal-input').value);
    setGoals(calories, steps, activeMinutes);
});

updateDashboard();