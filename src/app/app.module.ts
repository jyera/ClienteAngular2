import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { routing, appRoutingProviders } from './app.routing';

import { AppComponent } from './app.component';
import { UserEditComponent } from './components/user-edit.component';
import { ArtistListComponent } from './components/artist-list.component';
import { HomeComponent } from './components/home.component';
import { ArtistAddComponent } from './components/artist-add.component';
import { ArtistEditComponent } from './components/artist-edit.component';

@NgModule({
  declarations: [
      AppComponent,
      HomeComponent,
      UserEditComponent,
      ArtistListComponent,
      ArtistAddComponent,
      ArtistEditComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  providers: [appRoutingProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }

//en declaration se hace es cargar componentes y directivas
//y en imports se carga modulos del framwork y que hagamos nosotros
//providers las directivas
//y en bootstrap es el endpoint donde se carga la apicacion al arrancar