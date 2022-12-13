import axios from 'axios';
import history from '../history.js'

const initialState = {
  allUserCreditCards: [],
}

/**
 * ACTION TYPES
 */
const SET_ALL_USER_CREDIT_CARDS = 'SET_ALL_CREDIT_CARDS';
const ADD_NEW_CARD = 'ADD_NEW_CARD';
const DELETE_CARD = 'DELETE_CARD';

/**
 * ACTION CREATORS
 */
const setAllUserCards = (cards) => {
  return {
    type: SET_ALL_USER_CREDIT_CARDS,
    cards
  };
};
const addNewCard = (card) => {
  return {
    type: ADD_NEW_CARD,
    card
  }
}
const deleteCard = (card) => {
  return {
    type: DELETE_CARD,
    card
  }
}

export const fetchAllUserCreditCards = (userId) => {
  return async (dispatch) => {
    console.log(userId);
    const { data: user} = await axios.get(`/api/users/${userId}`)
    console.log("user id after axios reequst", userId)
    const cards = user.cards
    const action = setAllUserCards(cards);
    dispatch(action);
  }
}

export const addCardToUser = (userId, cardId) => {
  return async (dispatch) => {
    const {data: card} = await axios.post(`/api/users/${userId}/${cardId}`)
    const action = addNewCard(card);
    dispatch(action);
    console.log(history);
    history.push('/home')
  }
}

export const removeCard = (cardId, userId) => {
  return async (dispatch) => {
    const {data: card} = await axios.delete(`/api/users/${userId}/${cardId}`);
    const action = deleteCard(card);
    dispatch(action);
    history.push('/home')
  }
}

export default function(state = initialState, action) {
  switch(action.type) {
    case SET_ALL_USER_CREDIT_CARDS:
      return {...state, allUserCreditCards: action.cards};
    case ADD_NEW_CARD:
      return {...state, allUserCreditCards: state.allUserCreditCards.concat(action.card)}
    case DELETE_CARD:
      return state.allUserCreditCards.filter(card => card.id !== action.card.id)
    default:
      return state;
  }
}
