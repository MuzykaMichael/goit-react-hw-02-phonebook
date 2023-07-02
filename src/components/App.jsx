import { Component } from "react";
import { Form } from "./Form/Form";
import { ListContacts } from "./ListContacts/ListContacts";
import { Filtration } from "./Filtration/Filtration";
import {Container,
  FirstTitle,
  SecondTitle,
  Breaker,
  Message,} from './App.styled'

export class App extends Component {
  state = {
    contacts: [],
    name: '',
  }
  
  formSubmitHandle = newContact =>{
    const sameContact = this.state.contacts.find(
      ({name})=>name.toLowerCase()===newContact.name.toLowerCase()
    );
    if (sameContact) {
      alert(`${newContact} is already exists.`)
      return
    }
    this.setState(prevState=>{
      return{ contacts: [...prevState.contacts,newContact]}
    });
  };
  
  filterHandle = nameQuery => {
    this.setState({name:nameQuery});
  };

  contactsDeleteHandler = idToDelete => {
    this.setState(prevState=>{
      const updContactsArr = [...prevState.contacts].filter(
        ({id}) => id!==idToDelete
      );
      return {contacts:updContactsArr};
    });
  }

  render() {
    const filteredContacts = this.state.contacts.filter(({name})=>{
      name.toLowerCase().includes(this.state.name.toLowerCase())
    });

    return(
      <Container>
        <FirstTitle>Phonebook</FirstTitle>
        <Form onSubmit={this.formSubmitHandle}/>
        <SecondTitle>Contacts</SecondTitle>
        <Breaker>
          {this.state.contacts.length > 0 ? (
            <>
              <Filtration
              filtration={this.state.name}
              onChange={this.filterHandle}
              />
              {filteredContacts.length>0?(
                <ListContacts
                contacts={filteredContacts}
                handleDelete={contactsDeleteHandler}
                />
            
          ):(
            <Message>
              Sorry, we didn't find any contacts matching your query
            </Message>
          )}
          </>
          ):(
            <Message>You don't have any contacts yet</Message>
          )}
        </Breaker>
      </Container>
    );
  }
};


