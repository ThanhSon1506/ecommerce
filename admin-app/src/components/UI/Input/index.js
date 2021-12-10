import React from 'react'
import PropTypes from 'prop-types'
import { Form } from 'react-bootstrap'

function Input(props) {
    return (
        <Form.Group controlId="formBasicEmail" style={{ marginBottom: '10px' }}>
            <Form.Label>{props.label}</Form.Label>
            <Form.Control
                type={props.type}
                placeholder={props.placeholder}
                value={props.value}
                onChange={props.onChange}
            />
            <Form.Text className="text-muted">
                {props.errorMessage}
            </Form.Text>
        </Form.Group>
    )
}

export default Input

