import { digitImages } from './time.js';

export class Clock {
    constructor() {
        this.digitBoxes = {
            hourTens: document.getElementById('hour-tens'),
            hourOnes: document.getElementById('hour-ones'),
            minTens: document.getElementById('min-tens'),
            minOnes: document.getElementById('min-ones'),
            secTens: document.getElementById('sec-tens'),
            secOnes: document.getElementById('sec-ones')
        };
        this.dateDisplay = document.getElementById('dateDisplay');
    }

    update(timeData) {
        const { hours, minutes, seconds, dateObj } = timeData;
        this.updateDigits(hours, minutes, seconds);
        this.updateDate(dateObj);
    }

    updateDigits(hours, minutes, seconds) {
        this.animateDigit(this.digitBoxes.hourTens, Math.floor(hours / 10));
        this.animateDigit(this.digitBoxes.hourOnes, hours % 10);
        this.animateDigit(this.digitBoxes.minTens, Math.floor(minutes / 10));
        this.animateDigit(this.digitBoxes.minOnes, minutes % 10);
        this.animateDigit(this.digitBoxes.secTens, Math.floor(seconds / 10));
        this.animateDigit(this.digitBoxes.secOnes, seconds % 10);
    }

    animateDigit(element, newValue) {
        const img = element.querySelector('.digit-img');
        const currentValue = parseInt(img.alt);
        if (currentValue === newValue) return;

        img.classList.add('animate-up');
        setTimeout(() => {
            img.src = digitImages[newValue];
            img.alt = newValue.toString();
            img.classList.remove('animate-up');
            img.classList.add('animate-down');
            setTimeout(() => img.classList.remove('animate-down'), 300);
        }, 300);
    }

    updateDate(date) {
        const days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
        const months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];

        const dayName = days[date.getDay()];
        const day = date.getDate();
        const month = months[date.getMonth()];
        const year = date.getFullYear();

        this.dateDisplay.innerHTML = `
            <div>${dayName}</div>
            <div>${day} ${month} ${year}</div>
        `;
    }
}