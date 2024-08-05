import { setCookie } from "cookies-next";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";

const useLogin = () => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const userLogin = async (username:string,password:string) => {
    try {
      console.log(username,password);
      const { data } = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL_USER}/auth/login`, {
        user_name: username,
        password: password,
        application_tag: "ORIO-ATT-APP"
      });

      console.log("Login Successfull");
      return data.token;

    } catch (error) {
      console.log(error);
      toast.error("Login Unsucessful!");
      // exit(1);
    }
  }

  const login = async (username: string, password: string) => {
    setIsLoading(true);
    setError(null);

    const token = await userLogin(username,password);

    if (token) {
      toast.success("Login Succesfull!");
      const expires = new Date();
      expires.setDate(expires.getDate() + 7);
      setCookie("token", token,{
        expires
      });
      setIsLoading(false);
      router.push("/dashboard");
    } else {
      setIsLoading(false);
      setError("Username or password is incorrect");
    }
  };

  return { login, isLoading, error };
};

export default useLogin;
