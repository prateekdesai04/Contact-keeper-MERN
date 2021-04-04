import React, { useReducer } from 'react';
import uuid from 'uuid';
import ContactContext from './contactContext';
import contactReducer from './contactReducer';
import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  FILTER_CONTACTS,
  UPDATE_CONTACT,
  CLEAR_FILTER,
} from '../types';

const ContactState = (props) => {
  const initialState = {
    contacts: [
      {
        id: 1,
        name: 'Prateek',
        email: 'prateek@123.com',
        phone: '111-111-111',
        type: 'personal',
      },
      {
        id: 2,
        name: 'Pratima',
        email: 'pratima@123.com',
        phone: '111-111-222',
        type: 'personal',
      },
      {
        id: 1,
        name: 'Poorvi',
        email: 'poorvi@123.com',
        phone: '111-111-333',
        type: 'professional',
      },
    ], // this is where you make the request to the backend and put contacts
  };

  const [state, dispatch] = useReducer(contactReducer, initialState); // state allows us to access anything in the state and dispatch allows us to dispatch any object to the reducer

  // add contact

  // delete contact

  // set current contact

  // clear current contact

  // update contact

  // filter contacts

  // clear filter

  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
      }}
    >
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;
