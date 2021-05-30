import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { getMovie, saveMovie } from "../services/movieService";
import { getGenresApi } from "../services/genreService";

class MovieForm extends Form {
  state = {
    data: {
      title: "",
      genreId: "",
      numberInStock: "",
      dailyRentalRate: "",
      movieCover: "",
      liked: false,
    },
    genres: [],
    errors: {},
  };

  schema = {
    _id: Joi.string(),
    title: Joi.string().required().label("Title"),
    genreId: Joi.string().required().label("Genre"),
    numberInStock: Joi.number().required().min(0).max(100).label("Number in Stock"),
    dailyRentalRate: Joi.number().required().min(0).max(255).label("Daily Rental Rate"),
    movieCover: Joi.string().required().label("Movie Cover"),
    liked: Joi.boolean().label("Add To Favorite"),
  };

  async populateGenres() {
    const { data: genres } = await getGenresApi();
    this.setState({ genres });
  }

  async populateMovie() {
    try {
      // detect if we edit a new movie or not
      const movieId = this.props.match.params.id;
      if (movieId === "new") return;

      const { data: movie } = await getMovie(movieId);

      this.setState({ data: this.mapToViewModel(movie) });
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        this.props.history.replace("/not-found");
      }
    }
  }

  async componentDidMount() {
    await this.populateGenres();
    await this.populateMovie();
  }

  mapToViewModel(movie) {
    return {
      //   !delete the id when submitting this
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate,
      movieCover: movie.movieCover,
      liked: movie.liked,
    };
  }

  doSubmitMovie = async () => {
    await saveMovie(this.state.data);

    this.props.history.push("/movies");
  };

  render() {
    const { liked } = this.state.data;

    return (
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <h1>Edit Movie</h1>
            <form onSubmit={this.handleSubmit} className="edit-form-movie">
              {this.renderInput("title", "Title")}
              {this.renderSelect("genreId", "Genre", this.state.genres)}
              {this.renderInput("numberInStock", "Number in Stock", "number")}
              {this.renderInput("dailyRentalRate", "Daily Rental Rate")}
              {this.renderInput("movieCover", "Movie Cover", "url")}
              {this.renderInput("liked", "Add To Favorite", "checkbox", liked)}
              {this.renderButton("Save")}
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default MovieForm;
