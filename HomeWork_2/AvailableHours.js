var hourSlider = document.getElementById('hourSlider');
var selectedHourDisplay = document.getElementById('selectedHour');
var daySelect = document.getElementById('daySelect');
var hoursList = document.getElementById('hoursList');
var availableVotes = {
    Monday: [],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
    Friday: []
};
hourSlider.addEventListener('input', function () {
    var hour = formatHour(parseFloat(hourSlider.value));
    selectedHourDisplay.textContent = hour;
});
function formatHour(hour) {
    var hourFloor = Math.floor(hour);
    var hours = (hourFloor < 10) ? "0".concat(hourFloor) : "".concat(hourFloor);
    var minutes = (hour % 1 === 0.5) ? '30' : '00';
    var timeOfDay = (hour < 12) ? 'AM' : 'PM';
    return "".concat(hours, ":").concat(minutes, " ").concat(timeOfDay);
}
function castVote() {
    var selectedDay = daySelect.value;
    var selectedHour = parseFloat(hourSlider.value);
    availableVotes[selectedDay].push(selectedHour);
    updateVotesDisplay();
}
function updateVotesDisplay() {
    hoursList.innerHTML = '';
    Object.keys(availableVotes).forEach(function (day) {
        var votesCount = {};
        availableVotes[day].forEach(function (hour) {
            votesCount[hour] = (votesCount[hour] || 0) + 1;
        });
        var sortedHours = Object.keys(votesCount).sort(function (a, b) { return votesCount[b] - votesCount[a]; });
        sortedHours.forEach(function (hour) {
            var listItem = document.createElement('li');
            listItem.textContent = "".concat(day, ", ").concat(formatHour(parseFloat(hour)), " - Votes: ").concat(votesCount[hour]);
            hoursList.appendChild(listItem);
        });
    });
}
