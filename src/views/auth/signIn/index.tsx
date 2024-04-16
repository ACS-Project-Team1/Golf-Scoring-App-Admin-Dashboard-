import React, { useState, ChangeEvent, FormEvent } from "react";
import { useHistory, NavLink } from "react-router-dom";
import {
  Box, Button, Flex, FormControl, FormLabel, Input, Heading, Text, InputGroup, InputRightElement, Icon, Checkbox
} from "@chakra-ui/react";
import DefaultAuth from "layouts/auth/Default";
import { MdOutlineRemoveRedEye } from "react-icons/md";

import { RiEyeCloseLine } from "react-icons/ri";function SignIn() {
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [show, setShow] = useState(false);

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();  
  
    if (!username || !password) {
      setErrorMessage("Username and password are required.");
      return;
    }
  
    const userData = {
      email: username,
      password,
    };
  
    try {
      const response = await fetch("http://localhost:8080/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
  
      if (response.ok) {
        // Assuming you get back a JSON with user details or token
        const data = await response.json();
        console.log("Login Successful", data); // For debugging
        history.push("/admin/default"); // Redirect to dashboard
      } else {
        const errorData = await response.json(); // Assuming error details are also in JSON
        setErrorMessage(errorData.message || "Invalid username or password. Please try again.");
      }
    } catch (error) {
      console.error("Login Error:", error);
      setErrorMessage("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <DefaultAuth illustrationBackground={''} image={''}>
      <Flex align="center" justify="center" p={6} flexDirection="column">
        <Box width={{ base: "90%", md: "420px" }} mt="40px">
          <Heading mb="2" textAlign="center">Sign In</Heading>
          {errorMessage && <Text mb="4" color="red.500" textAlign="center">{errorMessage}</Text>}
          <form onSubmit={handleLogin}>
            <FormControl isRequired mb="3">
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="mail@example.com"
              />
            </FormControl>
            <FormControl isRequired mb="3">
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  type={show ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                />
                <InputRightElement>
                  <Icon
                    as={show ? RiEyeCloseLine : MdOutlineRemoveRedEye}
                    onClick={() => setShow(!show)}
                    cursor="pointer"
                  />
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Button
              type="submit"
              colorScheme="blue"
              width="full"
              mt="4">
              Sign In
            </Button>
          </form>
          <Text mt="4" fontSize="sm" textAlign="center">
            Not registered yet?{' '}
            <NavLink to='/auth/sign-up' style={{ color: "#4299E1" }}>
              Create an Account
            </NavLink>
          </Text>
        </Box>
      </Flex>
    </DefaultAuth>
  );
}

export default SignIn;
