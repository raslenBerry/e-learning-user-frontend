import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-quizz',
  templateUrl: './quizz.component.html',
  styleUrls: ['./quizz.component.css']
})
export class QuizzComponent implements OnInit {
  

  ngOnInit(): void {
  }
  constructor(private readonly quizService:QuizService) { }
  
  startQuiz(){
    this.quizService.startQuiz('username').subscribe(
      (response) => {
        console.log(response);
      }
    );
    
  }
}
