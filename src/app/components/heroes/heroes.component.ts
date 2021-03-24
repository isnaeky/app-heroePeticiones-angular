import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { HeroeModel } from '../../models/heroe.model';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styles: [
  ]
})
export class HeroesComponent implements OnInit {
  heroes:HeroeModel[]=[];
  cargando=false;
  constructor( private heroesService:HeroesService) { 
   
  }

  ngOnInit(): void {
    this.cargando=true;
    this.heroesService.getHeroes().subscribe(resp => {
      this.heroes=resp;
    this.cargando=false;});
  }

  deleteH(heroe:HeroeModel,id:number){

    Swal.fire({
      title: '¿Esta seguro?',
      text: `Desea borrar a ${heroe.nombre}`,
      icon: 'question',
      showConfirmButton:true,
      showCancelButton:true,
    }).then(resp =>{
      if (resp.value) {
        this.heroes.splice(id,1);
        if (heroe.id !== null && heroe.id !== undefined) {
          this.heroesService.deleteHeroe(heroe.id).subscribe(); 
        }
      }
    });
  }

  

}
