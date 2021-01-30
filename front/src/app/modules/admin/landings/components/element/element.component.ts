import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SubSink } from 'subsink';
import { Ielement, IICon, Landing, IInput } from '../../models/add-landing';
import { LandingsService } from '../../services/landings.service';
import { GeneralService } from '@services/general.service';
import { cloneDeep } from 'lodash-es';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-element',
  templateUrl: './element.component.html',
  styleUrls: ['./element.component.scss']
})
export class ElementComponent implements OnInit {
  
  @Input() elementType: string;
  @Output() send = new EventEmitter<Object>();

  elementSelectedIndex:number
  private subs = new SubSink()
  el: Ielement = new Ielement
  images: File[] = []  
  imagesIcon: File[] = []  
  uploadPercent: number
  uploadPercentIcon: number
  modal: boolean = false
  currentInput: IInput = new IInput
  currentIcon: IICon = new IICon
  modalData: string;

  constructor(
    private landingService: LandingsService,
    private general: GeneralService,
    private messageService: MessageService,
  ) { }

  
  ngOnInit(): void {   
    this.getLandingData()
  }  

  getLandingData() {
    this.subs.add(
      this.landingService.getLandingData().subscribe((landing: Landing) => {
        if (landing && landing.elementSelected) {
          this.el = cloneDeep(landing.elementSelected)          
          this.elementSelectedIndex = landing.elementSelectedIndex
          if (!this.elementSelectedIndex && this.elementSelectedIndex !== 0) {
            this.el = new Ielement
          }
        }
      })
    )
  }

  addElement() {    
    this.el.type = this.elementType
    if (this.elementSelectedIndex || this.elementSelectedIndex === 0){
      this.landingService.editElementToLandingData(this.el, this.elementSelectedIndex)
    }else{
      this.landingService.addElementToLandingData(this.el)
    }
    this.send.emit({})
  }

  openModal(){
    this.modal = true
  }

  closeModal() {
    this.modal = false
  }

  addInput(type: string, el: IInput, index: number){
    if (type === 'edit') {
      this.currentInput = el
      this.currentInput.index = index      
    } else {
      this.currentInput = new IInput
      this.currentInput.index = null 
    }
    this.modalData = 'Input'
    this.openModal()
  }

  addIcon(type: string, el: IICon, index: number) {
    if (type === 'edit') {
      this.currentIcon = el
      this.currentIcon.index = index
    } else {
      this.currentIcon = new IICon
      this.currentIcon.index = null
    }
    this.modalData = 'Icon'
    this.openModal()
  }
  

  saveInput(){

    if (this.currentInput.name !== ''){
      if (this.currentInput.index || this.currentInput.index === 0){
        this.el.inputs[this.currentInput.index] = this.currentInput
      }else{
        this.el.inputs.push(this.currentInput)
      }
      this.el.inputs = cloneDeep(this.el.inputs)
      this.currentInput = new IInput
      this.closeModal()
    }else{
      this.messageService.add({ severity: 'error', summary: 'Validación', detail: 'Debe agregar un elemento' });
    }
  }
  

  onUpload(event) {
    this.general.isLoad('1')    
    this.subs.add(
      this.general.uploadImage(event.currentFiles[0], 'landings/images/').subscribe((res: any) => {
        if (typeof res === 'number') {
          this.uploadPercent = res
        } else {
          res.subscribe((url) => {
            this.el.src = url
            this.general.isLoad('0')
            this.images = []
            this.uploadPercent = 0
          })
        }
      })
    )
  }

  saveIcon(){

    if (this.currentIcon.name !== ''){
      if (this.currentIcon.index || this.currentIcon.index === 0){
        this.el.icons[this.currentIcon.index] = this.currentIcon
      }else{
        this.el.icons.push(this.currentIcon)
      }
      this.el.icons = cloneDeep(this.el.icons)
      this.currentIcon = new IICon
      this.closeModal()
    }else{
      this.messageService.add({ severity: 'error', summary: 'Validación', detail: 'Debe agregar un elemento' });
    }
  }

  onUploadIcon(event) {
    this.general.isLoad('1')
    this.subs.add(
      this.general.uploadImage(event.currentFiles[0], 'landings/icons/').subscribe((res: any) => {
        if (typeof res === 'number') {
          this.uploadPercentIcon = res
        } else {
          res.subscribe((url) => {
            this.currentIcon.image = url
            this.general.isLoad('0')
            this.imagesIcon = []
            this.uploadPercentIcon = 0
          })
        }
      })
    )
  }



  ngOnDestroy() {
    this.subs.unsubscribe();
  }
 


}
