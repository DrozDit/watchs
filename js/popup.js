export class Popup {
    constructor(onApply, onCancel) {
        this.overlay = document.getElementById('popupOverlay');
        this.timeInput = document.getElementById('timeInput');
        this.useCurrentTime = document.getElementById('useCurrentTime');
        this.applyBtn = document.getElementById('applyTimeBtn');
        this.cancelBtn = document.getElementById('cancelBtn');

        this.applyBtn.addEventListener('click', () => {
            const timeStr = this.timeInput.value;
            const useCurrent = this.useCurrentTime.checked;
            onApply(timeStr, useCurrent);
            this.hide();
        });

        this.cancelBtn.addEventListener('click', () => {
            onCancel();
            this.hide();
        });

        document.getElementById('changeTimeBtn').addEventListener('click', () => {
            this.show();
        });
    }

    show() {
        this.timeInput.value = '';
        this.useCurrentTime.checked = false;
        this.overlay.style.display = 'flex';
    }

    hide() {
        this.overlay.style.display = 'none';
    }
}