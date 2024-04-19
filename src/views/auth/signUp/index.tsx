import React, { useState, ChangeEvent, FormEvent } from "react";
import { useHistory, Link } from "react-router-dom";
import {
  Box, Button, Flex, FormControl, FormLabel, Input, Heading, Text, Select, useColorModeValue, Stack, Icon, InputGroup, InputRightElement, Checkbox
} from "@chakra-ui/react";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { RiEyeCloseLine } from "react-icons/ri";
import DefaultAuth from "layouts/auth/Default";
import illustration from "assets/img/auth/auth.png";

const SignUp = () => {
  const history = useHistory();
  const [formData, setFormData] = useState({
    username: "", email: "", password: "", confirmPassword: "", firstName: "",
    lastName: "", dateOfBirth: "", gender: "", phoneNumber: "", role: "USER"
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    e.persist(); // This ensures the event is not pooled
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSignup = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent the default form submission
    const { password, confirmPassword } = formData;

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    try {
      const response = await fetch("http://ec2-3-22-98-227.us-east-2.compute.amazonaws.com:8080/api/users/registerUser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        setErrorMessage(errorData.message || "Failed to create account. Please try again.");
      } else {
        console.log("Signup Successful");
        history.push("/auth/sign-in");
      }
    } catch (error) {
      console.error("Signup Error:", error);
      setErrorMessage("An unexpected error occurred. Please try again later.");
    }
  };
  

  return (
    <DefaultAuth illustrationBackground={''} image={''}>
      <Flex align="center" justify="center" p={6}>
        <Stack spacing={4} w="full" maxW="md">
          <Heading fontSize="2xl">Create Account</Heading>
          {errorMessage && <Text color="red.500">{errorMessage}</Text>}
          <form onSubmit={handleSignup}>
            <FormControl isRequired>
              <FormLabel>Email</FormLabel>
              <Input type="email" name="email" onChange={handleChange} value={formData.email} />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Username</FormLabel>
              <Input name="username" onChange={handleChange} value={formData.username} />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input type={showPassword ? "text" : "password"} name="password" onChange={handleChange} value={formData.password} />
                <InputRightElement>
                  <Icon as={showPassword ? RiEyeCloseLine : MdOutlineRemoveRedEye} onClick={() => setShowPassword(!showPassword)} />
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Confirm Password</FormLabel>
              <Input type="password" name="confirmPassword" onChange={handleChange} value={formData.confirmPassword} />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>First Name</FormLabel>
              <Input name="firstName" onChange={handleChange} value={formData.firstName} />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Last Name</FormLabel>
              <Input name="lastName" onChange={handleChange} value={formData.lastName} />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Date of Birth</FormLabel>
              <Input type="date" name="dateOfBirth" onChange={handleChange} value={formData.dateOfBirth} />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Gender</FormLabel>
              <Select name="gender" onChange={handleChange} value={formData.gender} placeholder="Select gender">
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </Select>
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Phone Number</FormLabel>
              <Input name="phoneNumber" onChange={handleChange} value={formData.phoneNumber} />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Role</FormLabel>
              <Select name="role" onChange={handleChange} value={formData.role}>
                <option value="USER">User</option>
                <option value="ADMIN">Admin</option>
              </Select>
            </FormControl>
            <Button mt={4} colorScheme="blue" type="submit">Sign Up</Button>
          </form>
          <Flex flexDirection='column' justifyContent='center' alignItems='start' maxW='100%' mt='0px'>
            <Text color="navy.700" fontWeight='400' fontSize='14px'>
              Already have an account?
              <Link to='/auth/sign-in'>
                <Text color="brand.500" as='span' ms='5px' fontWeight='500'>
                  Sign In
                </Text>
              </Link>
            </Text>
          </Flex>
        </Stack>
      </Flex>
    </DefaultAuth>
  );
};

export default SignUp;
