import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { Pelicula,RespuestaMDB } from '../interfaces/interfaces';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  peliculasRecientes:Pelicula[] = [];

  slideOpts = {
    slidesPerView:1.1,
    freeMode:true
  }

  constructor(
    private movieService:MoviesService
  ) {}

  ngOnInit(){
    this.movieService.getFuture().subscribe( resp=>{
        this.peliculasRecientes = resp.results;
        console.log(this.peliculasRecientes);
      }
    );
  }

}
