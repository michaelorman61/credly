import axios from 'axios';

const initialState = {
  currentCreditCardOptions: [],
  company: '',
  dupeCard: {}
}

/**
 * ACTION TYPES
 */
const SET_CARD_OPTIONS = 'SET_CARD_OPTIONS';
const CREATE_NEW_CARD = 'CREATE_NEW_CARD';

/**
 * ACTION CREATORS
 */
const setCardOptions = (cards) => {
  return {
    type: SET_CARD_OPTIONS,
    cards
  };
};

const createNewCard = (card) => {
  return {
    type: CREATE_NEW_CARD,
    card
  }
}

export const fetchCompanyCards = (companyName) => {
  return async (dispatch) => {
    const { data: cards} = await axios.get(`/api/cards/${companyName}`);
    const action = setCardOptions(cards);
    dispatch(action);
  }
}

export const dupeNewCard = (cardId) => {
  return async (dispatch) => {
    const {data: card} = await axios.post(`/api/cards/${cardId}`);
    const action = createNewCard(card);
    dispatch(action);
  }
}

export default function(state = initialState, action) {
  switch(action.type) {
    case SET_CARD_OPTIONS:
      return {...state, currentCreditCardOptions: action.cards, company: action.cards[0].company};
    case CREATE_NEW_CARD:
      return {...state, dupeCard: action.card};
    default:
      return state;
  }
}

