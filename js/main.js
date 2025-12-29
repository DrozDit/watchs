import { Clock } from './clock.js';
import { TimeManager } from './time.js';
import { Progress } from './Progress.js';
import { Popup } from './popup.js';

// Инициализация компонентов
const timeManager = new TimeManager();
const clock = new Clock();
const progress = new Progress();


document.querySelector('.time-display').addEventListener('click', () => {
    let dateObj;
    if (timeManager.isCustom && timeManager.customTime) {
        const now = new Date();
        const { hours, minutes, seconds } = timeManager.customTime;
        dateObj = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes, seconds, now.getMilliseconds());
    } else {
        dateObj = new Date();
    }

    const h = dateObj.getHours();
    const m = String(dateObj.getMinutes()).padStart(2, '0');
    const s = String(dateObj.getSeconds()).padStart(2, '0');
    const ms = String(dateObj.getMilliseconds()).padStart(3, '0');

    console.log(`${h}:${m}:${s}.${ms}`);
});


const popup = new Popup(
    (timeStr, useCurrent) => {
        if (useCurrent) {
            timeManager.useCurrentTime();
        } else {
            const parsed = timeManager.parseTime(timeStr);
            if (!parsed) {
                alert('Используйте ЧЧ:ММ:СС');
                return;
            }
            timeManager.setCustomTime(parsed);
        }
        
        const data = timeManager.getCurrentTimeData();
        clock.update(data);
        progress.update(data.dateObj);
    },
    () => {
        
    }
);


function tick() {
    timeManager.tick();
    const data = timeManager.getCurrentTimeData();
    clock.update(data);
    progress.update(data.dateObj);
}


setInterval(tick, 1000);
tick(); 