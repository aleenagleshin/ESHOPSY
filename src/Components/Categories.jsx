import styled from "styled-components";
import { CategoryList } from "../data";
import CategoryItem from "./categoryitem";

const Container = styled.div`
  display: flex;
  padding: 20px;
  justify-content: space-between;
`;

const Categories = () => {
  return (
    <Container>
      {CategoryList.map((item, index) => (
        <CategoryItem key={index} item={item} />
      ))}
    </Container>
  );
};

export default Categories;

  
