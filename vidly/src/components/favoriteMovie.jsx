import React, { useState, useEffect } from 'react'
import Hero from './common/hero'
import { getMoviesApi } from '../services/movieService'
import { Link } from 'react-router-dom'

const FavoriteMovie = ({ props }) => {
  const [movies, setMovies] = useState([])
  const hero =
    'https://images.pexels.com/photos/3692639/pexels-photo-3692639.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'

  useEffect(() => {
    async function fetchMovies() {
      let { data: movies } = await getMoviesApi()
      movies = movies.filter((movie) => movie.liked)

      setMovies(movies)
    }

    fetchMovies()
  }, [])

  return (
    <div className="container">
      <Hero
        bgImg={hero}
        title="Favorite Movies"
        description="list all of your favorite movies"
      />

      <div className="row">
        {movies.map((movie) => {
          return (
            <div key={movie._id} className="col-lg-6 favorite-movie">
              <Link to={`/fav-movies/${movie._id}`}>
                <h5 className="favorite-movie-title">{movie.title}</h5>
              </Link>
              <img className="img-fluid" src={movie.movieCover} alt="" />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default FavoriteMovie
