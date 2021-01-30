import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GeneratorRoutingModule } from './generator-routing.module';
import { GeneratorComponent } from './generator.component';
import { HeaderModule } from './../../../../shared/components/header/header.module';

@NgModule({
  declarations: [GeneratorComponent],
  imports: [
  
  CommonModule,
    GeneratorRoutingModule,
    HeaderModule
  ]
})
export class GeneratorModule { }
