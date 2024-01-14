import { Badge } from "@material-ui/core";
import {  ShoppingCartOutlined } from "@material-ui/icons";
import React from "react";
import styled, { keyframes } from "styled-components";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useState } from "react";
const Container = styled.div`
  height: 80px;
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;




const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const pulsate = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
`;

const Logo = styled.h1`
  font-weight: bold;
  font-size: 36px;
  margin: 0;
  position: relative;
  overflow: hidden;
  animation: ${pulsate} 1s infinite; /* Adjust the duration as needed */

  &:after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 3px;
    background-color: #084967;
    transform: scaleX(0);
    transform-origin: bottom right;
    transition: transform 0.5s ease-in-out;
  }

  &:hover:after {
    transform: scaleX(1);
    transform-origin: bottom left;
  }
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

// ... (other imports)

const BlinkingAnimation = keyframes`
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
`;

const ShoppingCartIcon = styled(ShoppingCartOutlined)`
  animation: ${BlinkingAnimation} 1s infinite;
`;

const MenuItem = styled.div`
  font-size: ${(props) => (props.large === "true" ? "18px" : "14px")};
  cursor: pointer;
  margin: 20px;
  position: relative;
  transition: all 0.3s ease-in-out;

  &:hover {
    transform: scale(1.1);
  }

  &:before {
    content: "";
    position: absolute;
    width: 0;
    height: 2px;
    bottom: -5px;
    left: 50%;
    background-color: #08354a;
    transition: all 0.3s ease-in-out;
  }

  &:hover:before {
    width: 100%;
    left: 0;
  }
`;
const fadeIn = keyframes`
  0% {
    opacity: 0;
    transform: translateY(-10px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Popup = styled.div`
  display: ${(props) => (props.visible ? "block" : "none")};
  position: fixed;
  top: 50vh; /* Center vertically */
  left: 50vw; /* Center horizontally */
  transform: translate(-50%, -50%);
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 10px;
  animation: ${fadeIn} 0.3s ease-in-out;
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const LocationContainer = styled.div`
  display: flex;
  align-items: center;
  margin-right: 25px;
  cursor: pointer; /* Add this line to make it clickable */
`;

const LocationIcon = styled.span`
  font-size: 20px;
  margin-right: 5px;
`;

const LocationText = styled.span`
  font-size: 16px;
`;

const LocationPopupMessage = styled.div`
  opacity: ${(props) => (props.visible ? 1 : 0)};
  visibility: ${(props) => (props.visible ? "visible" : "hidden")};
  position: fixed;
  top: 50vh; /* Center vertically */
  left: 50vw; /* Center horizontally */
  transform: translate(-50%, -50%);
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  animation: ${fadeIn} 0.5s ease-in-out;
`;
const LocationPopupButton = styled.button`
  margin-top: 10px;
  padding: 8px 16px;
  background-color: #084967;
  color: #fff;
  border: none;
  cursor: pointer;
`;
const LocationInput = styled.input`
  margin-right: 5px;
`;

const LocationSubmitButton = styled.button`
  padding: 5px 10px;
  background-color: #084967;
  color: #fff;
  border: none;
  cursor: pointer;
`;

// ... (other imports)

const Navbar = () => {
  const quantity = useSelector((state) => state.cart.quantity);
  const [popupVisible, setPopupVisible] = useState(false);
  const [locationPopupVisible, setLocationPopupVisible] = useState(false);

  const handlePopupToggle = () => {
    setPopupVisible(!popupVisible);
  };

  const handleLocationPopupToggle = () => {
    setLocationPopupVisible(!locationPopupVisible);
  };

  const handleLocationSubmit = () => {
    // Perform actions when the location is submitted
    // For example, close the location popup and show the extra discount popup
    setLocationPopupVisible(false);
    setPopupVisible(true);

    // Set a timeout to hide the popup after 5 seconds
    setTimeout(() => {
      setPopupVisible(false);
    }, 3000);
  };

  return (
    <Container>
      <Wrapper>
        <Left>
          <LocationContainer onClick={handleLocationPopupToggle}>
            <LocationIcon>📍</LocationIcon>
            <LocationText>Add Your Location to check extra discount</LocationText>
          </LocationContainer>
          <LocationPopupMessage visible={locationPopupVisible}>
            <p>Please add your location to check for extra discounts.</p>
            <LocationInput type="text" placeholder="Enter your location" />
            <LocationPopupButton onClick={handleLocationSubmit}>
              Submit
            </LocationPopupButton>
          </LocationPopupMessage>
        </Left>
        <Center>
          <Logo>ESHOPSY</Logo>
        </Center>
        <Right>
          <Popup visible={popupVisible}>
            yeah ! CONGRATS...Extra discount for your location!
          </Popup>
          <Link to="/Register">
            <MenuItem large="true">REGISTER</MenuItem>
          </Link>
          <Link to="/Login">
            <MenuItem large="true">LOGIN</MenuItem>
          </Link>
          <Link to="/Cart">
            <MenuItem onClick={handlePopupToggle}>
              <Badge
                overlap="rectangular"
                badgeContent={quantity}
                color="primary"
              >
                <ShoppingCartIcon />
              </Badge>
            </MenuItem>
          </Link>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
