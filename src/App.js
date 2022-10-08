import Pages from "./pages/Pages";
import Category from "./components/Category";
import Search from "./components/Search";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { BiDish } from "react-icons/bi";

function App() {
  return (
    <>
      <Nav>
        <BiDish />
        <Logo to={"/"}>tastyTreats</Logo>
      </Nav>
      <Search />
      <Category />
      <Pages />
    </>
  );
}

// logo
const Logo = styled(Link)`
  text-decoration: none;
  font-size: 1.8rem;
  font-weight: 800;
  font-family: "Lobster Two", cursive;
  color: #f27121;
`;

// nav
const Nav = styled.div`
  padding: 4rem;
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    font-size: 2rem;
    color: #e94057;
  }
`;
export default App;
