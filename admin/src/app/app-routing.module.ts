// Angular
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// Chart
import { ChartComponent } from "src/app/chart/chart.component";
// Chatbot
import { ChatbotComponent } from "src/app/chatbot/chatbot.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'chatbot',
    pathMatch: 'full'
  },
  { path: 'chart', component: ChartComponent },
  { path: 'chatbot', component: ChatbotComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
