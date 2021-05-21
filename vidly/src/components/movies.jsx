import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import MoviesTable from './moviesTable'
import ListGroup from './common/listGroup'
import Pagination from './common/pagination'
import { getMoviesApi, deleteMovieApi } from '../services/movieService'
import { getGenresApi } from '../services/genreService'
import { paginate } from '../utils/paginate'
import _ from 'lodash'
import SearchBox from './searchBox'

import AnimateMovieCover from './animatedMovieCover'
import Hero from './common/hero'

import witcher from '../utils/images/the-witcher.jpg'

// TODO:: changed the movieCover functionality -> onMouseHover remove the component
class Movies extends Component {
  state = {
    cover: witcher,
    movies: [],
    genres: [],
    currentPage: 1,
    pageSize: 4,
    searchQuery: '',
    selectedGenre: null,
    sortColumn: { path: 'title', order: 'asc' },
    currentMovieCover: null,
    fullImgVisible: false,
    genreActiveClassIndex: 0,
  }

  async componentDidMount() {
    const { data: movies } = await getMoviesApi()
    const { data: genresApi } = await getGenresApi()

    const genres = [{ _id: '', name: 'All Genres' }, ...genresApi]
    this.setState({
      movies,
      genres,
    })
  }

  //!:: optimistic delete
  handleDelete = async (movie) => {
    const originalMovies = this.state.movies

    const movies = originalMovies.filter((m) => m._id !== movie._id)
    this.setState({ movies })

    try {
      await deleteMovieApi(movie._id)
    } catch (err) {
      if (err.response && err.response.status === 404) {
        console.log(`Error: ${err}`)

        this.setState({
          movies: originalMovies,
        })
      }
    }
  }

  handleLike = async (movie) => {
    const movies = [...this.state.movies]
    const index = movies.indexOf(movie)

    movies[index] = { ...movies[index] }
    movies[index].liked = !movies[index].liked

    // await editMovie(movies[index]._id, movies[index])

    // this.setState({ movies })
  }

  handlePageChange = (page) => {
    this.setState({ currentPage: page })
  }

  handleGenreSelect = (genre, index) => {
    this.setState({
      genreActiveClassIndex: index,
      selectedGenre: genre,
      searchQuery: '',
      currentPage: 1,
    })
  }

  handleSearch = (query) => {
    this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 })
  }

  handleSort = (sortColumn) => {
    this.setState({ sortColumn })
  }

  handleDisplayCover = (id) => {
    const currentMovieCover = this.state.movies.find(
      (movie) => movie._id === id,
    )

    this.setState(
      {
        currentMovieCover,
        fullImgVisible: true,
      },
      () => {
        // console.log(this.state.fullImgVisible)
      },
    )

    //! --> this will not show the updated state (true) because state is asyncronyous. Either call fullImgVisible in render or
    //! --> call the callback for the setState and console.log(fullImgVisible)
    // console.log(this.state.fullImgVisible)
  }

  handleHideCover = () => {
    this.setState({
      fullImgVisible: false,
    })
  }

  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      sortColumn,
      selectedGenre,
      searchQuery,
      movies: allMovies,
    } = this.state

    let filtered = allMovies

    if (searchQuery)
      filtered = allMovies.filter((m) =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase()),
      )
    else if (selectedGenre && selectedGenre._id)
      filtered = allMovies.filter((m) => m.genre._id === selectedGenre._id)

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order])

    const movies = paginate(sorted, currentPage, pageSize)

    return { totalCount: filtered.length, data: movies }
  }

  render() {
    const { length: count } = this.state.movies
    const { user } = this.props
    const {
      pageSize,
      currentPage,
      sortColumn,
      searchQuery,
      currentMovieCover,
      genreActiveClassIndex,
    } = this.state

    if (count === 0)
      return (
        <p>
          There are no movies in the <b>database</b>.
        </p>
      )

    const { totalCount, data: movies } = this.getPagedData()

    return (
      <>
        <div className="container-fluid">
          <Hero
            bgImg={this.state.cover}
            description="Your Daily Does of Movies"
            title="PopCorn App"
          />
        </div>

        <div className="container mb-5">
          <div className="row">
            <div className="col-3">
              <ListGroup
                items={this.state.genres}
                // selectedItem={this.state.selectedGenre}
                onItemSelect={this.handleGenreSelect}
                activeClass={genreActiveClassIndex}
              />

              {currentMovieCover && (
                <AnimateMovieCover
                  movieSrc={currentMovieCover.movieCover}
                  setShowImg={this.state.fullImgVisible}
                />
              )}
            </div>

            <div className="col">
              {user && (
                <Link
                  to="/movies/new"
                  className="btn popcorn-btn"
                  style={{ marginBottom: 20 }}
                >
                  New Movie
                </Link>
              )}

              <p>
                Showing {totalCount} movies in the <b>database</b>.
              </p>

              <SearchBox value={searchQuery} onChange={this.handleSearch} />

              <MoviesTable
                user={this.props.user}
                movies={movies}
                sortColumn={sortColumn}
                onLike={this.handleLike}
                onDelete={this.handleDelete}
                onSort={this.handleSort}
                onHandleDisplayMovieCover={this.handleDisplayCover}
                handleHideCover={this.handleHideCover}
              />

              <Pagination
                itemsCount={totalCount}
                pageSize={pageSize}
                currentPage={currentPage}
                onPageChange={this.handlePageChange}
              />
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default Movies
