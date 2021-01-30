import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GeneralService } from '@services/general.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Landing } from '../models/add-landing';
import { LandingsService } from '../services/landings.service';
import { SubSink } from 'subsink';
import { IResponseApi } from './../../../../models/responses';
import { cloneDeep } from 'lodash-es';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  private subs = new SubSink()
  landings: Landing[]

  constructor(
    private general: GeneralService,
    private landingService: LandingsService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getLandingsData()
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  getLandingsData() {
    this.subs.add(
      this.landingService.getLandings().subscribe((res: IResponseApi) => {
        this.general.c('getLandingsData', res.data)
        if (res.data) {
          this.landings = cloneDeep(res.data)
        } 
      })
    )
  }

  deleteConfirmation(id: string, index:number) {
    this.confirmationService.confirm({
      message: 'Seguro que desea eliminar?',
      accept: () => {
        this.deleteLanding(id, index)
      },
      acceptButtonStyleClass: "bg-color5",
      acceptLabel: "Si"
    });
  }

  deleteLanding(id:string, index:number){
    this.subs.add(
      this.landingService.deleteLanding(id).subscribe((res: IResponseApi)=>{
        this.landings = cloneDeep([...this.landings.filter((landing:Landing) => landing._id !== id)])
        this.general.c('New Landings', this.landings)
        this.messageService.add({ severity: 'success', summary: 'Éxito', detail: res.message })
      }, error => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message })
      })
    )
  }


  editLanding(landing:Landing){
    this.landingService.editLanding(landing)
    this.router.navigate(['/admin/landings/add'])   
  }

  viewLanding(landing: Landing) {
    this.router.navigate([`/landings/${landing._id}`])
  }

  redirectCreate(){
    this.router.navigate(['/admin/landings/add'])
  }

  back(){

  }

}
