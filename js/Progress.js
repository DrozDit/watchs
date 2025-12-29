export class Progress {
    constructor() {
        this.fillLeft = document.getElementById('progressFillLeft');
        this.fillRight = document.getElementById('progressFillRight');
    }

    update(date) {
        const SECONDS_IN_MINUTE = 60;
        const seconds = date.getSeconds();
        const ratio = seconds / SECONDS_IN_MINUTE;

        const bar = document.querySelector('.progress-bar');
        if (!bar) return;

        const totalBarWidth = bar.offsetWidth;
        const maxFillWidth = totalBarWidth / 2;
        const fillWidth = maxFillWidth * ratio;

        this.fillRight.style.width = `${fillWidth}px`;
        this.fillLeft.style.width = `${fillWidth}px`;
    }
}