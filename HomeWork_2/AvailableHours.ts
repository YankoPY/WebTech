const hourSlider = document.getElementById('hourSlider') as HTMLInputElement;
const selectedHourDisplay = document.getElementById('selectedHour') as HTMLSpanElement;
const daySelect = document.getElementById('daySelect') as HTMLSelectElement;
const hoursList = document.getElementById('hoursList') as HTMLUListElement;

let availableVotes: Record<string, number[]> = {
    Monday: [],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
    Friday: []
};

hourSlider.addEventListener('input', function() {
    const hour = formatHour(parseFloat(hourSlider.value));
    selectedHourDisplay.textContent = hour;
});

function formatHour(hour: number): string {
    const hourFloor = Math.floor(hour);
    const hours = (hourFloor < 10) ? `0${hourFloor}` : `${hourFloor}`;
    const minutes = (hour % 1 === 0.5) ? '30' : '00';
    const timeOfDay = (hour < 12) ? 'AM' : 'PM';
    return `${hours}:${minutes} ${timeOfDay}`;
}

function castVote() {
    const selectedDay = daySelect.value;
    const selectedHour = parseFloat(hourSlider.value);

    availableVotes[selectedDay].push(selectedHour);
    updateVotesDisplay();
}

function updateVotesDisplay() {
    hoursList.innerHTML = '';

    Object.keys(availableVotes).forEach(day => {
        const votesCount: Record<string, number> = {};

        availableVotes[day].forEach(hour => {
            votesCount[hour] = (votesCount[hour] || 0) + 1;
        });

        const sortedHours = Object.keys(votesCount).sort((a, b) => votesCount[b] - votesCount[a]);

        sortedHours.forEach(hour => {
            const listItem = document.createElement('li');
            listItem.textContent = `${day}, ${formatHour(parseFloat(hour))} - Votes: ${votesCount[hour]}`;
            hoursList.appendChild(listItem);
        });
    });
}
