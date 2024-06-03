import ContactList from "./components/ContactList/ContactList";
import SearchBox from "./components/SearchBox/SearchBox";
import ContactForm from "./components/ContactForm/ContactForm";

import { useEffect, useState } from "react";
import contacts from "./data/contacts.json";

function App() {
  const [contactList, setContactList] = useState(() => {
    const savedContacts = localStorage.getItem("contactData");
    return savedContacts ? JSON.parse(savedContacts) : contacts;
  });
  const [searchContact, setSearchContact] = useState("");

  useEffect(() => {
    localStorage.setItem("contactData", JSON.stringify(contactList));
  }, [contactList]);

  const searchData = contactList.filter((contact) =>
    contact.name.toLocaleLowerCase().includes(searchContact.toLocaleLowerCase())
  );

  const newContact = (someContact) => {
    setContactList((prevContacts) => {
      return [...prevContacts, someContact];
    });
  };

  const handleDelete = (idContact) => {
    setContactList((prevContacts) =>
      prevContacts.filter((contact) => contact.id !== idContact)
    );
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm onAdd={newContact} />
      <SearchBox value={searchContact} onChange={setSearchContact} />
      <ContactList contactList={searchData} onDelete={handleDelete} />
    </div>
  );
}

export default App;
