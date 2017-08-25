import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';//Para hacer redirecciones y poder parametros de la url
import { UserService } from  '../services/user.service';
import { ArtistService } from  '../services/artist.service';
import { GLOBAL } from '../services/global';
import { Artist } from '../models/artist';
import { Album } from '../models/album';

@Component({
    selector : 'album-add',
    templateUrl: '../views/album-add.html',
    providers: [UserService, ArtistService]//array de servicios que inyectamos
})

export class AlbumAddComponent implements OnInit{
    public title: string;
    public artist: Artist;
    public album: Album;
    public identity;
    public token;
    public url: string;
    public alertMessage;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService,
        private _artistService: ArtistService
    ){
        this.title = 'Crear nuevo album';
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.url = GLOBAL.url;
        this.album = new Album( '', '', 2017, '', '');
    }

    ngOnInit(){
        console.log('album-add.component.ts cargado');
        //Llamar al metodo del api para sacar un artista en base a su id getArtist
        
    }

    onSubmit(){
        this._route.params.forEach((params: Params) =>{
            let artist_id = params['artist'];
            this.album.artist = artist_id;
            
            console.log(this.album);
        });
        
    }

}