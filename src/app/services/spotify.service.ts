import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor(private http: HttpClient) {
    console.log('Spotify Service Listo')
   }
   getQuery(query:string){
     const url=`https://api.spotify.com/v1/${query}`;

     const headers = new HttpHeaders({
      'Authorization': 'Bearer token'
    });
    return this.http.get(url,{headers});
   }

   getNewReleases(){
        // const headers = new HttpHeaders({
        //   'Authorization': 'Bearer BQDjpHwGJsrOSz2i5QcFb8RXQ6nQ6gD4_KPRa3kg6QFn9NK0ephYTh7M37F_fTvuIKBT1bFDIYyx2y9zCCM'
        // }) ya se usa el const headers

        return this.getQuery('browse/new-releases?country=MX&limit=20&offset=0')
                    .pipe(map( data => data['albums'].items));
        
   }
   getArtistas(termino:string){
    
    return this.getQuery(`search?q=${termino}&type=artist&limit=15`)
               .pipe(map(data=> {
                 console.log("data");
                 console.log(data);
                 console.log("/data");
                 return data['artists'].items;
                }));
   }

   getArtista(id:string){
    
    return this.getQuery(`artists/${id}`)
               //.pipe(map(data=> data['artists'].items));
   }
   getTopTracks(id:string){
    
    return this.getQuery(`artists/${id}/top-tracks?market=ES`)
               .pipe(map(data=> data['tracks']));
   }

}
