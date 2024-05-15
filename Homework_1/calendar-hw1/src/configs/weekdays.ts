export const Weekdays = ['MON', 'TUE', 'WED',
                                        'THU', 'FRI', 'SAT', 'SUN'] as const;
export const Hours = [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
export type Weekday = (typeof Weekdays)[number];
export type Hour = (typeof Hours)[number];


export const getWeek = () => {
    const now = new Date();
    const day = getDay(now);
    now.setDate(now.getDate() - day);
    const result: Date[] = [];
    for(let i = 0; i < 7; i++){
        result.push(new Date(now));
        now.setDate(now.getDate() + 1);
    }
    return result;
}

export const getDay = (date: Date) => {
    return (date.getDay() + 6) % 7;
}

export const getDayString = (date: Date) => {
    return Weekdays[getDay(date)];
}
