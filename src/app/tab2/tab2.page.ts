import { Component } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { Pelicula } from '../interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { DetalleComponent } from '../components/detalle/detalle.component';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  textoBuscar = '';
  peliculas:Pelicula[] = [];
  buscando = false;
  ideas:String[] = ['Batman','Superman','Avatar','El señor de los anillos','La vida es bella'];

  constructor(
    private movieService:MoviesService,
    private modalCtrl:ModalController
  ) {}

  buscar(event){
    const valor = event.detail.value;
    if(valor != ''){
      this.buscando = true;
      this.movieService.buscarPeliculas(valor).subscribe(
        resp=>{
          console.log(resp);
          this.peliculas = resp['results'];
          this.buscando = false;
        }
      );
    }else{
      this.peliculas = [];
    }
  }

  async verDetalle(id:String){
    const modal = await this.modalCtrl.create({
      component:DetalleComponent,
      componentProps:{
        id
      }
    });

    modal.present();
  }

}
