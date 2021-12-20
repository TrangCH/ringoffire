import { Component, OnInit } from '@angular/core';
import { Game } from 'src/models/game';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  pickCardAnimation = false;
  currentCard: string = '';
  game: Game; // Typ Game

  constructor() { }

  ngOnInit(): void {
    this.newGame();
  }

  newGame() {
    this.game = new Game(); // Variable game bekommt ein neues Objekt erstellt, von dem was wir gerade angelegt haben.
    console.log(this.game);
  }

  takeCard() {
    if (!this.pickCardAnimation) {
      // stack.pop(): pop() nimmt den letzten Wert aus dem Array und gibt es zurück und löscht diese auch.
      this.currentCard = this.game.stack.pop();
      console.log(this.currentCard);
      this.pickCardAnimation = true;

      setTimeout(() => {
        this.pickCardAnimation = false;
      }, 1500);
    }
  }
}
