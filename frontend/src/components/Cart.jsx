import React from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Navbar from 'react-bootstrap/Navbar';


function Cart({ deleteMovie, array, show, setShow }) {

    const doMath = () =>{
        let result = 0
        for(let i=0; i<array.length; i++){
            result += parseFloat(array[i].price)
        }
        return result.toFixed(2)
    }
    const math = doMath()
    const handleClose = () => setShow(false);

    return (
        <>


            <Offcanvas placement='end' show={show} onHide={handleClose}>

                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>MERNMOVIES Checkout</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    {array.map((movie, i) => {
                        return (
                            <>
                            <Card style={movie.method === "Rent" ? { backgroundColor: "rgb(222, 238, 255)", padding: "5px" } : { backgroundColor: "rgb(222, 255, 228)", padding: "5px" }}>
                                <Row>

                                    <Col sm={4}>
                                        <img style={{ height: "150px" }} src={movie.img} alt="" />
                                    </Col>
                                    <Col sm={8} className='justify-content-end'>
                                        <Row>

                                            <h4>{movie.name}</h4>
                                            <h6>{movie.method} at ${movie.price}</h6>
                                        </Row>

                                        <Button className='invisible' variant="danger">take up space</Button>
                                        <Button onClick={() => deleteMovie(i)} variant="danger">Remove</Button>


                                    </Col>
                                </Row>
                            </Card>
                            <br/>
                            </>
                        )
                    })}
                    <Container className='justify-content-end'>

                    </Container>
                </Offcanvas.Body>
                <Offcanvas.Header as={Navbar} sticky="bottom" bg="light" variant="light">
                    <Offcanvas.Title><h2>
                        Subtotal:
                    </h2></Offcanvas.Title>
                    <h2>
                    {`$${math}`}
                    </h2>
                    <Button variant='warning'>Checkout</Button>
                </Offcanvas.Header>
            </Offcanvas>
        </>
    );
}

export default Cart