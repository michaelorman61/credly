import React from 'react'
import {connect} from 'react-redux'
import { fetchAllUserCreditCards } from '../store/user';
import { Card, Container } from 'react-bootstrap';

/**
 * COMPONENT
 */
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  async componentDidMount() {
    await this.props.loadAllUserCreditCards(this.props.id)
  }

  render () {
    console.log(this.props.id)
    console.log(this.props.userCards)
    return(
    <div>
      <h3>Welcome, {this.props.username}</h3>
      {this.props.userCards.length === 0 ? (
        <div>
          <h1>You currently have no cards in your profile. Click on "Add New Card" to start earning more rewards!</h1>
        </div>
      ) : (
        <Container className="d-flex justify-content-evenly align-items-around flex-wrap">
          {this.props.userCards.map(card => {
            return(
              <Card style={{width:"260px", marginTop: "30px"}}key={card.id}>
                <Card.Img style={{height: "150px", width: "260px"}} variant="top" src={card.imageUrl} />
                <Card.Body>
                  <Card.Title style={{overflow: 'wrap'}}>{card.company} {card.name}</Card.Title>
                  {/* <Card.Subtitle>{card.name}</Card.Subtitle> */}
                  <Card.Text>lorem ipsum text</Card.Text>
                </Card.Body>
              </Card>
            )
          })}
        </Container>
      )}
    </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    username: state.auth.username,
    id: state.auth.id,
    userCards: state.user.allUserCreditCards
  }
}

const mapDispatch = dispatch => {
  return {
    loadAllUserCreditCards: (userId) => {
      dispatch(fetchAllUserCreditCards(userId));
    }
  }
}
export default connect(mapState, mapDispatch)(Home)
