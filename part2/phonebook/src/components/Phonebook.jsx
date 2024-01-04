import Person from "./Person";

const Phonebook = (props) => {
  const { persons, filter, deletePerson } = props;

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase()),
  );

  return filteredPersons.map((person) => (
    <Person deletePerson={deletePerson} key={person.id} person={person} />
  ));
};

export default Phonebook;
