import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { Link } from "react-router-dom";

const Veggie = () => {
  const [Veggies, setVeggies] = useState([]);

  useEffect(() => {
    const getVeggies = async () => {
      const res = await fetch(
        `https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=9&tags=vegetarian`
      );

      const data = await res.json();

      // cache to local storage
      localStorage.setItem("Veggies", JSON.stringify(data.recipes));

      setVeggies(data.recipes);
    };

    getVeggies();
  }, []);
  return (
    <Wrapper>
      <h3>Our Vegetarian Picks</h3>
      <Splide
        options={{
          perPage: 3,
          arrows: false,
          pagination: false,
          drag: "free",
          gap: "3rem",
        }}
      >
        {Veggies?.map((recipe) => (
          <SplideSlide key={recipe.id}>
            <Card>
              <Link to={"/recipe/" + recipe.id}>
                <p>{recipe.title}</p>
                <img src={recipe.image} alt={recipe.title} />
                <Gradient />
              </Link>
            </Card>
          </SplideSlide>
        ))}
      </Splide>
    </Wrapper>
  );
};

// wrapper
const Wrapper = styled.div`
  margin: 4rem 0rem;
`;

// card
const Card = styled.div`
  min-height: 15rem;
  border-radius: 2rem;
  overflow: hidden;
  position: relative;

  p {
    position: absolute;
    bottom: 0%;
    z-index: 10;
    transform: translateX(-50%, 0%);
    color: white;
    width: 100%;
    text-align: center;
    font-weight: 600;
    font-size: 1rem;
    height: 20%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  img {
    border-radius: 2rem;
    position: absolute;
    left: 0;
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
`;

// gradient
const Gradient = styled.div`
  z-index: 3;
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.3));
`;

export default Veggie;
