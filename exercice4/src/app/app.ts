import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SurveyTableComponent } from './components/survey-table/survey-table.component';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet,SurveyTableComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('exercice_4');
}
