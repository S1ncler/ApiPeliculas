import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor() {}
  ngOnInit(): void {}
  title = 'ApiIMDB';
  private key:string = "b52bccd5be60533006df873f7b16dec2";

  movies: any[] = [];
  ratings: any[] = [];

  consultar(pelicula: string = '') {
    pelicula = pelicula.replace(/ /g, '%20');
    const url = `
    https://api.themoviedb.org/3/search/movie?api_key=${this.key}&language=en-US&query=${pelicula}&page=1&include_adult=false`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        this.movies = data.results;
        console.log(this.movies)
        for(let mov of this.movies) mov.poster_path ="https://image.tmdb.org/t/p/w500" + mov.poster_path;
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
