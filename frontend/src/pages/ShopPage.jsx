import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Image from 'react-bootstrap/Image'

import React from 'react'

function ShopPage({ array, pushMovie, getMovies, movies, activeMovie, setActiveMovie }) {
    console.log(movies)
    const viewSwap = (key) => {
        let allMovies = document.querySelectorAll('.g-4')
        let movie = document.getElementById(`${key}`)
        allMovies.forEach((el) => {
            el.classList.toggle('d-none')
        })
        movie.classList.toggle('hide')

    }
    const rentMovie = (one) => {
        setActiveMovie(one, one.price = "$9.99").then(

            pushMovie()
        )
    }

    const buyMovie = (one) => {

    }

    return (
        <div className='page'>
            <Container style={{ backgroundColor: "green" }} fluid>
                <Row>
                    <Col as="h1" >SHOP</Col>
                </Row>
            </Container>


            {array.length > 0 ?
                <>

                </>
                : null}

            {
                movies ?
                    <>
                        <Row xs={1} md={2} className="g-4">
                            {movies.results.map((movie, i) => {
                                return <div className='moviePopOut' key={`${i}`}>
                                    <Col className="movieBox">
                                        <Card key={`${i}`} className="bg-dark text-white">
                                            <Card.Img style={{ height: '500px', opacity: ".35" }} src={movie.primaryImage.url} alt="Card image" />
                                            <Card.ImgOverlay className='d-flex flex-column'>
                                                <Card.Title as="h1">

                                                    {movie.titleText.text}

                                                </Card.Title>
                                                <Card.Text as="h4">

                                                    {movie.releaseDate.year}

                                                </Card.Text>
                                                <Container className='mt-auto'>

                                                    <Button onClick={() => viewSwap(`${i}`)} variant="secondary">More Info</Button>{' '}
                                                    <Button onClick={() => rentMovie(movie)} variant="primary">Rent</Button>{' '}
                                                    <Button variant="success">Buy Now</Button>{' '}
                                                </Container>
                                            </Card.ImgOverlay>
                                        </Card>
                                    </Col>


                                </div>
                            })}
                        </Row>
                        {/* Single view */}
                        {movies.results.map((movie, i) => {
                            return (
                                <div className="movie hide" id={`${i}`}>
                                    <Card>

                                        <Card.Header className='cardHeader'>

                                        <img
                                            onClick={() => viewSwap(`${i}`)}
                                            className="icon"
                                            src="https://cdn-icons-png.flaticon.com/512/2976/2976286.png"
                                            alt=""
                                            />
                                        <h1>{movie.titleText.text}</h1>

                                            </Card.Header>
                                        <div className="textbox">
                                            <Card>
                                                <Card.Img style={{ width: "350px" }} src={movie.primaryImage.url} />
                                            </Card>

                                            <div className="smalltextbox">
                                                <ListGroup horizontal className="genres">
                                                    {movie.genres.genres.slice(0,3).map((genre, i) => {
                                                        
                                                        return (
                                                            <ListGroup.Item className="genre">
                                                                <text>{genre.text}</text> 
                                                            </ListGroup.Item>
                                                        );
                                                    })}
                                                </ListGroup>
                                                <Card>
                                                    <Card.Body>
                                                        <Card.Text id="info">{movie.plot.plotText.plainText}</Card.Text>
                                                        <Container className='mt-auto'>
                                                            <Button onClick={() => rentMovie(movie)} variant="primary">Rent</Button>{' '}
                                                            <Button variant="success">Buy Now</Button>{' '}
                                                        </Container>
                                                    </Card.Body>
                                                </Card>
                                            </div>
                                        </div>
                                    </Card>
                                </div>
                            );
                        })}
                    </>
                    :
                    <>
                        <h3>*Products*</h3>
                    </>
            }










        </div>
    )
}

export default ShopPage

