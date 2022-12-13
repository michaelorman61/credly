import React from 'react';
import { Form, Button } from 'react-bootstrap';
import {connect} from 'react-redux';
import RewardMatrix from './RewardMatrix';

class Transaction extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      type: 'all',
      amount: '',
      showMatri: false,
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleTypeChange = this.handleTypeChange.bind(this)
    this.handleAmountChange = this.handleAmountChange.bind(this)
  }

  async handleSubmit(e) {
    e.preventDefault();
    // console.log(e)
    const type = e.target.type.value;
    const amount = e.target.amount.value;
    console.log("transaction type", type)
    console.log("transaction amount", amount)
  }

  async handleTypeChange (e) {
    await this.setState({
      type: e.target.value
    })
    console.log(this.state.type)
  }

  async handleAmountChange (e) {
    await this.setState({
      amount: e.target.value
    })
    console.log(this.state.amount)
  }

  render() {
    return(
      <React.Fragment>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group className="mb-3" controlId="transactionType">
            <Form.Label>Transaction Type</Form.Label>
            <Form.Select name="type" onChange={this.handleTypeChange}>
              <option value="all">General</option>
              <option value="dining">Dining</option>
              <option value="gas">Gas</option>
              <option value="online shopping">Online Shopping</option>
              <option value="travel">Travel</option>
              <option value="groceries">Groceries</option>
              <option value="entertainment">Entertainment</option>
              <option value="streaming services">Streaming Services</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3" controlId="transactionAmount">
            <Form.Label>Transaction Amount</Form.Label>
            <Form.Control onChange={this.handleAmountChange} name="amount" type="number" placeholder="Enter your transaction amount"/>
          </Form.Group>
          <Button disabled={!this.state.amount} variant="primary" type="submit" onClick={() => this.setState({
            showMatrix: true
          })}>
            Calculate Rewards
          </Button>
        </Form>
        {this.state.showMatrix ? (<RewardMatrix type={this.state.type} amount={this.state.amount} />) : ( <p></p>)}
      </React.Fragment>
    )
  }
}

const mapState = state => {
  return {

  }
}

const mapDispatch = dispatch => {
  return{

  }
}

export default connect(mapState, mapDispatch)(Transaction)
