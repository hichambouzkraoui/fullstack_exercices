import {AfterViewInit, Component, ViewChild, inject, OnInit, ChangeDetectorRef} from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';

import { SurveyModel } from '../../models/survey.model';
import { Store } from '@ngxs/store';
import { SurveyState } from '../../state/survey.state';
import { LoadSurveys } from '../../state/survey.actions';
import { DatePipe, CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'survey-table-component',
  imports: [CommonModule, MatTableModule, MatPaginatorModule, MatSortModule, DatePipe, MatFormFieldModule, MatInputModule, MatSelectModule, MatDatepickerModule, MatNativeDateModule, MatButtonModule, MatProgressSpinnerModule, FormsModule],
  templateUrl: './survey-table.component.html',
  styleUrl: './survey-table.component.css',
})
export class SurveyTableComponent implements OnInit, AfterViewInit {
  private store = inject(Store);
  private cdr = inject(ChangeDetectorRef);
  displayedColumns: string[] = ['id', 'name', 'description', 'assetId','interval','status','createdAt','updatedAt'];
  dataSource = new MatTableDataSource<SurveyModel>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  startDate: Date | null = null;
  endDate: Date | null = null;
  statusFilter = '';
  allSurveys: SurveyModel[] = [];
  loading = true;
  error: string | null = null;
  multiSort: {column: string, direction: 'asc' | 'desc'}[] = [];

  ngOnInit() {
    try {
      this.store.select(SurveyState.getSurveys).subscribe({
        next: (surveys) => {
          this.allSurveys = surveys;
          this.dataSource.data = surveys;
          this.loading = false;
          this.error = null;
        },
        error: (err) => {
          this.error = 'Failed to load surveys. Please try again.';
          this.loading = false;
          console.error('Error loading surveys:', err);
        }
      });
      
      this.store.dispatch(new LoadSurveys());
    } catch (err) {
      this.error = 'Failed to initialize survey data.';
      this.loading = false;
      console.error('Error in ngOnInit:', err);
    }
  }

  ngAfterViewInit() {
    if (this.paginator && this.sort) {
      this.paginator.pageSize = 10;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      
      // Override sort function for multi-column sorting
      this.dataSource.sortData = (data: SurveyModel[]) => {
        if (this.multiSort.length === 0) return data;
        
        return data.sort((a, b) => {
          for (const sortItem of this.multiSort) {
            const aValue = (a as any)[sortItem.column];
            const bValue = (b as any)[sortItem.column];
            
            let comparison = 0;
            if (aValue > bValue) comparison = 1;
            if (aValue < bValue) comparison = -1;
            
            if (comparison !== 0) {
              return sortItem.direction === 'asc' ? comparison : -comparison;
            }
          }
          return 0;
        });
      };
    }
  }

  applyFilter() {
    try {
      setTimeout(() => {
        this.loading = true;
        this.error = null;
        
        setTimeout(() => {
          try {
            let filtered = this.allSurveys;
            
            if (this.statusFilter) {
              filtered = filtered.filter(survey => survey.status === this.statusFilter);
            }
            
            if (this.startDate) {
              filtered = filtered.filter(survey => new Date(survey.createdAt) >= this.startDate!);
            }
            
            if (this.endDate) {
              filtered = filtered.filter(survey => new Date(survey.createdAt) <= this.endDate!);
            }
            
            this.dataSource.data = filtered;
            this.loading = false;
            this.cdr.detectChanges();
          } catch (err) {
            this.error = 'Failed to apply filters. Please try again.';
            this.loading = false;
            console.error('Error applying filters:', err);
            this.cdr.detectChanges();
          }
        }, 5000);
      }, 0);
    } catch (err) {
      this.error = 'Failed to start filtering operation.';
      this.loading = false;
      console.error('Error in applyFilter:', err);
    }
  }

  clearFilters() {
    // Clear form values immediately
    this.startDate = null;
    this.endDate = null;
    this.statusFilter = '';
    
    // Defer loading state changes to avoid change detection errors
    setTimeout(() => {
      this.loading = true;
      
      setTimeout(() => {
        this.dataSource.data = this.allSurveys;
        this.loading = false;
        this.cdr.detectChanges();
      }, 300);
    }, 0);
  }

  onSortChange(column: string, event: MouseEvent) {
    try {
      if (!event.shiftKey) {
        this.multiSort = [];
      }
      
      const existingIndex = this.multiSort.findIndex(s => s.column === column);
      
      if (existingIndex >= 0) {
        const existing = this.multiSort[existingIndex];
        if (existing.direction === 'asc') {
          existing.direction = 'desc';
        } else {
          this.multiSort.splice(existingIndex, 1);
        }
      } else {
        this.multiSort.push({ column, direction: 'asc' });
      }
      
      this.dataSource.data = [...this.dataSource.data];
      this.error = null;
    } catch (err) {
      this.error = 'Failed to sort data. Please try again.';
      console.error('Error in sorting:', err);
    }
  }

  getSortDirection(column: string): string {
    const sort = this.multiSort.find(s => s.column === column);
    return sort ? sort.direction : '';
  }

  getSortIndex(column: string): number {
    const index = this.multiSort.findIndex(s => s.column === column);
    return index >= 0 ? index + 1 : 0;
  }





}
