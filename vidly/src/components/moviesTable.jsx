import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Table from './common/table'
import Like from './common/like'

class MoviesTable extends Component {
  columns = [
    {
      path: 'title',
      label: 'Title',
      content: (movie) => (
        <Link
          onMouseEnter={() => this.props.onHandleDisplayMovieCover(movie._id)}
          onMouseLeave={() => this.props.handleHideCover()}
          to={`/movies/${movie._id}`}
        >
          {movie.title}
        </Link>
      ),
    },
    { path: 'genre.name', label: 'Genre' },
    { path: 'numberInStock', label: 'Stock' },
    { path: 'dailyRentalRate', label: 'Rate' },
    {
      key: 'like',
      content: (movie) => (
        <Like liked={movie.liked} onClick={() => this.props.onLike(movie)} />
      ),
    },
  ]

  deleteColumn = {
    key: 'delete',
    content: (movie) => {
      if (this.props.user !== null) {
        return (
          <button
            onClick={() => this.props.onDelete(movie)}
            className="btn btn-danger btn-sm"
          >
            Delete
          </button>
        )
      }
    },
  }

  constructor(props) {
    super(props)
    //! is admin is added manually into MongoDB
    if (this.props.user !== null && this.props.user.isAdmin) {
      this.columns.push(this.deleteColumn)
    }
  }

  render() {
    const { movies, onSort, sortColumn } = this.props

    return (
      <Table
        columns={this.columns}
        data={movies}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    )
  }
}

export default MoviesTable
