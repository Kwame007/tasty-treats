import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";

const Cuisine = () => {
  const [cuisine, setCuisine] = useState([]);

  const { type } = useParams();

  useEffect(() => {
    // get cuisines
    const getCuisines = async () => {
      const res = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&cuisine=${type}`
      );

      const recipe = await res.json();

      setCuisine(recipe.results);
    };
    getCuisines();
  }, [type]);

  console.log(cuisine);
  return (
    <Grid
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {cuisine?.map((item) => (
        <Card key={item.id}>
          <Link to={"/recipe/" + item.id}>
            <img src={item.image} alt={item.title} />
            <h4>{item.title}</h4>
          </Link>
        </Card>
      ))}
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

export default Cuisine;
