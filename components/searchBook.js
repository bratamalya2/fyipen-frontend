function SearchBook({ searchText, setSearchText }) {
  return (
    <>
      <input
        type="text"
        placeholder="Search book name or author"
        value={searchText}
        onInput={(e) => setSearchText(e.target.value)}
        className="h-9 px-3 my-4 border !border-red-500 rounded-md"
      />
    </>
  );
}

export default SearchBook;
