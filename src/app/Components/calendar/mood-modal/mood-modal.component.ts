import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MoodEntriesService } from '../../../Services/mood-entries.service';
import { MoodEntry } from '../../../Interfaces/moodInterface';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-mood-modal',
  standalone: true,
  imports: [FormsModule, DatePipe],
  templateUrl: './mood-modal.component.html',
  styleUrls: ['./mood-modal.component.css']
})
export class MoodModalComponent {
  @Input() date!: Date;
  @Output() moodSaved = new EventEmitter<void>();
  @Output() close = new EventEmitter<void>();

  intensity: number = 3;
  note: string = '';
  mood: 'happy' | 'sad' | 'anxious' | 'angry' | 'calm' | 'stressed' = 'happy';

  constructor(private moodService: MoodEntriesService) {}

  saveMood() {
    const entry: MoodEntry = {
      mood: this.mood,
      intensity: this.intensity as 1|2|3|4|5,
      note: this.note,
      date: this.date
    };
    this.moodService.createMoodEntry(entry);
    this.moodSaved.emit();
  }

  onClose() {
    this.close.emit();
  }
}
