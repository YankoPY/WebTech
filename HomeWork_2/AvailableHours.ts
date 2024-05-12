class AvailableHours {
    private data: { hour: number; votes: number }[];

    constructor(hours: number[]) {
        this.data = hours.map(hour => ({ hour, votes: 0 }));
    }

    addHour(hour: number) {
        let hourExists = false;
        for (let i = 0; i < this.data.length; i++) {
            if (this.data[i].hour === hour) {
                hourExists = true;
                break;
            }
        }
        if (!hourExists) {
            this.data.push({ hour, votes: 0 });
            console.log(`Hour ${hour} added.`);
        } else {
            console.log(`Hour ${hour} already exists.`);
        }
    }

    addVote(hour: number) {
        let hourFound = false;
        for (let i = 0; i < this.data.length; i++) {
            if (this.data[i].hour === hour) {
                this.data[i].votes++;
                hourFound = true;
                console.log(`Vote added for hour ${hour}.`);
                break;
            }
        }
        if (!hourFound) {
            console.log(`Hour ${hour} not found.`);
        }
    }

    private formatHour(hour: number): string {
        const hourFloor = Math.floor(hour);
        const hours = (hourFloor < 10) ? `0${hourFloor}` : `${hourFloor}`;
        const minutes = (hour % 1 === 0.5) ? '30' : '00';
        const timeOfDay = (hour < 12) ? 'AM' : 'PM';
        return `${hours}:${minutes} ${timeOfDay}`;
    }

    displayVotes() {
        console.log("\nHour\t\tVotes\n");
        this.data.forEach(item => {
            console.log(`${this.formatHour(item.hour)}\t${item.votes}`);
        });
        console.log("\n");
    }
}
