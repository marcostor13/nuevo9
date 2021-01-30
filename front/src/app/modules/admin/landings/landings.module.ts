import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingsRoutingModule } from './landings-routing.module';
import { AddComponent } from './add/add.component';
import { ListComponent } from './list/list.component';
import { HeaderModule } from '@shared/components/header/header.module';
import { FileUploadModule } from 'primeng/fileupload';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { ElementComponent } from './components/element/element.component';
import { OrderListModule } from 'primeng/orderlist';
import { SliderModule } from 'primeng/slider';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ColorPickerModule } from 'primeng/colorpicker';
import { AddElementComponent } from './add-element/add-element.component';


@NgModule({
  declarations: [
    AddComponent, 
    ListComponent, 
    ElementComponent,
    AddElementComponent,
  ],
  imports: [
    CommonModule,
    LandingsRoutingModule,
    HeaderModule,
    FileUploadModule,
    DialogModule,
    DropdownModule,
    FormsModule,
    OrderListModule,
    SliderModule,
    ConfirmDialogModule,
    InputSwitchModule,
    ColorPickerModule,
  ]
})
export class LandingsModule { }
