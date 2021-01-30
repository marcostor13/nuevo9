import * as action from '@actions/setdata.actions'
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { GeneralService } from '@services/general.service';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  private subs = new SubSink()

  constructor(
    private store: Store<any>,
    private general: GeneralService
    ){
    this.subscriptionLoading()
  }

  title = 'front'
  isLoading:any = '0'

  subscriptionLoading(){
    this.subs.add(
      this.store.select((state) => state.Reducer.isLoading).subscribe((isLoading: any) => {
        this.isLoading = isLoading;        
      })
    )     
  }  

  ngOnDestroy() {
    this.subs.unsubscribe()
  }

}
