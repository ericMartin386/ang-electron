import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path: 'agent', loadChildren: './agent/agent.module#AgentModule'},
  {path: 'agent-installer', loadChildren: './agent-installer/agent-installer.module#AgentInstallerModule'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
