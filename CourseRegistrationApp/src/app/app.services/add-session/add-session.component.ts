import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

declare const MFramework: any;

@Component({
  imports: [CommonModule, FormsModule],
  standalone: true,
  selector: 'app-add-session',
  templateUrl: './add-session.component.html',
  styleUrls: ['./add-session.component.css'],
})
export class AddSessionComponent {
  step: number = 1;
  studentId: string = '';
  studentIdValid: boolean = false;
  studentIdError: string = '';
  
  selectedMajor: string = '';
  selectedCampus: string = '';
  courseCode: string = '';
  
  instructors: string[] = [];
  timeSlots: string[] = [];
  selectedInstructor: string = '';
  selectedSlot: string = '';
  
  courseData: any = {
    'CS101': {
      instructors: ['Mohammed Ghazal', 'Huma Zia'],
      timeSlots: ['9:00 AM - 10:30 AM', '11:00 AM - 12:30 PM', '2:00 PM - 3:30 PM']
    },
    'EE201': {
      instructors: ['Ali Ahmed', 'Sara Khan'],
      timeSlots: ['8:00 AM - 9:30 AM', '10:00 AM - 11:30 AM']
    }
  };

  validateStudentId(): void {
    if (this.studentId.length !== 7) {
      this.studentIdValid = false;
      this.studentIdError = 'Student ID must be exactly 7 digits';
    } else if (!/^\d+$/.test(this.studentId)) {
      this.studentIdValid = false;
      this.studentIdError = 'Student ID must contain only numbers';
    } else {
      this.studentIdValid = true;
      this.studentIdError = '';
    }
  }

  proceedToMajor(): void {
    if (this.studentIdValid) {
      this.step = 2;
    }
  }

  proceedToCampus(): void {
    if (this.selectedMajor) {
      this.step = 3;
    }
  }

  proceedToCourse(): void {
    if (this.selectedCampus) {
      this.step = 4;
    }
  }

  proceedToSession(): void {
    if (this.courseCode) {
      this.step = 5;
    }
  }

  fetchCourseDetails(): void {
    if (this.courseCode && this.courseData[this.courseCode]) {
      this.instructors = this.courseData[this.courseCode].instructors;
      this.timeSlots = this.courseData[this.courseCode].timeSlots;
    } else {
      this.instructors = [];
      this.timeSlots = [];
    }
    this.selectedInstructor = '';
    this.selectedSlot = '';
  }

  async handleFormSubmit(event: Event) {
    event.preventDefault();
    
    const session = {
      studentId: this.studentId,
      major: this.selectedMajor,
      campus: this.selectedCampus,
      courseCode: this.courseCode,
      instructor: this.selectedInstructor,
      slot: this.selectedSlot
    };

    try {
      await MFramework.database.add('sessions', session);
      alert('Session added successfully!');
      this.resetForm();
    } catch (err) {
      console.error('Failed to add session:', err);
      alert('Failed to add session. Please try again.');
    }
  }

  private resetForm(): void {
    this.step = 1;
    this.studentId = '';
    this.studentIdValid = false;
    this.selectedMajor = '';
    this.selectedCampus = '';
    this.courseCode = '';
    this.instructors = [];
    this.timeSlots = [];
    this.selectedInstructor = '';
    this.selectedSlot = '';
  }
}