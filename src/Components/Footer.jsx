import React, { useState } from "react";
import styled from "styled-components";
import {
  Close as CloseIcon,
  Facebook,
  Instagram,
  MailOutline,
  Phone,
  Pinterest,
  Room,
  Twitter,
} from "@material-ui/icons";
import { mobile } from "../responsive";
import { Link } from "react-router-dom";

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  max-width: 600px;
  width: 100%;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  overflow-y: auto; /* Enable vertical scroll if needed */
  max-height: 70vh; /* Set a maximum height for the modal content */
`;

const CloseButton = styled.span`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  font-size: 20px;
`;

const AgreeButton = styled.button`
  margin-top: 10px;
  padding: 10px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const TermsModal = ({ closeModal }) => {
  const [agreed, setAgreed] = useState(false);

  // Modify this content with your terms and conditions
  const termsAndConditions = `
  1. Welcome to ESHOPSY!
    
  By accessing and using the [Your Company Name] website (the "Website") or making a purchase through our platform, you agree to comply with and be bound by these terms and conditions.
  
  2. User Accounts
  
  2.1. To access certain features of the Website, you may be required to create a user account. You are responsible for maintaining the confidentiality of your account information.
  
  2.2. We reserve the right to suspend or terminate accounts at our discretion, especially in cases of violations of these terms.
  
  3. Product Information
  
  3.1. We strive to provide accurate and up-to-date product information. However, we do not guarantee the accuracy, completeness, or reliability of any product descriptions or images.
  
  3.2. We reserve the right to correct any errors, inaccuracies, or omissions and to change or update information at any time without prior notice.
  
  4. Ordering and Payments
  
  4.1. By placing an order, you agree to pay the specified price for the selected products, including any applicable taxes and fees.
  
  4.2. Accepted payment methods and currencies will be specified on the checkout page.
  5.Privacy Policy
  
  5.1. Your use of the Website is also governed by our Privacy Policy, which can be found [provide a link to the privacy policy].
  6. Changes to Terms
  
  6.1. We reserve the right to update or modify these terms at any time without prior notice. Users will be notified of changes through the Website.
  
  7. Contact Information
  
  For questions or concerns regarding these terms, please contact us at eshopsy@gmail.com.
  `;
  
  

  const handleScroll = (e) => {
    // Check if the user has scrolled to the bottom of the modal
    const isAtBottom =
      e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;

    // Enable the "Agree" button when the user reaches the bottom
    if (isAtBottom) {
      setAgreed(true);
    }
  };

  const handleAgree = () => {
    setAgreed(true);
    // Optionally, you can add any additional logic here before closing the modal
    closeModal();
  };

  return (
    <ModalBackground onClick={closeModal}>
      <ModalContent onClick={(e) => e.stopPropagation()} onScroll={handleScroll}>
        <CloseButton onClick={closeModal}>
          <CloseIcon />
        </CloseButton>
        <h2>Terms and Conditions</h2>
        <p>{termsAndConditions}</p>
        {!agreed && (
          <AgreeButton onClick={handleAgree}>Agree</AgreeButton>
        )}
      </ModalContent>
    </ModalBackground>
  );
};

const Container = styled.div`
  display: flex;
  ${mobile({ flexDirection: "column" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const Logo = styled.h1``;

const Desc = styled.p`
  margin: 20px 0px;
`;

const SocialContainer = styled.div`
  display: flex;
`;

const SocialIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: white;
  background-color: #${(props) => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
`;

const Center = styled.div`
  flex: 1;
  padding: 20px;
  ${mobile({ display: "none" })}
`;

const Title = styled.h3`
  margin-bottom: 30px;
`;

const List = styled.ol`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column; /* Set the flex-direction to column */
`;

const ListItem = styled.li`
  margin-bottom: 10px;
  cursor: pointer;
`;

const Right = styled.div`
  flex: 1;
  padding: 20px;
  ${mobile({ backgroundColor: "#fff8f8" })}
`;

const ContactItem = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
`;

const Payment = styled.img`
  width: 50%;
`;

const Footer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Container>
      <Left>
        <Logo>ESHOPSY.</Logo>
        <Desc>
          "Discover a world of style at your fingertips.
          Shop with us and turn every click into a fashion-forward journey.
          Your next wardrobe upgrade is just a click away!"
        </Desc>
        <SocialContainer>
          <SocialIcon color="3B5999">
            <Facebook />
          </SocialIcon>
          <SocialIcon color="E4405F">
            <Instagram />
          </SocialIcon>
          <SocialIcon color="55ACEE">
            <Twitter />
          </SocialIcon>
          <SocialIcon color="E60023">
            <Pinterest />
          </SocialIcon>
        </SocialContainer>
      </Left>
      <Center>
        <Title>Useful Links</Title>
        <List>
          <Link to="/">
            <ListItem>Home</ListItem>
          </Link>
          <Link to="/Cart">
            <ListItem>Cart</ListItem>
          </Link>
          <Link to="/productList/:categories">
            <ListItem>Products</ListItem>
          </Link>
          <ListItem onClick={openModal} style={{ cursor: "pointer" }}>
            Terms and conditions
          </ListItem>
        </List>
      </Center>
      <Right>
        <Title>Contact</Title>
        <ContactItem>
          <Room style={{ marginRight: "10px" }} /> Dr.JMC Aranattukkara
        </ContactItem>
        <ContactItem>
          <Phone style={{ marginRight: "10px" }} /> +1 234 56 78
        </ContactItem>
        <ContactItem>
          <MailOutline style={{ marginRight: "10px" }} /> contact@eshopsy.com
        </ContactItem>
        <Payment src="https://i.ibb.co/Qfvn4z6/payment.png" />
      </Right>

      {/* Render the modal conditionally */}
      {isModalOpen && <TermsModal closeModal={closeModal} />}
    </Container>
  );
};

export default Footer;
