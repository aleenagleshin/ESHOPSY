import styled, { keyframes } from "styled-components";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const popAnimation = keyframes`
  0% {
    transform: scale(0);
    opacity: 0;
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
`;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
    rgba(255, 255, 255, 0.8),
    rgba(255, 255, 255, 0.8)
  ),
    url("https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid #e0e0e0;
  border-radius: 16px;
  animation: ${popAnimation} 0.5s ease; /* Apply the pop animation */
`;

const Wrapper = styled.div`
  width: 50%;
  padding: 20px;
  background-color: transparent;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;



const Title = styled.h1`
  font-size: 32px;
  font-weight: 700;
  color: #333;
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;

  label {
    margin: 10px 0;
    font-size: 18px;
    color: #333;
  }

  input {
    width: 100%;
    padding: 12px;
    margin-bottom: 20px;
    border: 1px solid #ccc;
    border-radius: 6px;
    box-sizing: border-box;
    font-size: 16px;
    outline: none;

    &:focus {
      border-color: #106a6a;
    }
  }
`;

const blink = keyframes`
  0% {
    background-color: #135959;
  }
  50% {
    background-color: #4f769d;
  }
  100% {
    background-color: #135959;
  }
`;

const Button = styled.button`
  padding: 12px;
  width: 100%;
  max-width: 200px;
  background-color: #135959;
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #4f7f9d;
  }

  animation: ${blink} 2s infinite;
`;

const SideBySide = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;

  label {
    width: 45%;
  }

  input {
    width: 100%;
  }
`;

const AgreementCheckbox = styled.div`
  display: inline-block;
  justify-content: left;
  align-items: center;
`;

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    agreement: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.agreement) {
      alert("Please agree to the terms before registering.");
      return;
    }

    const apiUrl = "http://localhost:5000/api/auth/register";

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("Registration successful!");
        navigate("/");
      } else {
        console.error("Registration failed.");
      }
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  return (
    <Container>
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <Form onSubmit={handleSubmit}>
          <SideBySide>
            <label>
              <input
                type="text"
                name="username"
                placeholder="Enter your username"
                value={formData.username}
                onChange={handleChange}
              />
            </label>
            <label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
              />
            </label>
          </SideBySide>
          <label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
            />
          </label>
          <AgreementCheckbox>
            <input
              type="checkbox"
              name="agreement"
              checked={formData.agreement}
              onChange={handleChange}
            />
            <label>
              By creating an account I consent to the processing of my personal
              data in accordance with the PRIVACY POLICY
            </label>
          </AgreementCheckbox>
          {/* Use the styled Button component with the blinking animation */}
          <Button type="submit">Register</Button>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Register;
