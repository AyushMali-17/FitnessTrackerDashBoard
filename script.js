let fitnessData = {
    caloriesBurned: 0,
    stepsTaken: 0,
    activeMinutes: 0,
    activities: [],
    goals: {
        calories: 0,
        steps: 0,
        activeMinutes: 0
    }
};

function updateDashboard() {
    document.getElementById('calories-value').textContent = fitnessData.caloriesBurned;
    document.getElementById('steps-value').textContent = fitnessData.stepsTaken;
    document.getElementById('active-minutes-value').textContent = fitnessData.activeMinutes;

    const activityList = document.getElementById('activity-list');
    activityList.innerHTML = '';
    fitnessData.activities.forEach(activity => {
        const li = document.createElement('li');
        li.textContent = `${activity.name} - ${activity.duration} minutes`;
        activityList.appendChild(li);
    });

    updateGoalProgress();
}

function addActivity(name, duration) {
    fitnessData.activities.push({ name, duration });
    fitnessData.activeMinutes += duration;
    fitnessData.caloriesBurned += Math.floor(duration * 5); // Assuming 5 calories burned per minute
    fitnessData.stepsTaken += Math.floor(duration * 100); // Assuming 100 steps per minute
    updateDashboard();
}

function setGoals(calories, steps, activeMinutes) {
    fitnessData.goals.calories = calories;
    fitnessData.goals.steps = steps;
    fitnessData.goals.activeMinutes = activeMinutes;
    updateGoalProgress();
}

// Function to update goal progress
function updateGoalProgress() {
    const calorieGoal = document.getElementById('calorie-goal-input');
    const stepGoal = document.getElementById('step-goal-input');
    const activeMinutesGoal = document.getElementById('active-minutes-goal-input');

    calorieGoal.value = fitnessData.goals.calories;
    stepGoal.value = fitnessData.goals.steps;
    activeMinutesGoal.value = fitnessData.goals.activeMinutes;

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