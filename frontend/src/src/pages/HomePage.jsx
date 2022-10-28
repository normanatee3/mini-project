import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios'
import Carousel from "react-bootstrap/Carousel";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Placeholder from "react-bootstrap/Placeholder";
import Container from "react-bootstrap/Container"
import 'bootstrap-icons/font/bootstrap-icons.css';
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';

const HomePage = () => {
    const [homeMovies, setHomeMovies] = useState(null)

    const options = {
        method: 'GET',
        url: 'https://moviesdatabase.p.rapidapi.com/titles',
        params: {
            info: 'base_info',
            limit: '5',
            page: '1',
            titleType: 'movie',
            year: '2021',
            list: 'most_pop_movies'
        },
        headers: {
            'X-RapidAPI-Key': '2c086d263emsh94679314f8a1dd9p123a19jsnd5092b9aa43c',
            'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
        }
    };

    const getHomeMovies = () => {
        axios.request(options).then(function (response) {
            // console.log(response.data);
            const movieList = response.data
            setHomeMovies(movieList)
        }).catch(function (error) {
            console.error(error);
        });
    }
    useEffect(() => {
        getHomeMovies()
    }, [])

    const meet = {
        height: "8em",
        width: "14em",
        backgroundColor: "#ddd8ab"
    }
    return (
        <div className="home">
            <h1>Blockbuster strikes back: Now with MERN attitude</h1>
            <div className="contents">
                {homeMovies ? (
                    <Carousel variant="dark">
                        {homeMovies.results.map((movie, i) => {
                            return (
                                <Carousel.Item style={{ height: "750px" }} key={`${i}`}>
                                    <div className="box">
                                        <img
                                            className="d-block w-50 picture"
                                            src={movie.primaryImage.url}
                                            alt={`slide ${i}`}
                                        />
                                        <Carousel.Caption>
                                            <h3 className="caroTitle">{movie.titleText.text}</h3>
                                            {/* <p>{movie.plot.plotText.plainText}</p> */}
                                        </Carousel.Caption>
                                    </div>
                                </Carousel.Item>
                            );
                        })}
                    </Carousel>
                ) : null}

                <div className="content">
                    <h3>Placeholder incase something is wanted here.</h3>
                </div>

                <div className="content">
                    <h3>Placeholder incase something is wanted here.</h3>
                </div>
            </div>

            <footer className='d-flex flex-column'>

                
                {/* Meet the team */}

                <Container className="d-flex justify-content-around" id="meet">
                    <Card style={meet}>
                        <Card.Body>
                            {/* <Card.Title>Card Title</Card.Title> */}
                            <text>Find</text>
                            <Card.Text>Norman Taylor</Card.Text>
                            {/* <Button variant="primary">Go somewhere</Button> */}
                            <a
                                href="https://github.com/normanatee3"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <i class="bi bi-github"></i>
                            </a>
                            <a
                                href="https://www.linkedin.com/in/norman-taylor-865a531bb/"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <i class="bi bi-linkedin"></i>
                            </a>
                        </Card.Body>
                    </Card>

                    <Card style={meet}>
                        <Card.Body>
                            {/* <Card.Title>Card Title</Card.Title> */}
                            <text>Find</text>
                            <Card.Text>Ayse Kahraman</Card.Text>
                            {/* <Button variant="primary">Go somewhere</Button> */}
                            <a
                                href="https://github.com/AyseBKahraman"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <i class="bi bi-github"></i>
                            </a>
                            <a
                                href="https://www.linkedin.com/in/ayse-bali/"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <i class="bi bi-linkedin"></i>
                            </a>
                        </Card.Body>
                    </Card>

                    <Card style={meet}>
                        <Card.Body>
                            {/* <Card.Title>Card Title</Card.Title> */}

                            <Card.Text>Find <br /> Mohammed Noori</Card.Text>
                            {/* <Button variant="primary">Go somewhere</Button> */}
                            <a
                                href="https://github.com/MNGiit"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <i class="bi bi-github"></i>
                            </a>
                            <a
                                href="https://www.linkedin.com/in/mohammed-n-70690924a/
    "
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <i class="bi bi-linkedin"></i>
                            </a>
                        </Card.Body>
                    </Card>
                    <br/>
                
                </Container>
                <Row className="copyright">
                    <p id="copy">© 2028 MERNmusters. All Rights Reserved.</p>
                </Row>

            </footer>
        </div>
    );
};

// Export component
export default HomePage;




