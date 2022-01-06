import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-player-mobile',
  templateUrl: './player-mobile.component.html',
  styleUrls: ['./player-mobile.component.scss']
})
export class PlayerMobileComponent implements OnInit {

  @Input() name;
  @Input() image = 'player2.png'; // Wenn nichts eingegeben wird, dann player2.png, sonst image.
  @Input() playerActive: boolean = false; // Standardmäßig sind keine Spieler aktiv

  

  constructor() { }

  ngOnInit(): void {
  }

}
