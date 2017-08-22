import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';//Para hacer redirecciones y poder parametros de la url
import { UserService } from  '../services/user.service';
import { GLOBAL } from '../services/global';
import { Artist } from '../models/artist';

@Component({
	selector : 'artist-list',
	templateUrl: '../views/artist-list.html',
	providers: [UserService]//array de servicios que inyectamos
})

export class ArtistListComponent implements OnInit{
	public titulo: string;
	public artists: Artist[];
	public identity;
	public token;
	public url: string;

	constructor(
		private _route: ActivatedRoute,
		private _router: Router,
		private _userService: UserService
	){
		this.titulo = 'Artistas';
		this.identity = this._userService.getIdentity();
		this.token = this._userService.getToken();
		this.url = GLOBAL.url;
	}

	ngOnInit(){
			console.log('artist-list.component.ts cargado');

			//Conseguir el listado de artistas
	}
}