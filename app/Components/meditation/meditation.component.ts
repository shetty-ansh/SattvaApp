import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-meditation',
  templateUrl: './meditation.component.html',
  styleUrls: ['./meditation.component.css']
})
export class MeditationComponent implements OnInit, OnDestroy {
  minutes: number = 0;
  seconds: number = 0;
  timer: any;
  isRunning: boolean = false;
  isBreathing: boolean = false;
  breathingInterval: any;

  ngOnInit() {
    // this.resetTimer();
  }

  ngOnDestroy() {
    this.stopTimer();
    this.stopBreathing();
  }

  setDuration(duration: number) {
    this.minutes = duration;
    this.seconds = 0;
  }

  toggleClock() {
    if (this.isRunning) {
      this.pauseTimer();
    } else {
      this.runTimer();
    }
  }

  runTimer() {
    if (!this.isRunning) {
      this.isRunning = true;
      this.timer = setInterval(() => {
        if (this.seconds > 0) {
          this.seconds--;
        } else if (this.minutes > 0) {
          this.minutes--;
          this.seconds = 59;
        } else {
          this.stopTimer();
        }
      }, 1000);
      this.startBreathing();
    }
  }

  pauseTimer() {
    this.isRunning = false;
    clearInterval(this.timer);
    this.stopBreathing();
  }

  stopTimer() {
    this.isRunning = false;
    clearInterval(this.timer);
    this.stopBreathing();
  }

  startBreathing() {
    this.isBreathing = true;
    this.breathingInterval = setInterval(() => {
      this.isBreathing = !this.isBreathing;
    }, 3000);
  }

  stopBreathing() {
    clearInterval(this.breathingInterval);
    this.isBreathing = false;
  }

}
