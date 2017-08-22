import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from './models/user';
import { UserService } from './services/user.service';
import { GLOBAL } from './services/global';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [UserService]
})

export class AppComponent implements OnInit{
  public title = 'MUSIFY';
  public user: User;
  public user_register: User;
  public identity;//ahi ira toda la informacion gracias al localstorage
  public token;//tmb guardado en el localstorage
  public errorMessage;
  public alertRegister;
  public url:string;

  constructor(
	  	private _route: ActivatedRoute,
	  	private _router: Router,
  		private _userService: UserService

  ){
  	this.user = new User('','','','','','ROLE_USER','');
  	this.user_register = new User('','','','','','ROLE_USER','');
  	this.url = GLOBAL.url;
  }

  //Cuando se carga la aplicacion/componente se lanza el onInit
  ngOnInit(){
  	this.identity = this._userService.getIdentity();
  	this.token = this._userService.getToken();

  	console.log(this.identity);
  	console.log(this.token);
  }

  public onSubmit(){
  	console.log(this.user);

  	//con .subscribe te "subscribes" al observable
  	this._userService.signup(this.user).subscribe(
  		response => {
  			let identity = response.user;
  			this.identity = identity;

  			if(!this.identity._id){
  				alert("El usuario no esta correctamente identificado");
  			}else{
  				//crear elemento en el localstorage para tener al usuario en sesion
  				localStorage.setItem('identity', JSON.stringify(this.identity));
  				//conseguir el token para luego usarlo en cada peticion
  				this._userService.signup(this.user, 'true').subscribe(
					response => {
						let token = response.token;
						this.token = token;

			  			if(this.token.length <= 0){
			  				alert("El token no se ha generado correctamente");
			  			}else{
			  				//crear elemento en el localstorage para tener el token disponible
			  				localStorage.setItem('token', this.token);
			  				this.user = new User('','','','','','ROLE_USER','');
			  			}
			  		},
			  		error => {
			  			var errorMessage = <any>error;

			  			if(errorMessage != null){
			  				var body = JSON.parse(error._body);
			  				this.errorMessage = body.message;
			  			}
			  		}
			  	);
  			}
  		},
  		error => {
  			var errorMessage = <any>error;

  			if(errorMessage != null){
  				var body = JSON.parse(error._body);
  				this.errorMessage = body.message;
  			}
  		}
  	);
  }

  logout(){
  	localStorage.removeItem('identity');
  	localStorage.removeItem('token');
  	localStorage.clear();//sesion total erase
  	//Y para reloadear
  	this.identity = null;
  	this.token = null;
  	this._router.navigate(['/']);
  }

  
  onSubmitRegister(){
		console.log(this.user_register);

		this._userService.register(this.user_register).subscribe(
			response =>{
				let user = response.user;
				this.user_register = user;

				if(!user._id){
					this.alertRegister = 'Error al registrarse';
				}else{
					this.alertRegister = 'El registro se ha realizado correctamente con '+this.user_register.email;
					this.user_register = new User('','','','','','ROLE_USER','');
				}
			},
			error => {
  			var errorMessage = <any>error;

  			if(errorMessage != null){
  				var body = JSON.parse(error._body);
  				this.alertRegister = body.message;
  			}
  		}
		)
	}
}
