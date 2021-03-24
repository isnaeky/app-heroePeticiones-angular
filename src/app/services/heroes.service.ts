import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HeroeModel } from '../models/heroe.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class HeroesService {
  private url = 'https://angularlog-881c5-default-rtdb.firebaseio.com';
  constructor(private http: HttpClient) {}

  crearHeroe(heroe: HeroeModel) {
    return this.http.post(`${this.url}/heroes.json`, heroe).pipe(
      //El map se utiliza para asignar un campo diferente y coincidan
      //como el ejemplo el name es el id de cada coleccion y se le asigna a el heroe id
      map((resp: any) => {
        heroe.id = resp.name;
        return heroe;
      })
    );
  }

  actualizarHero(heroe: HeroeModel) {
    //Asigna el objeto heroe a heroeTemp
    const heroeTemp = {
      ...heroe,
    };
    //Desvincula la propiedad id del objeto heroeTemp
    delete heroeTemp.id;
    //Solicitud put atravez una api de firebase
    return this.http.put(`${this.url}/heroes/${heroe.id}.json`, heroeTemp);
  }

  getHeroes() {
    return this.http
      .get(`${this.url}/heroes.json`)
      .pipe(map(this.crearArreglo));
  }

  private crearArreglo(heroesObj: any) {
    const heroes: HeroeModel[] = [];
    console.log(heroesObj);
    if (heroesObj === null) {
      return [];
    }

    Object.keys(heroesObj).forEach((key) => {
      const heroe: HeroeModel = heroesObj[key];
      heroe.id = key;
      heroes.push(heroe);
    });
    return heroes;
  }

  getHeroe(id:string) {
    return this.http
      .get(`${this.url}/heroes/${id}.json`);
  }

  deleteHeroe(id:string){
    return this.http
      .delete(`${this.url}/heroes/${id}.json`);
  }
}
