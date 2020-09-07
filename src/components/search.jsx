import React from 'react';
import { Form, Container, Col, Button} from 'react-bootstrap';

export default function Search(props) {

    const [search, setSearch] = React.useState('')

    return (
        <Container>
            <Form className="mt-2">
                <Form.Row className="align-items-center">
                    <Col sm={10} className="my-1">
                        <Form.Control placeholder="Search for Pokemon" onChange={(event) => setSearch(event.target.value)}>

                        </Form.Control>
                    </Col>
                    <Col sm={2} className="my-1">
                        <Button block onClick={(event) => props.getPokemon(search)}>Search</Button>
                    </Col>
                </Form.Row>
            </Form>
        </Container>
    )
}