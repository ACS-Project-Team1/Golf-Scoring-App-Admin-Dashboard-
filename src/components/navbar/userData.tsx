// api/user.ts

export async function getUserData(token: string, userId: string): Promise<{ username: string }> {
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
          return { username: userData.username };
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
