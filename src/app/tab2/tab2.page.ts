import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { word } from '../shared/entities/word';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  form: FormGroup;
  resp: boolean;
  showError: boolean;
  showAnswerDefault = 'Show Answer';
  showAnswer = this.showAnswerDefault;


  wordsList: Array<word> = [
    {description: 'Awful', meaningSpanish: 'Horrible'},
    {description: 'Matter', meaningSpanish: 'Importar'},
    {description: 'Helpful', meaningSpanish: 'Servicial'},
    {description: 'Useful', meaningSpanish: 'Útil'},
    {description: 'Should', meaningSpanish: 'Debería'}
  ];


  constructor(private formBuilder: FormBuilder) {
    this.initializeForm();
  }

  initializeForm() {
    this.form = this.formBuilder.group({
      answer: ['', Validators.required]
    });
  }

  verify() {
    if(this.form.controls.answer.value.toLowerCase().trim() === this.wordsList[0].meaningSpanish.toLowerCase()) {
      this.restoreParameters();
      if(this.wordsList.length > 0) {
        this.wordsList.shift();
      }
    } else {
      this.showError = true;
    }
  }

  restoreParameters() {
    this.resp = true;
    this.showError = false;
    this.form.controls.answer.setValue('');
    this.showAnswer = this.showAnswerDefault;
  }

  showFlagError() {
    if(this.showError) {
      return 'WRONG';
    }
  }

  toReveal() {
    this.showAnswer = this.wordsList[0].meaningSpanish;
  }

}
