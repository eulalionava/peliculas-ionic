import { Component, OnInit, Input } from '@angular/core';
import { MoviesService } from 'src/app/services/movies.service';
import { PeliculaDetalle, Cast } from 'src/app/interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { DataLocalService } from 'src/app/services/data-local.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss'],
})
export class DetalleComponent implements OnInit {
  @Input() id;
  pelicula:PeliculaDetalle = {};
  oculto = 150;
  actores:Cast[] = [];
  agregado:any = 'star-outline';

  slideOpt = {
    slidesPerView:3.3,
    freeMode:true,
    spacebetween:-5
  }


  constructor(
    private movieService:MoviesService,
    private modalCtrl:ModalController,
    private dataLocal:DataLocalService
  ) { 
  }

  ngOnInit() {

    this.dataLocal.existePelicula(this.id).then(
      existe => this.agregado = (existe) ? 'star' :'star-outline'
    );

    this.movieService.getPeliculaDetalle(this.id).subscribe(
      resp=>{
        console.log(resp);
        this.pelicula = resp;
      }
    );

    this.movieService.getActoresPelicula(this.id).subscribe(
      resp=>{
        console.log(resp);
        this.actores = resp.cast;
      }
    );
  }

  regresar(){
    this.modalCtrl.dismiss();
  }

  favorito(){
    const existe = this.dataLocal.guardarPelicula(this.pelicula);
    this.agregado = (existe) ? 'star':'star-outline';
  }

}
