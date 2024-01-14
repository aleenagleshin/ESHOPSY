import React from 'react';
import { ArrowLeftOutlined, ArrowRightOutlined } from "@material-ui/icons";
import { useState } from "react";
import styled, { keyframes } from "styled-components";
import { sliderItems } from "../data";
import { Link } from "react-router-dom";
import { animated, useSpring } from 'react-spring';

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  position: relative;
  overflow: hidden;
`;

const Arrow = styled.div`
  width: 50px;
  height: 50px;
  background-color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: ${props => (props.direction === "left" ? "10px" : "unset")};
  right: ${props => (props.direction === "right" ? "10px" : "unset")};
  margin: auto;
  cursor: pointer;
  opacity: 0.5;
  z-index: 2;
`;

const ArrowDown = styled.div`
  width: 50px;
  height: 50px;
  background-color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  cursor: pointer;
  opacity: 0.5;
  z-index: 2;
  animation: bounceAnimation 1.5s infinite;
`;

const ArrowDownIcon = styled(ArrowRightOutlined)`
  transform: rotate(90deg);
`;

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  transition: all 1.5s ease;
  transform: translateX(${props => props.slideindex * -100}vw);
`;

const Slide = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: row;
  background-color: ${props => props.bg};
  animation: fadeIn 1s ease-in-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const ImgContainer = styled.div`
  height: 100%;
  flex: 1;
`;



const Image = styled.img`
  height: 100%;
  width: 100%;
  transition: transform 0.5s ease;

  &:hover {
    transform: scale(1.1);
  }
`;




const InfoContainer = styled.div`
  flex: 1;
  padding: 50px;
`;

const Title = styled.h1`
  font-size: 70px;
  animation: fadeInDown 1s ease-in-out;
`;

const Desc = styled.p`
  margin: 50px 0px;
  font-size: 20px;
  font-weight: 500;
  letter-spacing: 3px;
  animation: fadeInUp 1s ease-in-out;
`;

const Button = styled(Link)`
  padding: 10px;
  font-size: 20px;
  background-color: transparent;
  cursor: pointer;
  text-decoration: none;
  position: relative;
  transition: transform 0.3s ease, background-color 0.3s ease, box-shadow 0.3s ease;

  &:after {
    content: "";
    position: absolute;
    width: 100%;
    height: 2px;
    background-color: #fff;
    bottom: 0;
    left: 0;
    transform: scaleX(0);
    transform-origin: bottom right;
    transition: transform 0.3s ease;
  }

  &:hover:after {
    transform: scaleX(1);
    transform-origin: bottom left;
  }

  &:hover {
    transform: scale(1.1);
    background-color: #fff;
    box-shadow: 0 0 10px rgba(255, 255, 255, 0.8);
  }

  animation: fadeInUp 1s ease-in-out;
`;





const fadeInDown = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const breathingAnimation = keyframes`
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(-5px);
  }
`;

const BreathingContent = styled.div`
  animation: ${breathingAnimation} 3s ease-in-out infinite;
  text-align: center;
  margin-top: 60px;
  position: relative;

  &:before,
  &:after {
    content: '';
    position: absolute;
    background-color: #3b0534;
    width: 50px;
    height: 10px;
    border-radius: 50%;
  }

  &:before {
    top: -25px;
    left: 50%;
    transform: translateX(-50%);
  }

  &:after {
    bottom: -25px;
    right: 50%;
    transform: translateX(50%);
  }
`;
const AnimatedSlide = animated(Slide);


const Slider = () => {
  const [slideindex, setSlideindex] = useState(0);

  const handleClick = (direction) => {
    if (direction === "left") {
      setSlideindex(slideindex > 0 ? slideindex - 1 : 2);
    } else {
      setSlideindex(slideindex < 2 ? slideindex + 1 : 0);
    }
  };

  const handleArrowDownClick = () => {
    const scrollOptions = {
      top: document.body.scrollHeight,
      behavior: 'smooth',
      duration: 9000, // Adjust the duration (in milliseconds) to control the speed
    };
  
    window.scrollTo(scrollOptions);
  };
  const props = useSpring({ opacity: 1, from: { opacity: 0 } });
  return (
    <Container>
      <Arrow direction="left" onClick={() => handleClick("left")}>
        <ArrowLeftOutlined />
      </Arrow>
      <Wrapper slideindex={slideindex}>
        {sliderItems.map((item) => (
          <AnimatedSlide bg={item.bg} key={item.id} style={props}>
          <Slide bg={item.bg} key={item.id}>
            <ImgContainer style={{ width: `${item.imgWidth}px` }}>
              <Image src={item.img} />
            </ImgContainer>
            <InfoContainer>
              <Title style={{ fontSize: "25px", textAlign: "center", color: "#163b05" }}>
                {item.title}
              </Title>
              <Desc style={{ fontSize: "20px", textAlign: "center", color: "#2f4b4e" }}>
                {item.desc}
              </Desc>
              <Button to="/productList/:categories">SHOW NOW</Button>
              <BreathingContent>
                <p style={{ fontSize: "18px", color: "#641146" }}>
                  Explore our latest collection of {item.category} products.
                  From trendy {item.category} to must-have accessories, we have
                  everything you need to elevate your style. Don't miss out on
                  exclusive offers and discounts. Shop now and stay fashionable!
                </p>
              </BreathingContent>
            </InfoContainer>
          </Slide>
          </AnimatedSlide>
        ))}
      </Wrapper>
      <Arrow direction="right" onClick={() => handleClick("right")}>
        <ArrowRightOutlined />
      </Arrow>
      <ArrowDown onClick={handleArrowDownClick}>
        <ArrowDownIcon />
      </ArrowDown>
    </Container>
  );
};

export default Slider;
