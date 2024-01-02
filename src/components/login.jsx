import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height:100vh;
  background-color: #f5f5f5;
`;
const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 400px;
  margin: 0 auto;
  padding-top:0px;
  padding-left: 20px;
  padding-right:20px;
  padding-bottom:20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  h2{
    text-align:center;
    margin top:0px;
    color: #007bff;
    font-size: 24px;
    margin-bottom: 20px;
  }
  
`;

const InputField = styled.input`
  width: calc(100% - 20px);
  margin-bottom: 15px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size:16px;
`;

const SubmitButton = styled.button`
  width: 100px;
  padding: 8px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-size:16px;
  margin: 0 auto;  

  &:hover {
    background-color: #0056b3;
  }
`;
const Login = ({ setIsAuthenticated, token, setToken }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      if (response.ok) {
        
        const data = await response.json();
        const authToken = data.token; 
        localStorage.setItem('token', authToken);
        setToken(authToken);
        setIsAuthenticated(true);
        console.log(data);
        navigate('/');

      } else {
        console.error('Login failed');
      }
    } catch (error) {
      console.error('Login failed:', error.message);
    }
  };

  return (
    <PageContainer>      
    <FormContainer onSubmit={handleLogin}>
    <h2>LOGIN</h2>
    
      <InputField
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <InputField
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <SubmitButton type="submit">Login</SubmitButton>
    </FormContainer>
    </PageContainer>
  );  
};

export default Login;
