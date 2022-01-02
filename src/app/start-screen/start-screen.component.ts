import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Game } from 'src/models/game';

@Component({
  selector: 'app-start-screen',
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.scss']
})
export class StartScreenComponent implements OnInit {

  // private: router     Because we only need the router in this component.
  // public: router      If we want to use the router in HTML, then public.
  // Firestore importieren:
  constructor(private firestore: AngularFirestore, private router: Router) { }

  ngOnInit(): void {
  }

  newGame() {
    let game = new Game(); // Neues Spiel anlegen
    // Start game
    this.firestore // Zugriff auf firestore
      .collection('games')  // Zugrifft auf die Sammlung 'games'
      .add(game.toJSON()) // JSON hinzugefügt {'Hallo': 'Welt'} // Unser game Objekt wird in ein JSON umgewandelt.
      // then nur einmal aufrufen. Macht Sinn, da nur jeweils ein neues Spiel.
      .then((gameInfo: any) => { // .then Methode kann nur einmal aufgerufen werden. Funktioniert genauso wie .subscribe (kann mehrfach aufgerufen werden)
        console.log(gameInfo); // gameInfo.id: hier
        this.router.navigateByUrl('/game/' + gameInfo.id); 
      });    
     
  }

}
