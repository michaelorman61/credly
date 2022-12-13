import React from 'react';
import {connect} from 'react-redux';
import {Dropdown, Container, Button} from 'react-bootstrap';
import { fetchCompanyCards } from '../store/cards';
import { addCardToUser } from '../store/user';

class AddCreditCard extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      selectedCompany: 'Company',
      selectedCard: 'Select a Card'
    }
    this.handleCompanyChange = this.handleCompanyChange.bind(this);
    this.handleCardChange = this.handleCardChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

   async handleCompanyChange(e) {
    console.log(e)
    await this.setState({
      selectedCompany: e,
      selectedCard: 'Select a Card'
    }, () => console.log(this.state));
    await this.props.loadCardOptions(this.state.selectedCompany);
    console.log(this.props.cardOptions)
  }

  async handleCardChange(e) {
    console.log('event', typeof(e))
    console.log('event', e)
    await this.setState({
      selectedCard: e
    }, () => console.log(this.state));
  }

  async handleSubmit() {
    console.log("SUBMITTING")
    await this.props.connectCardToUser(this.props.id, this.state.selectedCard
    )
  }

  render() {
    return(
      <Container className="d-flex justify-content-center align-items-center flex-column">
        <Dropdown onSelect={this.handleCompanyChange} >
          <Dropdown.Toggle variant="primary" id="dropdown-basic">
            {this.state.selectedCompany}
          </Dropdown.Toggle>
          <Dropdown.Menu>
          <Dropdown.ItemText>---Select a Company---</Dropdown.ItemText>
            <Dropdown.Item eventKey="Bank of America" >Bank of America</Dropdown.Item>
            <Dropdown.Item eventKey="Chase" >Chase</Dropdown.Item>
            <Dropdown.Item eventKey="Citibank" >CitiBank</Dropdown.Item>
            <Dropdown.Item eventKey="American Express" >American Express</Dropdown.Item>
            <Dropdown.Item eventKey="TD Bank" >TD Bank</Dropdown.Item>
            <Dropdown.Item eventKey="Capital One" >Capital One</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        <Dropdown onSelect={this.handleCardChange}>
            {this.state.selectedCompany === "Company" ? (
              <Dropdown.Toggle variant="primary" id="dropdown-basic">Select a Company in the Field Above</Dropdown.Toggle>
            ) : (
              <Container>
                {console.log(this.props.cardOptions)}
                <Dropdown.Toggle variant="primary" id="dropdown-basic">{this.state.selectedCard}</Dropdown.Toggle>
                <Dropdown.Menu>
                  {this.props.cardOptions.map(card => {
                    return(
                      <Dropdown.Item key={card.id} eventKey={card.id}>{`${card.id}. ${card.name}`}</Dropdown.Item>
                    )
                  })}
                </Dropdown.Menu>
              </Container>
            )}
        </Dropdown>
        <Button type="submit" onClick={this.handleSubmit}>
          Add Card
        </Button>
      </Container>
    )
  }
}


const mapState = state => {
  return{
    cardOptions: state.cards.currentCreditCardOptions,
    id: state.auth.id
  }
}

const mapDispatch = dispatch => {
  return{
    loadCardOptions: (companyName) => {
      dispatch(fetchCompanyCards(companyName))
    },
    connectCardToUser: (userId, cardId) => {
      dispatch(addCardToUser(userId, cardId))
    }
  }
}

export default connect(mapState, mapDispatch)(AddCreditCard)
