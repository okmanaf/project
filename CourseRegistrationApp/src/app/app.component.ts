import { Component } from '@angular/core';
import { AddSessionComponent } from './app.services/add-session/add-session.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ErrorTableComponent } from './app.services/error-table/error-table.component';
import { LoadCalculationComponent } from './app.services/load-calculation/load-calculation.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    AddSessionComponent,
    CommonModule,
    FormsModule,
    ErrorTableComponent,
    LoadCalculationComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Course Registration App';
}