import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GeneralService } from '@services/general.service';
import { LandingsService } from '../admin/landings/services/landings.service';
import { SubSink } from 'subsink';
import { Landing } from '../admin/landings/models/add-landing';
import { IResponseApi } from 'src/app/models/responses';
import { cloneDeep } from 'lodash-es';
import { Ielement } from 'src/app/modules/admin/landings/models/add-landing';
import { IEmailData } from 'src/app/models/emailData';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-landings',
  templateUrl: './landings.component.html',
  styleUrls: ['./landings.component.scss']
})
export class LandingsComponent implements OnInit {

  private subs = new SubSink()
  id: string
  params: any
  landing: Landing
  validation: boolean = false
  invalidRut: boolean = false
  form: any
  response: string
  calendar: Date; 

  constructor(
    private route: ActivatedRoute, 
    private general: GeneralService,
    private adminLandingService: LandingsService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {
    this.id = this.route.snapshot.paramMap.get('id') 
    this.getParametersURL() 
    this.getDataLanding()
   }

  ngOnInit(): void {
  }

  getParametersURL(){
    this.activatedRoute.queryParams.subscribe(params => {
      this.params = params;      
    });
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  getDataLanding(){
    this.subs.add(
      this.adminLandingService.getLandingByID(this.id).subscribe((res:IResponseApi)=>{
        this.landing = cloneDeep(res.data)
        this.general.c(' GetDataLanding', this.landing)
      })
    )
  }
  
  validateRut(value:string){
    if(value && value.length === 4){
      this.invalidRut = false
      if (this.params.rut.substr(-4) === value){
        this.validation = true    
      }else{
        this.invalidRut = true
      }
      
    }
  }

  sendForm($event:any, el:Ielement){    
    
    let data:any = {}; 
    
    for (let i = 0; i < el.inputs.length; i++) {
      const element = $event.target[i]
      data[element.id] = element.value
    }

    data = {...data, ...this.params}
    

    if(el.email){
      this.general.isLoad('1')
      const dataMail = new IEmailData
      dataMail.dest = el.email
      dataMail.data = data
      dataMail.from = environment.from
      dataMail.fromname = environment.fromname
      dataMail.subject = 'Nuevo Formulario'
      dataMail.type = '1'          
      this.subs.add(
        this.general.sendMail(dataMail).subscribe((res: IResponseApi)=>{
          if (el.successMessage){
            this.response = el.successMessage
          }else{
            this.response = 'Mensaje Enviado'
          }
          this.general.isLoad('0')
        })
      )
    }
    return false;
    
  }

  getText(text){
    const regex = '\{(.*?)\}'
    const res = [...text.matchAll(regex)]
    const response = []
    res.map((r:any)=>{      
      if(this.params[r[1]]){
        text = text.replaceAll(r[0], this.params[r[1]])
      }
    })
    return text
  }

  getMinDate(minToday:boolean){
    if (minToday){
      return new Date()
    }else{
      return null
    }
  }  

  sendCalendar(el: Ielement) {

    const data = { ...this.params, fecha: formatDate(this.calendar, 'dd/MM/yyyy', 'en')}        

    if (el.email) {
      this.general.isLoad('1')
      const dataMail = new IEmailData
      dataMail.dest = el.email
      dataMail.data = data
      dataMail.from = environment.from
      dataMail.fromname = environment.fromname
      dataMail.subject = 'Nuevo Calendario'
      dataMail.type = '1'
      this.subs.add(
        this.general.sendMail(dataMail).subscribe((res: IResponseApi) => {
          if (el.successMessage) {
            this.response = el.successMessage
          } else {
            this.response = 'Mensaje Enviado'
          }
          this.general.isLoad('0')
        })
      )
    }
    return false;

  }

  redirect(url:string){
    window.location.href=url
  }

}
