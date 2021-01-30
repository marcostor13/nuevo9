import { stateActions } from '@actions/setdata.actions';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { ApiService } from '@services/api.service';
import { GeneralService } from '@services/general.service';
import { Observable } from 'rxjs';
import { IDataApi } from 'src/app/models/dataapi';
import { Ielement, Landing } from '../../landings/models/add-landing';


@Injectable({
  providedIn: 'root'
})
export class LandingsService {

  constructor(
    private store: Store<any>,    
    private api: ApiService,
    private general: GeneralService,
  ) { }

  getLandingData(): Observable<Landing> {
    return this.store.select((state) => state.Reducer.landing);
  }

  setLandingData(dataLanding:Landing) {
    this.store.dispatch(stateActions.setCreatingDataLanging({ dataLanding }))
  }

  addElementToLandingData(element:Ielement){
    this.store.dispatch(stateActions.addElementDataLanding({ element }))
  }

  editElementToLandingData(element:Ielement, index: number){
    this.store.dispatch(stateActions.editElementDataLanding({ element, index }))
  } 

  editLanding(landing: Landing){
    this.store.dispatch(stateActions.editLanding({ landing }))
  }

  saveLanding(landing:Landing){    
    const data: IDataApi = {
      service: landing._id ? `update-landing/${landing._id}`: 'save-landing',
      type: landing._id ? 'patch':'post',
      data: landing
    }
    return this.api.api(data)  
  }

  getLandings(){
    const data:IDataApi = {
      service: 'get-landings',
      type: 'get',
      data: ''      
    }
    return this.api.api(data)  
  }

  getLandingByID(id:string) {
    const data: IDataApi = {
      service: `get-landing-by-id/${id}`,
      type: 'get',
      data: ''
    }
    return this.api.api(data)
  }

  updateLanding(id: string) {
    const data: IDataApi = {
      service: `update-landing/${id}`,
      type: 'delete',
      data: ''
    }
    return this.api.api(data)
  }

  deleteLanding(id:string) {
    const data: IDataApi = {
      service: `delete-landing/${id}`,
      type: 'delete',
      data: ''
    }
    return this.api.api(data)
  }

}
