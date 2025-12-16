import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { SurveyModel } from '../models/survey.model';
import { SurveyService } from '../services/survey.service';
import { LoadSurveys } from './survey.actions';
import { tap } from 'rxjs/operators';

export interface SurveyStateModel {
  surveys: SurveyModel[];
}

@State<SurveyStateModel>({
  name: 'surveys',
  defaults: {
    surveys: []
  }
})
@Injectable()
export class SurveyState {
  constructor(private surveyService: SurveyService) {}

  @Selector()
  static getSurveys(state: SurveyStateModel) {
    return state.surveys;
  }

  @Action(LoadSurveys)
  loadSurveys(ctx: StateContext<SurveyStateModel>) {
    console.log('LoadSurveys action triggered');
    const surveys = this.surveyService.getSurveys();
    console.log('Surveys from service:', surveys.length);
    ctx.patchState({ surveys });
    console.log('State updated with surveys');
  }
}