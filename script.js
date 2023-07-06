const app = Vue.createApp({
  data() {
    return {
      timer_states: ["開始", "暫停", "繼續"],
      startBtnState: 0,
      resetBtnisDisabled: true,
      timerInterval: null,
      timerDuration: 0,
      time: [0, 0, 0],
      isSpin: false,
    };
  },
  mounted() {},
  methods: {
    startBtn() {
      this.timerFunction(this.startBtnState);
      this.startBtnState = (this.startBtnState % 2) + 1;
    },
    timerFunction(startBtnState) {
      switch (startBtnState) {
        case 0:
          this.isSpin = true;
          this.resetBtnisDisabled = false;
          this.timerInterval = setInterval(() => {
            this.updateTimerDisplay();
            this.timerDuration++;
          }, 10);
          break;
        case 1:
          this.isSpin = false;
          clearInterval(this.timerInterval);
          break;
        case 2:
          this.timerFunction(0);
          break;
        case 3:
          if (this.startBtnState === 2) {
            this.startBtnState = 0;
            this.resetBtnisDisabled = true;
          }
          this.timerDuration = 0;
          this.updateTimerDisplay();
          break;
      }
    },
    updateTimerDisplay() {
      this.time = [
        Math.floor(this.timerDuration / 6000) % 60,
        Math.floor(this.timerDuration / 100) % 60,
        this.timerDuration % 100,
      ];
    },
  },
});
app.mount("#app");
