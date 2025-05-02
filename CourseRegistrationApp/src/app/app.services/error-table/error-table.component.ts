import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface ScheduleError {
  type: 'Error' | 'Warning';
  message: string;
}

@Component({
  selector: 'app-error-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './error-table.component.html',
  styleUrls: ['./error-table.component.css']
})
export class ErrorTableComponent {
  errors: ScheduleError[] = [
    { type: 'Error', message: 'Dr. Mohammed has a conflict in Slot 3 across campuses.' },
    { type: 'Error', message: 'Dr. Hassan double-booked in Abu Dhabi Slot 5.' },
    { type: 'Warning', message: 'CEN 302 offered in Abu Dhabi but not Al Ain.' }
  ];

  getRowClass(type: 'Error' | 'Warning'): string {
    return type === 'Error' ? 'error-row' : 'warning-row';
  }
}