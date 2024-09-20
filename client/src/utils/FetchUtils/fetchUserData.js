import { getProfile } from "../../api/authApi";

export async function fetchUserData(setUserData) {
  try {
    const response = await getProfile();
    setUserData(response.data[0]);
  } catch (error) {
    console.log(error);
  }
}
