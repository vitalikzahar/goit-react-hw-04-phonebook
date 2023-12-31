import { PhoneForm } from './PhoneForm/PhoneForm';
import { Contacts } from './Contacts/Contacts';
import { nanoid } from 'nanoid';
import { Filter } from './Filter/Filter';
import { Section } from './App.styled';
import { useEffect, useState } from 'react';
const localStorageKey = 'phone-contacts';
const getLocalStorage = () => {
  return JSON.parse(localStorage.getItem(localStorageKey)) || [];
};
export const App = () => {
  const [contacts, setContacts] = useState(getLocalStorage);
  const [filter, setFilter] = useState('');
  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(contacts));
  }, [contacts]);
  const handleSearch = event => {
    setFilter(event.target.value);
  };

  const filterUsers = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );
  const handleDelete = cardId => {
    setContacts(prevState =>
      prevState.filter(contact => contact.id !== cardId)
    );
  };
  const onSubmit = (name, number) => {
    const contact = { name, number, id: nanoid() };
    if (
      contacts.find(
        userCard => userCard.name.toLowerCase() === contact.name.toLowerCase()
      )
    ) {
      return alert(`"${contact.name}  "is already in contact`);
    }
    setContacts(prevState => [...prevState, contact]);
  };

  return (
    <Section>
      <h1>Phone book</h1>
      <PhoneForm onSubmit={onSubmit}></PhoneForm>
      <h2>Contacts</h2>
      <Filter filter={filter} search={handleSearch}></Filter>
      <Contacts
        onDelete={handleDelete}
        filterUsers={filterUsers}
        phoneBook={contacts}
      ></Contacts>
    </Section>
  );
};
