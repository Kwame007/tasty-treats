import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import styled from "styled-components";

const SearchResults = () => {
  const [searchedRecipe, setSearchedRecipe] = useState([]);

  const { query } = useParams();

  useEffect(() => {
    // get searchedRecipe meal
    const getSearchedRecipe = async () => {
      const res = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&query=${query}`
      );

      const recipe = await res.json();

      setSearchedRecipe(recipe.results);
    };
    getSearchedRecipe();
  }, [query]);
  console.log(searchedRecipe);
  return (
    <Grid
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {searchedRecipe?.map((item) => {
        return (
          <Card key={item.id}>
            <Link to={"/recipe/" + item.id}>
              <img src={item.image} alt={item.title} />
              <h4>{item.title}</h4>
            </Link>
          </Card>
        );
      })}
    </Grid>
  );
};

// grid
const Grid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  gap: 3rem;
`;

// card
const Card = styled.div`
  img {
    width: 100%;
    border-radius: 2rem;
  }

  a {
    text-decoration: none;
  }
  h4 {
    text-align: center;
    padding: 1rem;
  }
`;

export default SearchResults;
