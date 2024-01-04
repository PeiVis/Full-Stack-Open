const SearchInput = (props) => {
  const { filter, handleFilterChange } = props;
  return <input value={filter} onChange={handleFilterChange}></input>;
};

export default SearchInput;
