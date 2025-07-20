// import { Component, OnInit } from '@angular/core';
// import { HttpClient } from '@angular/common/http';

// @Component({
//   selector: 'app-dashboard',
//   templateUrl: './dashboard.component.html',
//   styleUrls: ['./dashboard.component.css']
// })
// export class DashboardComponent implements OnInit {
//   moodChartLabels: string[] = [];
//   moodChartData: any[] = [];

//   intensityLabels: string[] = [];
//   intensityData: any[] = [];

//   habitTypeData: any[] = [];
//   priorityData: any[] = [];

//   recentJournals: any[] = [];
//   ratingData: any[] = [];

//   constructor(private http: HttpClient) {}

//   ngOnInit() {
//     this.http.get<any>('http://localhost:3000/dashboard').subscribe(res => {
//       const moods = res.data.moods;
//       const habits = res.data.habits;
//       const journals = res.data.journals;

//       // Mood Frequency
//       const moodCounts = this.countByKey(moods, 'mood');
//       this.moodChartLabels = Object.keys(moodCounts);
//       this.moodChartData = [{ data: Object.values(moodCounts), backgroundColor: this.getColors(moodCounts) }];

//       // Intensity Over Time
//       this.intensityLabels = moods.map((m: { date: string | number | Date; }) => new Date(m.date).toLocaleDateString());
//       this.intensityData = [{ data: moods.map((m: { intensity: any; }) => m.intensity || 0), label: 'Mood Intensity' }];

//       // Habit Type
//       const good = habits.filter((h: { type: string; }) => h.type === 'Good').length;
//       const bad = habits.length - good;
//       this.habitTypeData = [{ data: [good, bad], backgroundColor: ['green', 'red'] }];

//       // Habit Priority
//       const pCounts = this.countByKey(habits, 'priority');
//       this.priorityData = [{ data: ['Low', 'Medium', 'High'].map(p => pCounts[p] || 0), backgroundColor: ['#90ee90', '#f0e68c', '#ff7f7f'] }];

//       // Recent Journals
//       this.recentJournals = journals.slice(-5).reverse();

//       // Journal Ratings
//       const rCounts = this.countByKey(journals, 'rating');
//       this.ratingData = [{ data: ['1','2','3','4','5'].map(r => rCounts[r] || 0), backgroundColor: '#6fa8dc' }];
//     });
//   }

//   countByKey(arr: any[], key: string): Record<string, number> {
//     return arr.reduce((acc, obj) => {
//       acc[obj[key]] = (acc[obj[key]] || 0) + 1;
//       return acc;
//     }, {});
//   }

//   getColors(counts: Record<string, number>): string[] {
//     return Object.keys(counts).map(m => {
//       switch (m) {
//         case 'happy': return '#ffd700';
//         case 'sad': return '#87cefa';
//         case 'angry': return '#ff4500';
//         case 'calm': return '#98fb98';
//         case 'anxious': return '#dda0dd';
//         case 'stressed': return '#ffb6c1';
//         default: return '#ccc';
//       }
//     });
//   }
// }
