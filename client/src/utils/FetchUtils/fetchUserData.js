import { getProfile } from "../../api/authApi";

export async function fetchUserData(setUserData) {
  try {
    const { data } = await getProfile();
    setUserData(data);
  } catch (error) {
    console.log(error);
  }
}
