import { Component, OnInit } from '@angular/core';
import { Game } from 'src/models/game';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  pickCardAnimation = false;
  game: Game | undefined; // Typ Game

  constructor() { }

  ngOnInit(): void {
    this.newGame();
    console.log(this.game);
  }

  newGame() {
    this.game = new Game(); // Variable game bekommt ein neues Objekt erstellt, von dem was wir gerade angelegt haben.
  }

  takeCard() {
    this.pickCardAnimation = true;

  }

}
