// Define an interface to describe the complete user data
interface UserData {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  phoneNumber: string;
  role: string;
  password: string;
  // Add other fields as necessary, based on what your backend API returns
}

export async function getUserData(token: string, userId: string): Promise<UserData> {
  try {
    const response = await fetch(`http://ec2-3-22-98-227.us-east-2.compute.amazonaws.com:8080/api/users/getUser/${userId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const userData = await response.json();
      return {
        username: userData.username,
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        dateOfBirth: userData.dateOfBirth,
        gender: userData.gender,
        phoneNumber: userData.phoneNumber,
        role: userData.role,
        password:userData.password,
        // Map other fields here
      };
    } else {
      throw new Error("Failed to fetch user data");
    }
  } catch (error) {
    if (error instanceof Error && error.message) {
      throw new Error(`Error fetching user data: ${error.message}`);
    } else {
      throw new Error(`Error fetching user data: ${JSON.stringify(error)}`);
    }
  }
}
