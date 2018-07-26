import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CustomMatModule } from './../custom-mat/custom-mat.module';
import { AgentInstallerRoutingModule } from './agent-installer-routing.module';
import { AgentInstallerComponent } from './agent-installer/agent-installer.component';

@NgModule({
  imports: [
    CommonModule,
    CustomMatModule,
    AgentInstallerRoutingModule
  ],
  declarations: [AgentInstallerComponent]
})
export class AgentInstallerModule { }
