import React from 'react'
import {connect} from 'react-redux'
import {authenticate} from '../store'
import {Container, Row, Form, Button} from 'react-bootstrap';

/**
 * COMPONENT
 */
const AuthForm = props => {
  const {name, displayName, handleSubmit, error} = props

  return (
    <Container className="d-flex align-items-center justify-content-center">
        <Form style={{height:'80vh'}}className="d-flex align-items-center justify-content-center flex-column" name={name} onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Username</Form.Label>
            <Form.Control name="username" type="text" placeholder="Enter username"/>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control name="password" type="password" placeholder="Enter Password" />
          </Form.Group>
          <Button variant="primary" type="submit">
            {displayName}
          </Button>
          {error && error.response && <div> {error.response.data} </div>}
        </Form>
    </Container>

    // <div>
    //   <form onSubmit={handleSubmit} name={name}>
    //     <div>
    //       <label htmlFor="username">
    //         <small>Username</small>
    //       </label>
    //       <input name="username" type="text" />
    //     </div>
    //     <div>
    //       <label htmlFor="password">
    //         <small>Password</small>
    //       </label>
    //       <input name="password" type="password" />
    //     </div>
    //     <div>
    //       <button type="submit">{displayName}</button>
    //     </div>
    //     {error && error.response && <div> {error.response.data} </div>}
    //   </form>
    // </div>
  )
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.auth.error
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.auth.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const username = evt.target.username.value
      const password = evt.target.password.value
      dispatch(authenticate(username, password, formName))
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)
