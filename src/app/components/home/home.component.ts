// import { HttpClient } from '@angular/common/http';
import { ThrowStmt } from '@angular/compiler';
import { Component} from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
  ]
})
export class HomeComponent  {
  // paises:any[]=[];
  nuevasCanciones:any[]=[];
  loading:boolean;
  error:boolean=false;
  mensajeError:string;

  constructor(private spotify:SpotifyService) {
    
  // constructor(private http: HttpClient) {
  //   console.log('constructor home hecho')
  //   this.http.get('https://restcountries.eu/rest/v2/lang/es')
  //     .subscribe((resp:any)=>{
  //       this.paises=resp;
  //       console.log(resp);
  //     });

    this.loading=true;    
    
    this.spotify.getNewReleases()
        .subscribe((data:any)=>{
          this.nuevasCanciones= data;
          this.loading=false;
        },(errorServicio)=>{
          this.loading=false;
          this.error=true;
          this.mensajeError=errorServicio.error.error.message;
          
        });
   }



}
