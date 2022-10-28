import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Spinner from 'react-bootstrap/Spinner';
import Pagination from 'react-bootstrap/Pagination'
import React from 'react'
import Form from 'react-bootstrap/Form';



// shop component

function ShopPage({ buyMovie, rentMovie, getMovies, movies, setPage, setGenre }) {
    // console.log(movies)
    const viewSwap = (key) => {
        let allMovies = document.querySelectorAll('.g-4')
        let movie = document.getElementById(`${key}`)
        allMovies.forEach((el) => {
            el.classList.toggle('d-none')
        })
        movie.classList.toggle('hide')

    }

    // pagination
    let active;
    let items = [];
    for (let number = 1; number <= 5; number++) {
        items.push(
            <Pagination.Item onClick={() => setPage(number)} key={number} active={number === active}>
                {number}
            </Pagination.Item>,
        );
    }



    return (
        <div className='page'>
            <Container style={{ backgroundColor: "green" }} fluid>
                <Row>
                    <Col as="h1" >SHOP</Col>
                </Row>
            </Container>




            {
                movies ?
                    <>
                        <Pagination className='g-4' bsPrefix='pagination pagination-lg justify-content-center' size="lg">
                            <Pagination.Item disabled>{'Page:'}</Pagination.Item>
                            {items}
                        </Pagination>
                        <Form.Select onChange={(e) => setGenre(e.target.value)} className='g-4' aria-label="Default select example">
                            <option value="Animation">Animation</option>
                            <option value="Action">Action</option>
                            <option value="Adventure">Adventure</option>
                            <option value="Adventure">Adventure</option>
                            <option value="Adventure">Adventure</option>
                        </Form.Select>
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
                                                    <Button onClick={() => rentMovie(movies.results[i])} variant="primary">Rent</Button>{' '}
                                                    <Button onClick={() => buyMovie(movies.results[i])} variant="success">Buy {`$${(((Math.floor((movie.releaseYear.year - 1970) / 10) + 1) * 5) - 0.01)}`}</Button>{' '}
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
                                <div className="movie hide" key={`${i}`} id={`${i}`}>
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
                                                    {movie.genres.genres.slice(0, 3).map((genre, i) => {

                                                        return (
                                                            <ListGroup.Item style={{ width: "fit-content" }} key={`${i}`} className="genre">
                                                                {genre.text}
                                                            </ListGroup.Item>
                                                        );
                                                    })}
                                                </ListGroup>
                                                <Card>
                                                    <Card.Body>
                                                        <Card.Text id="info">{movie.plot.plotText.plainText}</Card.Text>
                                                        <Container className='mt-auto'>
                                                            <Button onClick={() => rentMovie(movies.results[i])} variant="primary">Rent</Button>{' '}
                                                            <Button onClick={() => buyMovie(movies.results[i])} variant="success">Buy {`$${(((Math.floor((movie.releaseYear.year - 1970) / 10) + 1) * 5) - 0.01)}`}</Button>{' '}
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

                        <Spinner animation="border" role="status">
                        </Spinner>
                        <span>Loading...</span>
                    </>
            }










        </div>
    )
}

export default ShopPage

