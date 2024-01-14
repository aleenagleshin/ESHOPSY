import { Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";

const Container = styled.div`
  flex: 1;
  margin: 3px;
  height: 70vh;
  position: relative;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
`;

const CategoryInfo = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const bounceAnimation = keyframes`
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-20px);
  }
  60% {
    transform: translateY(-10px);
  }
`;

const Title = styled.h1`
  color: #0a0b0b;
  margin-bottom: 20px;
  font-size: 50px; /* Adjust the font size as needed */
  animation: ${bounceAnimation} 2s ease-in-out infinite; /* Apply bounce animation */
`;

const StyledButton = styled.button`
  border: none;
  padding: 10px;
  background-color: white;
  color: #cfb664;
  cursor: pointer;
  font-weight: 600;
  transition: background-color 0.3s ease, color 0.3s ease;

  &:hover {
    background-color: #a29e48;
    color: white;
  }
`;

const CategoryItem = ({ item }) => {
  return (
    <Container>
      <Link to={`/productList/${item.cat}`}>
        <Image src={item.img} alt={item.title} />
        <CategoryInfo>
          <Title>{item.title}</Title>
          <StyledButton>SHOP NOW</StyledButton>
        </CategoryInfo>
      </Link>
    </Container>
  );
};

export default CategoryItem;
