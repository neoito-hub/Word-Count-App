import { Component, Input, OnInit, ElementRef } from '@angular/core';
import { PostSentenceService, GetWordsService, UsersService } from './services';
import { LOCALSTORAGE_KEYS } from './config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  wordsList: Array<{ word: string; count: string }> = [];
  text: string;

  constructor(
    private postService: PostSentenceService,
    private getService: GetWordsService,
    private userService: UsersService
  ) {}
  ngOnInit() {
    // To keep the state of the user, we generate a uid in backend
    // if uid the get all the words entered by user and show
    if (localStorage.getItem(LOCALSTORAGE_KEYS.userId)) {
      this.getwords();
    } else {
      this.userService.create().subscribe();
    }
  }
  parseWordsList(resultObject) {
    // reset the old list
    this.wordsList.length = 0;

    Object.keys(resultObject).forEach(k =>
      this.wordsList.push({
        word: k,
        count: resultObject[k]
      })
    );
  }
  getwords() {
    this.getService.get().subscribe(r => {
      this.parseWordsList(r.word_data);
    });
  }
  onSubmit() {
    if (this.text) {
      this.postService.post(this.text).subscribe(r => {
        this.text = '';
        this.parseWordsList(r);
      });
    }
  }
}
