import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HeroeModel } from 'src/app/models/heroe.model';
import { HeroesService } from '../../services/heroes.service';

//para importar la libreria de modales
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styles: [],
})
export class HeroeComponent implements OnInit {
  heroe: HeroeModel = new HeroeModel();
  //hrs:any;
  constructor(
    private heroesServices: HeroesService,
    private router: ActivatedRoute,
    private heroesService: HeroesService
  ) {
    let id = this.router.snapshot.paramMap?.get('id');
    console.log(id);
    
    if (id !== 'nuevo' && id != null) {
      /*this.heroesService.getHeroe(id).subscribe((resp) => {
        this.heroe.id = id;
        this.heroe = resp;
      });*/
        this.editar(id);
    }
  }

  editar(id: string) {
    console.log('Entro a editar');
    this.heroesService.getHeroe(id).subscribe((resp:any) => {
      this.heroe = resp;
      this.heroe.id = id;
      console.log(this.heroe);
      
    });
  }

  ngOnInit(): void {}

  guardar(form: NgForm) {
    if (form.invalid) {
      console.log('Formulario no valido');
      Object.values(form.controls).forEach((control) => {
        control.markAllAsTouched();
      });
      return;
    }
    Swal.fire({
      title: 'Espere',
      text: 'Guardando información',
      icon: 'info',
      allowOutsideClick: false,
    });
    Swal.showLoading();
    //Se importe de jxjs el observable
    let peticion: Observable<any>;
    if (this.heroe.id) {
      peticion = this.heroesServices.actualizarHero(
        this.heroe
      ); /*
        .subscribe((resp) => {
          console.log(resp);
        });*/
    } else {
      peticion = this.heroesServices.crearHeroe(
        this.heroe
      ); /*
        .subscribe((resp) => {
          console.log(resp);
        });*/
    }

    peticion.subscribe((resp) => {
      Swal.fire({
        title: this.heroe.nombre,
        text: 'Se actualizó correctamente',
        icon: 'success',
      });
    });
    console.log(form);
    console.log(this.heroe);
  }
}
