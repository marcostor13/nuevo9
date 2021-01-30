import { Component, OnInit } from '@angular/core';
import { SubSink } from 'subsink';
import { Ielement, Landing } from '../models/add-landing';
import { LandingsService } from '../services/landings.service';
import { cloneDeep } from 'lodash-es';
import { GeneralService } from '@services/general.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-element',
  templateUrl: './add-element.component.html',
  styleUrls: ['./add-element.component.scss']
})
export class AddElementComponent implements OnInit {

  private subs = new SubSink()
  el: Ielement
  elementSelectedIndex: number

  selectElements: Array<Object> = [
    { name: 'Imagen' },
    { name: 'Texto' },
    { name: 'Formulario' },
    { name: 'Iconos' },
    { name: 'Calendario' },
  ]

  elementType: string = ''

  constructor(
    private landingService: LandingsService,
    private general: GeneralService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getLandingData()
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  getLandingData() {
    this.subs.add(
      this.landingService.getLandingData().subscribe((landing: Landing) => {
        this.general.c('getLandingData', landing)
        if (landing && landing.elementSelected) {
          if (landing.elementSelected) {
            this.el = cloneDeep(landing.elementSelected)      
            this.elementSelectedIndex = landing.elementSelectedIndex
            this.elementType = this.el.type
          }else{
            this.el = new Ielement
          }
        }
      })
    )
  }
  
  saveElement($event) {
    this.router.navigate(['admin/landings/add'])
  }

  back(){
    this.router.navigate(['admin/landings/add'])
  }

}
