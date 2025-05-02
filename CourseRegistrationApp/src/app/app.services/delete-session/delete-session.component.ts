import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Session {
  id: number;
  course: string;
  instructor: string;
  capacity: string;
  slot: number;
  campus: string;
}

@Component({
    imports: [CommonModule, FormsModule],
  standalone: true,
  selector: 'app-delete-session',
  templateUrl: './delete-session.component.html',
  styleUrls: ['./delete-session.component.css']
})
export class SessionManagerComponent {
  sessions: Session[] = [];
  newSession: Session = {
    id: 1,
    course: '',
    instructor: '',
    capacity: 'Regular',
    slot: 1,
    campus: 'Abu Dhabi'
  };

  addSession() {
    if (this.newSession.course && this.newSession.instructor) {
      this.sessions.push({ ...this.newSession });
      this.resetForm();
    }
  }

  deleteSession(index: number) {
    this.sessions.splice(index, 1);
  }

  resetForm() {
    this.newSession = {
      id: 1,
      course: '',
      instructor: '',
      capacity: 'Regular',
      slot: 1,
      campus: 'Abu Dhabi'
    };
  }
}