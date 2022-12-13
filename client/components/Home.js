import React from 'react'
import {connect} from 'react-redux'
import { fetchAllUserCreditCards, removeCard } from '../store/user';
import { Card, Container, Button, Spinner } from 'react-bootstrap';

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
    console.log("pre mount length", this.props.userCards.length)
    await this.props.loadAllUserCreditCards(this.props.id)
    console.log("mounted length", this.props.userCards.length)
  }

  render () {
    console.log(this.props.id)
    console.log(this.props.userCards)
    if(this.props.userCards === undefined){
      return(
        <Spinner animation="border" role='status'>
        </Spinner>
      )
    }
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
                  <Button type="submit" onClick={async () => {await this.props.deleteCard(card.id, this.props.id)
                  setTimeout(async () => await this.props.loadAllUserCreditCards(this.props.id), 200)
                  }}>
                    Delete Card
                  </Button>
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
    },
    deleteCard: (cardId, userId) => {
      dispatch(removeCard(cardId, userId));
    }
  }
}
export default connect(mapState, mapDispatch)(Home)
