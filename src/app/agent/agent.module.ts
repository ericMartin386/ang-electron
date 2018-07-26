import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomMatModule } from './../custom-mat/custom-mat.module';
import { AgentRoutingModule } from './agent-routing.module';
import { AgentComponent } from './agent/agent.component';

@NgModule({
  imports: [
    CommonModule,
    CustomMatModule,
    AgentRoutingModule
  ],
  declarations: [AgentComponent]
})
export class AgentModule { }
