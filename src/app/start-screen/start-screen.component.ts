import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-start-screen',
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.scss']
})
export class StartScreenComponent implements OnInit {

  // private: router     Because we only need the router in this component.
  // public: router      If we want to use the router in HTML, then public.
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  newGame() {
    // Start game
    this.router.navigateByUrl('/game');
  }

}
