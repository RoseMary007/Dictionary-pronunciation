import React, { useState } from "react";

type Props = {
  onSearch: (word: string) => void;
};

const SearchBar: React.FC<Props> = ({ onSearch }) => {
  const [input, setInput] = useState("");

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search a word..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <button onClick={() => onSearch(input)}>
        Search
      </button>
    </div>
  );
};

export default SearchBar;
