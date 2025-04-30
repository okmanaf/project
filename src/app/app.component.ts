import { Component } from '@angular/core';
import { AddSessionComponent } from './app.services/add-session/add-session.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AddSessionComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Course Registration App';
}
