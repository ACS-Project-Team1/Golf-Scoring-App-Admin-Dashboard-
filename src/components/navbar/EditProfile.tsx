import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useHistory } from "react-router-dom";
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Heading,
  Text,
  Select,
  Stack,
} from "@chakra-ui/react";
import DefaultAuth from "layouts/auth/Default";
import { getUserData } from "./userData";

const EditProfile = () => {
  const history = useHistory();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
    phoneNumber: "",
    role: "USER",
  });
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("firebaseIdToken");
    const userId = localStorage.getItem("userId");
    console.log("token updgetate", token);

    if (token && userId) {
      getUserData(token, userId)
        .then((userData) => {
          setFormData({
            username: userData.username,
            email: userData.email,
            firstName: userData.firstName,
            lastName: userData.lastName,
            dateOfBirth: userData.dateOfBirth,
            gender: userData.gender,
            phoneNumber: userData.phoneNumber,
            role: userData.role,
          });
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
          setErrorMessage("Failed to fetch user data.");
        });
    } else {
      setErrorMessage("Authentication error. Please log in again.");
    }
  }, []);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdateProfile = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const token = localStorage.getItem("firebaseIdToken");
    console.log("token update", token);
    if (!token) {
      setErrorMessage("You must be logged in to update your profile.");
      return;
    }

    try {
      const response = await fetch(
        "http://ec2-3-22-98-227.us-east-2.compute.amazonaws.com:8080/api/users/updateUser",
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        const updatedUserData = await response.json();
        console.log("Profile update successful", updatedUserData);
        // Redirect after successful update
        history.push("/dashboard");
      } else {
        const errorData = await response.json();
        setErrorMessage(
          errorData.message || "Failed to update profile. Please try again."
        );
      }
    } catch (error) {
      console.error("Update Profile Error:", error);
      setErrorMessage("An unexpected error occurred. Please try again later.");
    }
  };

  return (
    <DefaultAuth illustrationBackground={""} image={""}>
      <Flex align="center" justify="center" p={6}>
        <Stack spacing={4} w="full" maxW="md">
          <Heading fontSize="2xl">Edit Profile</Heading>
          {errorMessage && <Text color="red.500">{errorMessage}</Text>}
          <form onSubmit={handleUpdateProfile}>
            <FormControl isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                name="email"
                onChange={handleChange}
                value={formData.email}
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Username</FormLabel>
              <Input
                name="username"
                onChange={handleChange}
                value={formData.username}
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>First Name</FormLabel>
              <Input
                name="firstName"
                onChange={handleChange}
                value={formData.firstName}
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Last Name</FormLabel>
              <Input
                name="lastName"
                onChange={handleChange}
                value={formData.lastName}
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Date of Birth</FormLabel>
              <Input
                type="date"
                name="dateOfBirth"
                onChange={handleChange}
                value={formData.dateOfBirth}
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Gender</FormLabel>
              <Select
                name="gender"
                onChange={handleChange}
                value={formData.gender}
                placeholder="Select gender"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </Select>
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Phone Number</FormLabel>
              <Input
                name="phoneNumber"
                onChange={handleChange}
                value={formData.phoneNumber}
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Role</FormLabel>
              <Select name="role" onChange={handleChange} value={formData.role}>
                <option value="USER">User</option>
                <option value="ADMIN">Admin</option>
              </Select>
            </FormControl>

            <Button mt={4} colorScheme="blue" type="submit">
              Update Profile
            </Button>
          </form>
        </Stack>
      </Flex>
    </DefaultAuth>
  );
};

export default EditProfile;
