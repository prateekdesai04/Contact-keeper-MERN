import React, { useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';
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
        id: 3,
        name: 'Poorvi',
        email: 'poorvi@123.com',
        phone: '111-111-333',
        type: 'professional',
      },
    ], // this is where you make the request to the backend and put contacts
    current: null, // once you click edit, that contact's detail should come to this state
    filtered: null, // an array of filtered contacts
  };

  const [state, dispatch] = useReducer(contactReducer, initialState); // state allows us to access anything in the state and dispatch allows us to dispatch any object to the reducer

  // add contact
  const addContact = (contact) => {
    contact.id = uuidv4();
    dispatch({ type: ADD_CONTACT, payload: contact }); //dispatch action
  };

  // delete contact
  const deleteContact = (id) => {
    dispatch({ type: DELETE_CONTACT, payload: id }); //dispatch action
  };

  // set current contact
  const setCurrent = (contact) => {
    dispatch({ type: SET_CURRENT, payload: contact }); //dispatch action
  };

  // clear current contact
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT }); //dispatch action
  };

  // update contact
  const updateContact = (contact) => {
    dispatch({ type: UPDATE_CONTACT, payload: contact });
  };

  // filter contacts
  const filterContacts = (text) => {
    // take text to filter
    dispatch({ type: FILTER_CONTACTS, payload: text });
  };

  // clear filter
  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER }); //dispatch action
  };

  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
        current: state.current,
        filtered: state.filtered,
        addContact,
        deleteContact,
        setCurrent,
        clearCurrent,
        updateContact,
        filterContacts,
        clearFilter,
      }}
    >
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;
