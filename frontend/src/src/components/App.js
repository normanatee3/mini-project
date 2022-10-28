import '../css/App.css';
import { Routes, Route } from "react-router-dom"
import { useState, useEffect } from 'react';
import AuthPage from '../pages/AuthPage';
import NavBar from './NavBar';
import Cart from './Cart';
import { getUser } from '../utilities/users-service';
import HomePage from '../pages/HomePage';
import ShopPage from '../pages/ShopPage';

import axios from 'axios'


function App() {

  const [user, setUser] = useState(getUser())
  const [movies, setMovies] = useState(null)
  const [page, setPage] = useState("1")
  const [genre, setGenre] = useState('Animation')
  const [activeMovie, setActiveMovie] = useState(null)
  const [array, setArray] = useState([])
  const [show, setShow] = useState(false);
  const options = {
    method: 'GET',
    url: 'https://moviesdatabase.p.rapidapi.com/titles',
    params: {
      info: 'base_info',
      limit: '10',
      page: page,
      titleType: 'movie',
      genre: genre,
      startYear: '1970',
      endYear: '2022',
      list: 'most_pop_movies'
    },
    headers: {
      'X-RapidAPI-Key': '2c086d263emsh94679314f8a1dd9p123a19jsnd5092b9aa43c',
      'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
    }
  };

  const getMovies = () => {
    axios.request(options).then(function (response) {
      // console.log(response.data);
      const movieList = response.data
      setMovies(movieList)
    }).catch(function (error) {
      console.error(error);
    });
  }

  const pushMovie = (input) => {
    setArray(oldArray => [...oldArray, input])
    setShow(true)
    console.log(`here is the array`, array);
  }

  const rentMovie = (rentedMovie) => {
    const newMovie = {
      name: rentedMovie.titleText.text,
      price: "9.99",
      img: rentedMovie.primaryImage.url,
      method: "Rent"

    }
    pushMovie(newMovie)
    
  }
  const buyMovie = (boughtMovie) => {
    const newMovie = {
      name: boughtMovie.titleText.text,
      price: `${(((Math.floor((boughtMovie.releaseYear.year-1970)/10)+1)*5)-0.01)}`,
      img: boughtMovie.primaryImage.url,
      method: "Purchase"

    }
    pushMovie(newMovie)

  }

  const deleteMovie = (e) => {
    setArray(array.filter((item, index)=>index != e))
  }

  const changePage = async(e) =>{
    await setPage(e)
    
  }
  const changeGenre = async(e) =>{
    await setGenre(e)
    console.log(e);
  }

  useEffect(() => {
    getMovies()
  }, [page, genre])



  return (


    <div className="App">
      {
        user ?
          <>
            <NavBar setShow={setShow} setUser={setUser} user={user} getMovies={getMovies} />
            <Cart deleteMovie={deleteMovie} array={array} show={show} setShow={setShow} />
            <Routes>
              <Route path="/home" element={<HomePage />} />
              <Route path="/" element={<HomePage />} />
              <Route path="/shop" element={<ShopPage setPage={changePage} setGenre={changeGenre} rentMovie={rentMovie} buyMovie={buyMovie} movies={movies} getMovies={getMovies} />} />
            </Routes>

          </>
          :
          <>
            <AuthPage setUser={setUser} />
          </>
      }
    </div>

  );
}

export default App;
