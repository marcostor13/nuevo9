import { Component, OnInit } from '@angular/core';
import { ApiService } from '@services/api.service';
import { GeneralService } from '@services/general.service';
import { SubSink } from 'subsink';
import { Landing } from '../models/add-landing';
import { IResponseApi } from './../../../../models/responses';
import { LandingsService } from './../services/landings.service';
import { cloneDeep } from 'lodash-es';
import { Ielement } from 'src/app/modules/admin/landings/models/add-landing';
import { ConfirmationService, MessageService } from 'primeng/api';
import { IDataApi } from './../../../../models/dataapi';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  private subs = new SubSink()
  uploadPercentBackground: number
  uploadPercentLogo: number
  landing: Landing
  response: IResponseApi

  elements: Array<Object> = []
  currentElement: Ielement = null
  
  modal: boolean = false
  invalid: boolean = false

  backgroundName: String
  logoName: String
  background: any

  logoFiles: File[] = []
  backgroundFiles: File[] = []

  constructor(
    private general: GeneralService,    
    private api: ApiService,
    private landingService: LandingsService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getLandingData()
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  initializateLanding() {
    const landing =cloneDeep(new Landing)
    this.landingService.setLandingData(landing)
  }

  updateLandingData(){
    this.landingService.setLandingData(this.landing)
  }

  getLandingData(){
    this.subs.add(
      this.landingService.getLandingData().subscribe((landing:Landing)=>{
        if(landing){
          this.landing = cloneDeep(landing)       
        }else{
          this.initializateLanding()
        }
      })
    )
  }  

  onUploadBackground(event) {
    this.general.isLoad('1')
    this.landing.backgroundName = event.currentFiles[0].name
    this.subs.add(
      this.general.uploadImage(event.currentFiles[0], 'landings/backgrounds/').subscribe((res:any) => {
        if(typeof res === 'number'){
          this.uploadPercentBackground = res
        }else{
          res.subscribe((url)=>{
            this.landing.backgroundURL = url            
            this.general.isLoad('0')
            this.backgroundFiles = []
            this.uploadPercentBackground = 0            
          })
        }
        
      })
    )
  }

  onUploadLogo(event) {
    this.general.isLoad('1')
    this.landing.logoName = event.currentFiles[0].name
    this.subs.add(
      this.general.uploadImage(event.currentFiles[0], 'landings/logos/').subscribe((res: any) => {
        if (typeof res === 'number') {
          this.uploadPercentLogo = res
        } else {
          res.subscribe((url) => {
            this.landing.logoURL = url
            this.general.isLoad('0')
            this.logoFiles = []
            this.uploadPercentLogo = 0
          })
        }

      })
    ) 
  }

  addElement(type:string, item:Ielement, i:number){
    if (type === 'edit'){    
      this.landing.elementSelected = item
      this.landing.elementSelectedIndex = i
      this.updateLandingData()
    }else{
      this.landing.elementSelected = null
      this.landing.elementSelectedIndex = null  
      this.updateLandingData()
    }
    this.router.navigate(['admin/landings/add-element'])
  }

  hideModal(){
    this.modal = false
  }

  validateLanding(){
    this.messageService.clear();
    let res = true
    this.invalid = false
    const text = []
    if(!this.landing.name){
      res = false    
      this.invalid = true  
      this.messageService.add({ severity: 'error', summary: 'Validación', detail: 'Debe ingresar un nombre' });
    }
    if (this.landing.elements.length === 0){
      this.invalid = true  
      res = false
      this.messageService.add({ severity: 'error', summary: 'Validación', detail: 'Debe agregar un elemento' });
    }
    return {
      isValid: res,
      responses: text
    }
  }

  saveLanding(){     
    const data = new IDataApi
    if (this.validateLanding().isValid){      
      this.subs.add(
        this.landingService.saveLanding(this.landing).subscribe((res:IResponseApi)=>{
          if(!this.landing._id){
            this.landing = null          
            this.updateLandingData()
          }
          this.messageService.add({ severity: 'success', summary: 'Éxito', detail: res.message })
        })
      )        
    }
  } 
  
  deleteItem(index:number) {
    this.confirmationService.confirm({
      message: 'Seguro que desea eliminar el elemento?',
      accept: () => {
        this.landing.elements.splice(index, 1)
        this.updateLandingData()
      },
      acceptButtonStyleClass:"bg-color5",
      acceptLabel:"Si"
    });
  }

  back(){
    if (this.landing){
      this.confirmationService.confirm({
        message: 'Seguro que desea salir?',
        accept: () => {
          this.landing = null
          this.updateLandingData()
          this.router.navigate(['/admin/landings/list'])
        },
        acceptButtonStyleClass: "bg-color5 btn3",
        acceptLabel: "Si, salir"
      });
    }else{
      this.router.navigate(['/admin/landings/list'])
    }    
  }


}
