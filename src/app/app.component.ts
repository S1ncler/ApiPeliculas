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

  movies: any[] = [];
  ratings: any[] = [];

  consultar(pelicula: string = '') {
    pelicula = pelicula.replace(/ /g, '%20');
    const url = `https://imdb8.p.rapidapi.com/title/find?q=${pelicula}`;
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': 'e30732e585msh8d297900b68fb43p10f87bjsnc01718cbdfb5',
        'X-RapidAPI-Host': 'imdb8.p.rapidapi.com',
      },
    };
    fetch(url, options)
      .then((response) => response.json())
      .then((data) => {
        this.movies = data.results;
        let indices:number[] = [];
        for (let movie of this.movies) {

          if (!movie.image) {
            movie.image = { url: '../assets/images/movie.webp' };
          }
          if (movie.akas) indices= [...indices, this.movies.indexOf(movie)];
          else {
            let id = movie.id
              .replace('title', '')
              .replaceAll(`/`, '')
              .replace('name', '');
            const url2 = `https://imdb8.p.rapidapi.com/title/get-ratings?tconst=${id}`;
            const options2 = {
              method: 'GET',
              headers: {
                'X-RapidAPI-Key':
                  'e30732e585msh8d297900b68fb43p10f87bjsnc01718cbdfb5',
                'X-RapidAPI-Host': 'imdb8.p.rapidapi.com',
              },
            };

            fetch(url2, options2)
              .then((response2) => response2.json())
              .then((data2) => {
                console.log(data2.canRate);
                if (data2.canRate) movie.rate = data2.rating;
                else movie.rate = 'Sin puntuar';
              })
              .catch((error2) => {
                console.log(error2);
              });
          }
          
        }
        console.log(indices)
        for(let i = indices.length - 1; i >= 0; i--) {
          this.movies.splice(indices[i], 1)};
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
