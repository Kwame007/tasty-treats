import React from "react";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router";
import { motion } from "framer-motion";

const Recipe = () => {
  const [recipeDetails, setRecipeDetails] = useState({});
  const [activeTab, setActiveTab] = useState("instructions");

  const { id } = useParams();

  useEffect(() => {
    const fetchDetails = async () => {
      const data = await fetch(
        `https://api.spoonacular.com/recipes/${id}/information?apiKey=${process.env.REACT_APP_API_KEY}`
      );

      const detailData = await data.json();

      setRecipeDetails(detailData);
    };
    fetchDetails();
  }, [id]);

  return (
    <DetailWrapper
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div>
        <h2>{recipeDetails.title}</h2>
        <img src={recipeDetails.image} alt="" />
      </div>
      <Info>
        <Button
          className={activeTab === "instructions" ? "active" : ""}
          onClick={() => setActiveTab("instructions")}
        >
          Instructions
        </Button>
        <Button
          className={activeTab === "ingredients" ? "active" : ""}
          onClick={() => setActiveTab("ingredients")}
        >
          Ingredients
        </Button>
        {activeTab === "instructions" && (
          <div>
            <h3
              dangerouslySetInnerHTML={{ __html: recipeDetails.summary }}
            ></h3>
            <h3
              dangerouslySetInnerHTML={{ __html: recipeDetails.instructions }}
            ></h3>
          </div>
        )}

        {activeTab === "ingredients" && (
          <ul>
            {recipeDetails.extendedIngredients.map((ingredient) => (
              <li key={ingredient.id}>{ingredient.original}</li>
            ))}
          </ul>
        )}
      </Info>
    </DetailWrapper>
  );
};

// detail wrapper
const DetailWrapper = styled(motion.div)`
  margin-top: 10rem;
  margin-bottom: 5rem;
  display: flex;

  .active {
    background: linear-gradient(35deg, #494949, #313131);
    color: white;
  }

  h2 {
    margin-bottom: 2rem;
  }
  li {
    font-size: 1.2rem;
    line-height: 2.5rem;
  }
  ul {
    margin-top: 2rem;
  }
`;

// button
const Button = styled.button`
  padding: 1rem 2rem;
  color: #313131;
  background: white;
  border: 2px solid black;
  margin-right: 2rem;
  font-weight: 600;
`;

// info
const Info = styled.div`
  margin-left: 10rem;
`;
export default Recipe;
