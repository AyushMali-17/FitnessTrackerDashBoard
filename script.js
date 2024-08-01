
let fitnessData = {
    caloriesBurned: 0,
    stepsTaken: 0,
    activeMinutes: 0,
    activities: []
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
}

function addActivity(name, duration) {
    fitnessData.activities.push({ name, duration });
    fitnessData.activeMinutes += duration;
    fitnessData.caloriesBurned += Math.floor(duration * 5); 
    fitnessData.stepsTaken += Math.floor(duration * 100); 
    updateDashboard();
}

addActivity('Running', 30);
addActivity('Cycling', 45);
addActivity('Swimming', 20);

updateDashboard();