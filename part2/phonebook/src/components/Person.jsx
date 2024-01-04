const Person = (props) => {
  const { person, deletePerson } = props;

  return (
    <div>
      {person.name} {person.number}
      <button onClick={() => deletePerson(person.id)}>delete</button>
    </div>
  );
};

export default Person;
