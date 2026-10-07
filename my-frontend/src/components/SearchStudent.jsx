function SearchStudent({
  search,
  setSearch
}) {

  return (

    <div className="search-box">

      <label htmlFor="search">
        Search
      </label>

      <input
        id="search"
        type="search"
        value={search}
        onChange={(event) =>
          setSearch(event.target.value)
        }
        placeholder="Search by ID or name..."
      />

    </div>
  );
}

export default SearchStudent;