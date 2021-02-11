import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { WordService } from '../core/services/word/word.service';
import { Word } from '../shared/entities/word';
import { Config } from '../configs/config';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  form: FormGroup;
  resp: boolean;
  showError: boolean;
  showAnswerDefault = 'Show Answer';
  showAnswer = this.showAnswerDefault;


  wordsList: Array<Word> = [];


  constructor(private formBuilder: FormBuilder, private WordService: WordService) {
    this.initializeForm();
  }

  ngOnInit() {
    this.getWords(Config.quanWord);
  }

  initializeForm() {
    this.form = this.formBuilder.group({
      answer: ['', Validators.required]
    });
  }

  getWords(cant: number) {
    this.WordService.getShowWords(cant).subscribe((response: any) => {
      if(response && response.status === 200) {
        this.wordsList = response.body;
      }
    });
  }

  verify() {
    if(this.form.controls.answer.value.toLowerCase().trim() === this.wordsList[0].meaning_es.toLowerCase()) {
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
    this.showAnswer = this.wordsList[0].meaning_es;
  }

}
