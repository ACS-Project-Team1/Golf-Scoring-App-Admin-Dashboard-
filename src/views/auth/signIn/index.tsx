import React, { useState, ChangeEvent, FormEvent } from "react";
import { useHistory, Link } from "react-router-dom";
import {
  Box, Button, Flex, FormControl, FormLabel, Input, Heading, Text, InputGroup, InputRightElement, Icon, Stack
} from "@chakra-ui/react";
import DefaultAuth from "layouts/auth/Default";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { signInWithCustomToken } from "firebase/auth";


import { RiEyeCloseLine } from "react-icons/ri";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCqWh5Jqy5HkWb3DSII88LNevqCw4B8NCg",
  authDomain: "golftrack-950c5.firebaseapp.com",
  projectId: "golftrack-950c5",
  storageBucket: "golftrack-950c5.appspot.com",
  messagingSenderId: "318557414456",
  appId: "1:318557414456:web:d6b363a5a5f174612e72cd",
  measurementId: "G-C29T93JMMK",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
function SignIn() {
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
      const response = await fetch("http://ec2-3-22-98-227.us-east-2.compute.amazonaws.com:8080/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        const data = await response.json();
        const userCredential = await signInWithCustomToken(auth, data.token);
        const idToken = await userCredential.user.getIdToken();
        
        localStorage.setItem("firebaseIdToken", idToken); // Save the Firebase token
        history.push("/admin/default"); // Redirect to dashboard
      } else {
        const errorData = await response.json();
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
      <Stack spacing={4} w="full" maxW="md">
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
          <Flex flexDirection='column' justifyContent='center' alignItems='start' maxW='100%' mt='0px'>

          <Text color="navy.700" fontWeight='400' fontSize='14px'>
          Not registered yet?{' '}
              <Link to='/auth/sign-up'>
                <Text color="brand.500" as='span' ms='5px' fontWeight='500'>
                Create an Account
                </Text>
              </Link>
              </Text>
          </Flex>
        </Box>
        </Stack>

      </Flex>
    </DefaultAuth>
  );
}

export default SignIn;
