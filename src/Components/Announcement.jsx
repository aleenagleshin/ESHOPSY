import styled, { keyframes } from "styled-components";

const scrollAnimation = keyframes`
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(-100%);
  }
`;

const Container = styled.div`
  height: 50px;
  background-color: teal;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px; /* Adjust the font size as needed */
  font-weight: 500;
  overflow: hidden;
`;

const ScrollingText = styled.div`
  display: inline-block;
  animation: ${scrollAnimation} 10s linear infinite;
`;

const Announcement = () => {
  return (
    <Container>
      <ScrollingText>
        Super Deal! Free Shipping on Orders Over $50&nbsp;&nbsp;&nbsp;
      </ScrollingText>
    </Container>
  );
};

export default Announcement;
