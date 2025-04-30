import { Component } from '@angular/core';
import { AddSessionComponent } from './app.services/add-session/add-session.component';
import { CommonModule } from '@angular/common';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AddSessionComponent],
  templateUrl: './app.component.html',
  styleUrls: []
})
export class AppComponent {
  title = 'Course Registration App';
}
console.log('Image path:', 'assets/images/your-image.jpg');