import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';

export default function Item(props) {

    const [textBoxValue, setTextBoxValue] = useState("");

    return (
        <>
        <Container>
            <Row>
                <Col></Col>
                <Col>
                    <br /><br /><br />
                    <InputGroup className="mb-3">
                        <FormControl
                        placeholder="New Item"
                        aria-label="New Item"
                        value={textBoxValue}
                        aria-describedby="basic-addon2"
                        onChange={event => setTextBoxValue(event.target.value)}
                        />
                        <Button onClick={() => props.addItem(textBoxValue)} variant="outline-secondary" id="button-addon2">
                        Create
                        </Button>
                    </InputGroup>
                    <br />
                    <h2>Items</h2>
                    {
                        props.items.map(k => <span key={k}>{k}, &nbsp;</span>)
                    }
                </Col>
                <Col></Col>
            </Row>
        </Container>
        </>
    );
}