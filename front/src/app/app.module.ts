import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthTokenHttpInterceptorProvider } from './interceptors/auth.interceptor';
import { HttpErrorHttpInterceptorProvider } from './interceptors/httperrorinterceptor.interceptor';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { environment } from 'src/environments/environment';

import { Reducer } from '@reducers/reducer';
import { storageMetaReducer } from 'src/app/store/reducers/metareducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { MessageModule } from 'primeng/message';

@NgModule({
  declarations: [
    AppComponent    
  ],
  imports: [  
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    StoreModule.forRoot({ Reducer }, { metaReducers: [storageMetaReducer] }),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
    FontAwesomeModule,
    HttpClientModule,
    ProgressSpinnerModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule,
    MessageModule

  ],
  providers: [
    AuthTokenHttpInterceptorProvider,
    HttpErrorHttpInterceptorProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
