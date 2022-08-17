import React, { useState } from "react";
import { supabase } from "../helpers/supabase";
import { useRouter } from "next/router";

type Props = {
  isRegisterPage: boolean;
};

const Form: React.FC<Props> = ({ isRegisterPage }) => {
  const router = useRouter();
  const [userDetails, setUser] = useState<{
    name: string | number;
    email: string;
    password: string | number;
  }>({
    name: "",
    email: "",
    password: "",
  });

  const resetState = () => {
    setUser({
      name: "",
      email: "",
      password: "",
    });
  };

  const registerNewUser = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!userDetails.email || !userDetails.password || !userDetails.name) {
      return;
    }
    try {
      const { user, session, error } = await supabase.auth.signUp(
        {
          email: userDetails.email,
          password: userDetails.password,
        },
        {
          data: {
            username: userDetails.name,
          },
        }
      );
      if (error) throw error;
      const profile = await supabase
        .from("profile")
        .insert([{ username: userDetails.name, uid: user.id }]);

      if (user && session && profile.data) {
        router.push("/");
      }

      if (profile.error) throw profile.error;
    } catch (error: any) {
      alert(error.error_description || error.message);
    } finally {
      resetState();
    }
  };

  const signInUser = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!userDetails.email || !userDetails.password) {
      return;
    }
    try {
      const { error } = await supabase.auth.signIn({
        email: userDetails.email,
        password: userDetails.password,
      });
      if (error) throw error;
    } catch (error: any) {
      alert(error.error_description || error.message);
    } finally {
      resetState();
    }
  };

  return (
    <>
      <div className="min-h-full flex flex-col justify-center py-16 sm:px-6 lg:px-8">
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" action="#" method="POST">
              {isRegisterPage ? (
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Name
                  </label>
                  <div className="mt-1">
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={userDetails.name}
                      onChange={(e) =>
                        setUser({ ...userDetails, name: e.target.value })
                      }
                      autoComplete="name"
                      required
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                </div>
              ) : (
                <></>
              )}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={userDetails.email}
                    onChange={(e) =>
                      setUser({ ...userDetails, email: e.target.value })
                    }
                    autoComplete="email"
                    required
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <div className="mt-1">
                  <input
                    value={userDetails.password}
                    id="password"
                    name="password"
                    type="password"
                    onChange={(e) =>
                      setUser({ ...userDetails, password: e.target.value })
                    }
                    autoComplete="current-password"
                    required
                    className=" block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-black focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </div>
              <div className="relative flex justify-start text-md">
                <a
                  href={!isRegisterPage ? "/register" : "/"}
                  className="px-2 bg-white text-blue-500 underline decoration-blue-500"
                >
                  {!isRegisterPage ? "Register" : "Sign in"}
                </a>
              </div>

              <div>
                <button
                  onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
                    isRegisterPage ? registerNewUser(e) : signInUser(e)
                  }
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  {isRegisterPage ? "Register" : "Sign in"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
export default Form;
