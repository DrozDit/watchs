export const digitImages = Array.from({ length: 10 }, (_, i) => `assets/digit_${i}.png`);

export class TimeManager {
    constructor() {
        this.displayTime = null;
        this.isUsingCustomTime = false;
    }

    parseTime(str) {
        const match = str.trim().match(/^(\d{1,2}):(\d{1,2}):(\d{1,2})$/);
        if (!match) return null;
        const [_, h, m, s] = match;
        const hours = parseInt(h, 10);
        const minutes = parseInt(m, 10);
        const seconds = parseInt(s, 10);
        if (hours < 0 || hours > 23 || minutes < 0 || minutes > 59 || seconds < 0 || seconds > 59) {
            return null;
        }
        return { hours, minutes, seconds };
    }

    getCurrentTimeData() {
        if (this.isUsingCustomTime && this.displayTime) {
            const now = new Date();
            const { hours, minutes, seconds } = this.displayTime;
            
            const dateObj = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes, seconds, now.getMilliseconds());
            return { hours, minutes, seconds, dateObj };
        } else {
            const dateObj = new Date();
            return {
                hours: dateObj.getHours(),
                minutes: dateObj.getMinutes(),
                seconds: dateObj.getSeconds(),
                dateObj
            };
        }
    }

    setCustomTime(parsedTime) {
        this.isUsingCustomTime = true;
        this.displayTime = parsedTime;
    }

    useCurrentTime() {
        this.isUsingCustomTime = false;
        this.displayTime = null;
    }

    tick() {
        if (this.isUsingCustomTime && this.displayTime) {
            let { hours, minutes, seconds } = this.displayTime;
            seconds++;
            if (seconds >= 60) {
                seconds = 0;
                minutes++;
                if (minutes >= 60) {
                    minutes = 0;
                    hours = (hours + 1) % 24;
                }
            }
            this.displayTime = { hours, minutes, seconds };
        }
    }

    get isCustom() {
        return this.isUsingCustomTime;
    }

    get customTime() {
        return this.displayTime;
    }
}