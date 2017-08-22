import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';//Para hacer redirecciones y poder parametros de la url
import { UserService } from  '../services/user.service';
import { ArtistService } from  '../services/artist.service';
import { GLOBAL } from '../services/global';
import { Artist } from '../models/artist';

@Component({
    selector : 'artist-add',
    templateUrl: '../views/artist-add.html',
    providers: [UserService, ArtistService]//array de servicios que inyectamos
})

export class ArtistAddComponent implements OnInit{
    public title: string;
    public artist: Artist;
    public identity;
    public token;
    public url: string;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService,
        private _artistService: ArtistService
    ){
        this.title = 'Crear nuevo artista';
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.url = GLOBAL.url;
        this.artist = new Artist('','','');
    }

    ngOnInit(){
        console.log('artist-add.component.ts cargado');
    }

    onSubmit(){
        console.log(this.artist);
    }

}