import axios from 'axios';
import history from 'history';

const initialState = {
  allUserCreditCards: [],
}

/**
 * ACTION TYPES
 */
const SET_ALL_USER_CREDIT_CARDS = 'SET_ALL_CREDIT_CARDS';
const ADD_NEW_CARD = 'ADD_NEW_CARD';

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
  return{
    type: ADD_NEW_CARD,
    card
  }
}

export const fetchAllUserCreditCards = (userId) => {
  return async (dispatch) => {
    console.log(userId);
    const { data: cards} = await axios.get(`/api/users/${userId}`)
    console.log("user id after axios reequst", userId)
    const action = setAllUserCards(cards);
    dispatch(action);
  }
}

export const addCardToUser = (userId, cardId) => {
  return async (dispatch) => {
    const {data: card} = await axios.post(`/api/${userId}/${cardId}`)
    const action = addNewCard(card);
    dispatch(action);
  }
}

export default function(state = initialState, action) {
  switch(action.type) {
    case SET_ALL_USER_CREDIT_CARDS:
      return {...state, allUserCreditCards: action.cards};
    case ADD_NEW_CARD:
      return {...state, allUserCreditCards: [...action.card]}
    default:
      return state;
  }

}
