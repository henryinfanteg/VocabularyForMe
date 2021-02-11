import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { WordService } from '../core/services/word/word.service';
import { Word } from '../shared/entities/word';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page  {

  form: FormGroup;

  constructor(private formBuilder: FormBuilder, private wordService: WordService, public toastController: ToastController) {
    this.initializeForm();
  }

  initializeForm() {
    this.form = this.formBuilder.group({
      word: ['', Validators.required],
      meaning: ['', Validators.required],
    });

  }

  addWord() {
    if(this.form.valid) {
      let word = new Word();
      word.description = this.form.controls.word.value;
      word.meaning_es = this.form.controls.meaning.value;
      this.wordService.addWord(word).subscribe((response) => {
        if(response && response.status === 201) {
          this.form.controls.word.setValue('');
          this.form.controls.meaning.setValue('');
          this.showToastSimple('Word successfully created !', 'success');
        } else {
          this.showToastSimple('Something has gone wrong :(', 'danger');
        }
      });
    } else {
      this.showToastSimple('Invalid form', 'danger');
    }
    
  }

  async showToastSimple(description: string, type: string) {
      const toast = await this.toastController.create({
        message: description,
        duration: 3000,
        color: type
      });
      toast.present();
  }

}
