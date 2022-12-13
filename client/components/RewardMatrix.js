import React from 'react';
import {connect} from 'react-redux';
import {fetchAllUserCreditCards} from '../store/user'
import { Card, Container, ListGroup } from 'react-bootstrap';
class RewardMatrix extends React.Component {
  constructor(props){
    super(props);
    this.state = {

    }
  }

  async componentDidMount() {
    await this.props.loadAllUserCreditCards(this.props.id)
  }

  render(){
    console.log(this.props.userCards)
    return(
      <Container className="d-flex justify-content-evenly align-items-around flex-wrap">
          {this.props.userCards.map(card => {
            return(
              <Card style={{width:"260px", marginTop: "30px"}}key={card.id}>
                <Card.Img style={{height: "150px", width: "260px"}} variant="top" src={card.imageUrl} />
                <Card.Body>
                  <Card.Title style={{overflow: 'wrap'}}>{card.company} {card.name}</Card.Title>
                  <ListGroup>
                  {
                    card.rewards.map(reward => {
                      if(reward.transactionType === this.props.type || reward.transactionType === "all"){
                        return(
                        <ListGroup.Item key={reward.id}>
                          {`${reward.rewardAmount * this.props.amount} in ${reward.rewardType}`}
                        </ListGroup.Item>
                        )
                      }
                      else{
                        return(
                          <ListGroup.Item>
                            {`Not Eligible transaction for ${reward.transactionType} ${reward.rewardType}`}
                          </ListGroup.Item>
                        )
                      }
                    })
                  }
                  </ListGroup>
                </Card.Body>
              </Card>
            )
          })}
        </Container>
    )
  }
}

const mapState = state => {
  return {
    id: state.auth.id,
    userCards: state.user.allUserCreditCards
  }
}

const mapDispatch = dispatch => {
  return{
    loadAllUserCreditCards: (userId) => {
      dispatch(fetchAllUserCreditCards(userId));
    }
  }
}

export default connect (mapState, mapDispatch)(RewardMatrix)
