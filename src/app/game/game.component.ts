import { Component, OnInit } from '@angular/core';
import { Game } from 'src/models/game';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { EditPlayerComponent } from '../edit-player/edit-player.component';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  // Hinweis: Alle Variablen müssen synchronisiert sein, damit man die auch in der anderen Instanz anzeigen können.
  //pickCardAnimation = false; => game.ts
  //currentCard: string = '';  => game.ts
  game: Game; // Typ Game
  gameId: string;
  enoughCards = true;
  noCards = false;
  // freePlacesForParticipants = true;
  gameOver = false;

  constructor(private route: ActivatedRoute, private firestore: AngularFirestore, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.newGame();
    this.route.params.subscribe((params) => {
      console.log(params['id']);
      this.gameId = params['id'];

      this
        .firestore
        .collection('games') // items = games 
        .doc(this.gameId)
        .valueChanges() // valueChanges() abonnieren mit:
        .subscribe((game: any) => { // game kann alles sein und damit auch ein valides JSON. Unsere IDE ist dann zufrieden. 
          // Es unterliegt unserer Obhut, dass game das JSON auch wirklich diese Teile hat.
          console.log('Game update', game); // Jedes Mal, wenn in der Datenbank was verändert wird, wird diese Änderung mir ausgeloggt.
          // Aktualisieren. Ich update alles in unserem Game.
          this.game.currentPlayer = game.currentPlayer;
          this.game.playedCards = game.playedCards;
          this.game.players = game.players;
          this.game.player_images = game.player_images;
          this.game.stack = game.stack;
          this.game.pickCardAnimation = game.pickCardAnimation;
          this.game.currentCard = game.currentCard;
        });

    });

  }

  newGame() { // Es wird ein neues Game Objekt erstellt.
    this.game = new Game(); // Variable game bekommt ein neues Objekt erstellt, von dem was wir gerade angelegt haben.
    console.log(this.game);
    // this.firestore // Zugriff auf firestore
    //   .collection('games')  // Zugrifft auf die Sammlung 'games'
    //   .add(this.game.toJSON()); // JSON hinzugefügt {'Hallo': 'Welt'} // Unser game Objekt wird in ein JSON umgewandelt.
  }

  takeCard() {
    if (this.game.stack.length == 0) {
      this.gameOver = true;
    } else
    if ((!this.game.pickCardAnimation) && (this.game.stack.length > 0) && (this.game.players.length > 0)) {
      // stack.pop(): pop() nimmt den letzten Wert aus dem Array und gibt es zurück und löscht diese auch.
      this.game.currentCard = this.game.stack.pop();
      this.game.pickCardAnimation = true;
      console.log('New card: ' + this.game.currentCard);
      console.log('Game is ', this.game);

      this.game.currentPlayer++;
      this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;

      this.saveGame(); // Spiel noch einmal speichern.

      setTimeout(() => {
        this.game.playedCards.push(this.game.currentCard);
        this.game.pickCardAnimation = false;
        this.saveGame(); // Spiel noch einmal speichern.
      }, 1000);
      this.verificationOfTheNumberOfCards();
    }
  }

  // limitTheNumberOfPlayers() {
  //   if (this.game.players.length > 2) {
  //     this.freePlacesForParticipants = false;
  //   }
  // }

  verificationOfTheNumberOfCards() {
    if (this.game.stack.length == 0) {
      this.enoughCards = false;
      this.noCards = true;
    }
  }

  editPlayer(playerId: number) {
    console.log('Edit player', playerId);

    const dialogRef = this.dialog.open(EditPlayerComponent);//, { Den Rest brauchen wir erstmal nicht.

    dialogRef.afterClosed().subscribe((change: string) => { // result
      // Existiert die Variable name und wenn ja, dann prüfe, ob die Länge des Namens echt größer 0 ist.
      if (change) { // Nur wenn change zurückgegeben wird.
        if (change == 'DELETE') {
          this.game.players.splice(playerId, 1);
          this.game.player_images.splice(playerId, 1);
        } else {
          this.game.player_images[playerId] = change;
        }
        this.saveGame();
      }
    });
  }

  openDialog(): void {                // Hier: Klasse einfügen DialogAddPlayerComponent
    // this.limitTheNumberOfPlayers();
    const dialogRef = this.dialog.open(DialogAddPlayerComponent//, { Den Rest brauchen wir erstmal nicht.
      //width: '250px',
      //data: {name: this.name, animal: this.animal}, // Beispiel, um unserer Komponente Daten hinzu zu fügen.
      //}
    );

    dialogRef.afterClosed().subscribe((name: string) => { // result
      // Existiert die Variable name und wenn ja, dann prüfe, ob die Länge des Namens echt größer 0 ist.
      if (name && name.length > 0) {
        this.game.players.push(name);
        this.game.player_images.push('player2.png');
        //this.animal = result; // Möglichkeit, Daten zurück zu bekommen.
        this.saveGame();
      }
    });
  }

  saveGame() {
    this
      .firestore
      .collection('games') // items = games 
      .doc(this.gameId)
      .update(this.game.toJSON());
  }

}
