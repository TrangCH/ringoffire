import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameComponent } from './game/game.component';
import { StartScreenComponent } from './start-screen/start-screen.component';

const routes: Routes = [
  // path: '', Nothing, because it should be loaded at the beginning.
  { path: '', component: StartScreenComponent },
  { path: 'game/:id', component: GameComponent }, // : sagt, dass nach dem game/ eine ID kommt. => Diese Route verfügt über eine Variable.
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
