export class Game {
    // XY: abc (Datentyp)
    public players: string[] = []; // Spieler
    public stack: string[] = []; // ungespielten Karten
    public playedCards: string[] = []; // gespielte Karten
    public currentPlayer: number = 0; 

    constructor() {
        for (let i = 1; i < 14; i++) {
            this.stack.push('spade_' + i);
            this.stack.push('hearts_' + i);
            this.stack.push('clubs_' + i);
            this.stack.push('diamonds_' + i);
        }

        shuffle(this.stack);
    }

    /**
     * 
     * @returns Möglichkeit, unser Game umzuwandeln in ein JSON in Firebase
     */
    public toJSON() {
        return {
            // Anstatt statische Daten z.B. 'Andreas', geben wir uns eine Variable zurück.
            players: this.players, // Feld player
            stack: this.stack,
            playedCards: this.playedCards,
            currentPlayer: this.currentPlayer
        };
    }

}


function shuffle(array: any) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }