import React, { useState, useEffect } from 'react'
import { getMovie } from '../services/movieService'

//!  object destructuring refference link => https://medium.com/@pyrolistical/destructuring-nested-objects-9dabdd01a3b8

const dFlex = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
}

const MovieComponent = ({
  match: {
    params: { id },
  },
}) => {
  const [movie, setMovie] = useState({})
  useEffect(() => {
    async function addMovie() {
      const { data: movie } = await getMovie(id)
      setMovie(movie)
    }

    addMovie()
  }, [])

  return (
    <div className="container">
      <div className="row justify-content-between">
        <div className="col-lg-4" style={dFlex}>
          <h4 className="mb-5">{movie.title}</h4>
          <span className="text-danger font-weight-bold mb-2">
            History, Purpose and Usage
          </span>
          <p>
            Lorem ipsum, or lipsum as it is sometimes known, is dummy text used
            in laying out print, graphic or web designs. The passage is
            attributed to an unknown typesetter in the 15th century who is
            thought to have scrambled parts of Cicero's De Finibus Bonorum et
            Malorum for use in a type specimen book. It usually begins with:
            “Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incidi purpose of lorem ipsum is to create a natural
            looking block of text (sentence, paragraph, page, etc.) that doesn't
            distract from the layout. A practice not without controversy, laying
            out pages with meaningless filler text can be very useful when the
            focus is meant to be on design, not content.
          </p>
        </div>

        <div
          className="col-lg-7 bg-image"
          style={{ background: `url(${movie.movieCover})` }}
        ></div>
      </div>
    </div>
  )
}

export default MovieComponent
