import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface WorkloadEntry {
  name: string;
  assignedSessions: number;
  campus: string;
  department: 'CEN/EEN' | 'BME';
  sessions: string[];
  loadStatus: 'underloaded' | 'balanced' | 'overloaded';
}

@Component({
    imports: [CommonModule, FormsModule],
  standalone: true,
  selector: 'app-load-calculation',
  templateUrl: './load-calculation.component.html',
  styleUrls: ['./load-calculation.component.css']
})
export class LoadCalculationComponent implements OnInit {
  workloads: WorkloadEntry[] = [];
  readonly TARGET_LOAD = 4;
  expandedRow: string | null = null;

  constructor() {}

  ngOnInit(): void {
    this.initializeWorkloads();
  }

  private initializeWorkloads(): void {
    // Add initial workloads with properly calculated loadStatus
    this.addWorkload({
      name: 'Dr. Mohammed',
      assignedSessions: 3,
      campus: 'Abu Dhabi',
      department: 'CEN/EEN',
      sessions: ['CEN 301-01', 'CEN 302-01', 'EEN 201-02']
    });

    this.addWorkload({
      name: 'Dr. Hassan',
      assignedSessions: 5,
      campus: 'Al Ain',
      department: 'BME',
      sessions: ['BME Surgery 1', 'BME Surgery 2', 'BME Surgery 3', 'BME Surgery 4', 'BME Surgery 5']
    });

    this.addWorkload({
      name: 'Dr. Fatima',
      assignedSessions: 4,
      campus: 'Abu Dhabi',
      department: 'CEN/EEN',
      sessions: ['CEN 401-01', 'CEN 402-01', 'EEN 301-02', 'EEN 302-02']
    });
  }

  addWorkload(entry: Omit<WorkloadEntry, 'loadStatus'>): void {
    const workloadEntry: WorkloadEntry = {
      ...entry,
      loadStatus: this.calculateLoadStatus(entry.assignedSessions)
    };
    this.workloads.push(workloadEntry);
    this.sortWorkloads();
  }

  private sortWorkloads(): void {
    this.workloads.sort((a, b) => {
      if (a.department !== b.department) return a.department.localeCompare(b.department);
      if (a.campus !== b.campus) return a.campus.localeCompare(b.campus);
      return a.name.localeCompare(b.name);
    });
  }

  calculateLoadStatus(sessions: number): 'underloaded' | 'balanced' | 'overloaded' {
    if (sessions < this.TARGET_LOAD) return 'underloaded';
    if (sessions === this.TARGET_LOAD) return 'balanced';
    return 'overloaded';
  }

  getStatusClass(status: 'underloaded' | 'balanced' | 'overloaded'): string {
    return status;
  }

  toggleExpand(name: string): void {
    this.expandedRow = this.expandedRow === name ? null : name;
  }

  getDepartmentStats(department: 'CEN/EEN' | 'BME') {
    const deptWorkloads = this.workloads.filter(w => w.department === department);
    const total = deptWorkloads.reduce((sum, w) => sum + w.assignedSessions, 0);
    const average = deptWorkloads.length ? total / deptWorkloads.length : 0;
    
    return {
      total,
      average,
      instructors: deptWorkloads.length
    };
  }
}