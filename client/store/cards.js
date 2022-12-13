import axios from 'axios';

const initialState = {
  currentCreditCardOptions: [],
  company: '',
}

/**
 * ACTION TYPES
 */
const SET_CARD_OPTIONS = 'SET_CARD_OPTIONS';

/**
 * ACTION CREATORS
 */
const setCardOptions = (cards) => {
  return {
    type: SET_CARD_OPTIONS,
    cards
  };
};

export const fetchCompanyCards = (companyName) => {
  return async (dispatch) => {
    const { data: cards} = await axios.get(`/api/cards/${companyName}`);
    const action = setCardOptions(cards);
    dispatch(action);
  }
}

export default function(state = initialState, action) {
  switch(action.type) {
    case SET_CARD_OPTIONS:
      return {...state, currentCreditCardOptions: action.cards, company: action.cards[0].company};
    default:
      return state;
  }
}

