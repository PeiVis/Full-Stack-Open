import { useState, useEffect } from "react";
import Phonebook from "./components/Phonebook";
import Form from "./components/Form";
import Filter from "./components/Filter";
import personsService from "./services/persons";
import Notification from "./components/Notification";
import "./index.css";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setfilter] = useState("");
  const [notification, setNotification] = useState(null);
  const [notificationType, setNotificationType] = useState("Error");

  useEffect(() => {
    personsService.getAll().then((initialNotes) => {
      setPersons(initialNotes);
    });
  }, []);

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleFilterChange = (event) => {
    setfilter(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const addPerson = (event) => {
    event.preventDefault();
    let duplicate = false;
    const personObject = {
      name: newName,
      number: newNumber,
    };
    persons.map((person) =>
      person.name === newName ? (duplicate = true) : "",
    );
    if (duplicate) {
      const dupPerson = persons.find((person) => person.name === newName);
      const changedPerson = { ...dupPerson, number: personObject.number };
      if (
        window.confirm(
          `${dupPerson.name} is in the phonebook, do you want to replace their number "${dupPerson.number}" with "${changedPerson.number}"`,
        )
      ) {
        personsService
          .update(dupPerson.id, changedPerson)
          .then((returnedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id !== returnedPerson.id ? person : returnedPerson,
              ),
            );
            setNotification(
              `Contact name:'${changedPerson.name}' number: '${changedPerson.number}'  was updated`,
            );
            setNotificationType("success");
            setTimeout(() => {
              setNotification(null);
            }, 5000);
          })
          .catch((error) => {
            setNotification(
              `Contact name:'${changedPerson.name}' was already deleted`,
            );
            setNotificationType("error");
            setTimeout(() => {
              setNotification(null);
            }, 5000);
            console.log(error);
            setPersons(persons.filter((n) => n.id !== changedPerson.id));
          });
      }
      return;
    }
    personsService.create(personObject).then((returnedPerson) => {
      setPersons(persons.concat(returnedPerson));
      setNewName("");
      setNewNumber("");
      setNotification(
        `Contact '${personObject.name}' number: '${personObject.number}' was added`,
      );
      setNotificationType("success");
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    });
  };

  const deletePerson = (id) => {
    const toBeDeleted = persons.find((n) => n.id === id);
    if (window.confirm(`Do you really want to delete ${toBeDeleted.name}`)) {
      personsService.deletePerson(id);
      setPersons(persons.filter((n) => n.id !== id));
      setNotification(
        `Contact '${toBeDeleted.name}' number: '${toBeDeleted.number}' was deleted`,
      );
      setNotificationType("error");
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification
        notification={notification}
        notificationType={notificationType}
      />
      <h2>Add contacts</h2>
      <Form
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
        addPerson={addPerson}
      ></Form>
      <h2>Filter</h2>
      <Filter filter={filter} handleFilterChange={handleFilterChange}></Filter>
      <h2>Numbers</h2>
      <Phonebook
        deletePerson={deletePerson}
        persons={persons}
        filter={filter}
      ></Phonebook>
    </div>
  );
};

export default App;
