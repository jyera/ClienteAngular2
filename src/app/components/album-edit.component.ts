import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';//Para hacer redirecciones y poder parametros de la url
import { UserService } from  '../services/user.service';
import { AlbumService } from  '../services/album.service';
import { GLOBAL } from '../services/global';
import { Artist } from '../models/artist';
import { Album } from '../models/album';

@Component({
    selector : 'album-edit',
    templateUrl: '../views/album-add.html',
    providers: [UserService, AlbumService]//array de servicios que inyectamos
})

export class AlbumEditComponent implements OnInit{
    public title: string;
    public album: Album;
    public identity;
    public token;
    public url: string;
    public alertMessage;
    public is_edit;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService,
        private _albumService: AlbumService
    ){
        this.title = 'Editar album';
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.url = GLOBAL.url;
        this.album = new Album( '', '', 2017, '', '');
        this.is_edit = true;
    }

    ngOnInit(){
        console.log('album-add.component.ts cargado');
        //Llamar al metodo del api para sacar un artista en base a su id getArtist
        
    }

    onSubmit(){
        this._route.params.forEach((params: Params) =>{
            let artist_id = params['artist'];
            this.album.artist = artist_id;
            
            this._albumService.addAlbum(this.token, this.album).subscribe(
                   response => {

                        if(!response.album){
                            this.alertMessage = "Error en el servidor";
                        }else{
                            this.alertMessage = "El Album se ha creado correctamente";
                            this.album = response.album;
                            //this._router.navigate(['/editar-artista', response.artist._id]);
                        }
                    },
                    error => {
                      var errorMessage = <any>error;

                      if(errorMessage != null){
                          var body = JSON.parse(error._body);
                          this.alertMessage = body.message;

                          console.log(error);
                      }
                  }
            );
        });
        
    }

}