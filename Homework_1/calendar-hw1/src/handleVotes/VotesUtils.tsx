type Votes = Record<number, number[]>;

export const saveMarkedHours = (votes: Votes) => {
    const markedHours = [];

    for (const dateKey in votes) {
        if (votes.hasOwnProperty(dateKey)) {
            const date = new Date(parseInt(dateKey, 10));
            const hours = votes[dateKey];

            const markedDate = {
                date: date.toISOString(),
                hours: hours.map(h => `${h}:00`),
            };

            markedHours.push(markedDate);
        }
    }

    const jsonMarkedHours = JSON.stringify(markedHours);
    localStorage.setItem("markedHours", jsonMarkedHours);
};

export const loadVotesFromJson = (): Votes => {
    const jsonVotes = localStorage.getItem("votedDates");
    return jsonVotes ? JSON.parse(jsonVotes) : {};
};
