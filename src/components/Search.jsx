import React, { useState } from "react";
import styled from "styled-components";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  // submit handler
  const searchHandler = (event) => {
    event.preventDefault();

    // navigate to results page
    navigate(`/searched/${searchQuery}`);

    // clear search input
    setSearchQuery("");
  };
  return (
    <FormStyle onSubmit={searchHandler}>
      <div>
        <FaSearch />
        <input
          onChange={(event) => setSearchQuery(event.target.value)}
          type="text"
          value={searchQuery}
        />
      </div>
    </FormStyle>
  );
};

// styled form
const FormStyle = styled.form`
  margin: 0rem 20rem;

  div {
    position: relative;
    width: 100%;
  }

  input {
    border: none;
    background: linear-gradient(35deg, #494949, #313131);
    font-size: 1.5rem;
    color: white;
    border-radius: 1rem;
    padding: 1rem 3rem;
    outline: none;
    width: 100%;
  }
  svg {
    position: absolute;
    top: 50%;
    left: 0%;
    transform: translate(100%, -50%);
    color: white;
  }
`;

export default Search;
