import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

declare const MFramework: any;

@Component({
  selector: 'app-add-session',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './add-session.component.html',
  styleUrls: ['./add-session.component.css']
})
export class AddSessionComponent {
  async handleFormSubmit(event: Event) {
    event.preventDefault();

    const courseCode = (document.getElementById('courseCode') as HTMLInputElement).value;
    const instructor = (document.getElementById('instructor') as HTMLInputElement).value;
    const campus = (document.getElementById('campus') as HTMLSelectElement).value;
    const slot = (document.getElementById('slot') as HTMLInputElement).value;

    const session = { courseCode, instructor, campus, slot };

    try {
      await MFramework.database.add('sessions', session);
      alert('Session added successfully!');
    } catch (err) {
      console.error('Failed to add session:', err);
    }
  }
}
