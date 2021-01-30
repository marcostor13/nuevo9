import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as action from '@actions/setdata.actions'
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/storage';
import { IEmailData } from './../models/emailData';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  data$: Observable<any>

  constructor(
    private store: Store<{ data: any }>, 
    private router: Router,
    private storage: AngularFireStorage,
    private api: ApiService
    
    ) { }

  httpBuildQuery(params) {
    if (typeof params === 'undefined' || typeof params !== 'object') {
      params = {};
      return params;
    }

    var query = '?';
    var index = 0;

    for (var i in params) {
      index++;
      var param = i;
      var value = params[i];
      if (index == 1) {
        query += param + '=' + value;
      } else {

        query += '&' + param + '=' + value;
      }

    }
    return query;
  }

  searchElementByNameKey(array, key, value){
    for (let i = 0; i < array.length; i++) {
      const element = array[i];
      if (element[key] == value){
        return element
      }      
    }
  }


  searchIndexByNameKey(array, key, value) {
    var res:any = false;
    for (let i = 0; i < array.length; i++) {
      const element = array[i];
      if (element[key] == value) {
        res =  i
      }
    }

    return res
  }

  getRandomArbitrary(min, max) {
    return Math.round(Math.random() * (max - min) + min)
  }
  
  //Inserta un objeto a partir de una posisión, 
  insertObjectInPositionArray(obj, array, indexPosPrev){

    let res = []
    
    for (let i = 0; i < indexPosPrev; i++) {
      res.push(array[i])      
    }

    res.push(obj)

    if (indexPosPrev < array.length){
      for (let i = indexPosPrev; i < array.length; i++) {
        res.push(array[i])
      }
    }


    return res

  } 


  //FORMAT:   separator_1   ===> get 1

  getIndexToId(e){
    e = e.split('_');
    return e[e.length-1]
  }


  //ELIMINAR UN ELEMENTO DEL ARRAY POR ID

  deleteElementOfArray(value, array){
    
    for (let index = 0; index < array.length; index++) {
      const element = array[index];
      if (element.id == value){
        array.splice(index, 1)
      }
      
    }
    return array
  }

  deleteElementOfArrayintoArray(parentId, id, array){
    for (let index = 0; index < array.length; index++) {
      if (array[index].id == parentId) {
        for (let x = 0; x < array[index].elements.length; x++) {
          if (array[index].elements[x].id == id) {
            array[index].elements.splice(x, 1)
          }
        }
      }

    }
    return array
  }

  getParametersURL(url){

    let params = url.split('?')[1].split('&');
    var res = [] 

    for (let index = 0; index < params.length; index++) {
      let ele = params[index].split('=');
      res.push({
        name: ele[0],
        value: ele[1]
      })
    }
    return res;

  }



  redirect(path, data: any){
    this.store.dispatch(action.setdata({ data: data }))
    this.router.navigate([path])
  }


  c(title: String, message: any) {
    console.log('%c' + title + '%c=>', "background-color: purple; color:white;font-family:system-ui;font-size:10pt;font-weight:bold;padding: 4px", "background-color: white; color:purple;font-size:10pt;font-weight:bold;padding: 4px", message);
  }

  isLoad(is:string) {
    this.store.dispatch(action.setLoading({ isLoading: is }))
  }

  uploadImage(file: File, path: string) {
    const filePath = `${path}${new Date().getTime()}_${file.name}`
    const fileRef = this.storage.ref(filePath)
    const task = this.storage.upload(filePath, file)

    return new Observable((obs) => {
      task.percentageChanges().subscribe(res=>{
        if(res !== 100){
          obs.next(res)
        }else{
          obs.next(100)
          setTimeout(() => {
            obs.next(fileRef.getDownloadURL())
            obs.complete()
          },400)          
          
        }
      })      
    })
  }

  sendMail(data: IEmailData){
    return this.api.api({
      type: 'post',
      data: data,
      service: 'send-email'
    })
  }

  
  

  

  


}
