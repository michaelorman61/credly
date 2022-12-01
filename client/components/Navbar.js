import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import {Container, Nav, Navbar} from 'react-bootstrap';

const NavbarCustom = ({handleClick, isLoggedIn}) => (

  <Navbar expand="lg">
    <Container>
      {isLoggedIn ? (
        <Nav style={{width: '100%'}}className="d-flex align-items-center justify-content-between">
          <Navbar.Brand href="/home"><img  className="logo align-self-start flex-grow-1" style={{width: '75%'}} src="/images/credlylogo.png"/></Navbar.Brand>
          <Container className="d-flex justify-content-end align">
            <Nav.Link href="/addcard">Add New Card</Nav.Link>
            <Nav.Link href="#" onClick={handleClick}>Logout</Nav.Link>
          </Container>
        </Nav>
      ) : (
        <Nav style={{width: '100%'}}className="d-flex align-items-center justify-content-between">
          <Navbar.Brand href="/loggedhome"><img  className="logo" style={{width: '75%', borderRadius: '20px'}} src="/images/credlylogo.png"/></Navbar.Brand>
          <div className="d-flex">
            <Nav.Link href="/login">Login</Nav.Link>
            <Nav.Link href="/signup">Sign Up</Nav.Link>
          </div>
        </Nav>
      )}
    </Container>
  </Navbar>

  // <div>
  //   <h1>CREDLY</h1>
  //   <nav>
  //     {isLoggedIn ? (
  //       <div>
  //         {/* The navbar will show these links after you log in */}
  //         <Link to="/home">Home</Link>
  //         <a href="#" onClick={handleClick}>
  //           Logout
  //         </a>
  //       </div>
  //     ) : (
  //       <div>
  //         {/* The navbar will show these links before you log in */}
  //         <Link to="/login">Login</Link>
  //         <Link to="/signup">Sign Up</Link>
  //       </div>
  //     )}
  //   </nav>
  //   <hr />
  // </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.auth.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(NavbarCustom)
