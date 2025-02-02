import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
interface SignupInput {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    confirmPassword: string;
}
import axios from "axios";
import { BACKEND_URL } from "../config";
import React from "react";

export const Auth = ({ type }: { type: "signup" | "signin" }) => {
    const navigate = useNavigate();
    const [postInputs, setPostInputs] = useState<SignupInput>({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    async function sendRequest() {
        if (type === "signup" && postInputs.password !== postInputs.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        try {
            const payload = {
                ...postInputs,
                name: `${postInputs.firstname} ${postInputs.lastname}`, // Merging firstname and lastname
            };
            delete payload.confirmPassword; // Remove confirmPassword from the API request

            const response = await axios.post<{ jwt: string }>(
                `${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`,
                payload
            );

            const jwt = response.data.jwt;
            localStorage.setItem("token", jwt);
            navigate("/Dashboard");
        } catch (e) {
            alert("Error while signing up");
        }
    }

    return (
        <div className="h-screen flex justify-center flex-col">
            <div className="flex justify-center">
                <div>
                    <div className="px-10">
                        <div className="text-3xl font-extrabold">
                            {type === "signup" ? "Create an account" : "Sign in"}
                        </div>
                        <div className="text-slate-500">
                            {type === "signin" ? "Don't have an account?" : "Already have an account?"}
                            <Link className="pl-2 underline" to={type === "signin" ? "/signup" : "/signin"}>
                                {type === "signin" ? "Sign up" : "Sign in"}
                            </Link>
                        </div>
                    </div>
                    <div className="pt-8">
                        {type === "signup" && (
                            <>
                                <LabelledInput
                                    label="First Name"
                                    placeholder="Pranav"
                                    onChange={(e) =>
                                        setPostInputs({ ...postInputs, firstname: e.target.value })
                                    }
                                />
                                <LabelledInput
                                    label="Last Name"
                                    placeholder="Kulkarni"
                                    onChange={(e) =>
                                        setPostInputs({ ...postInputs, lastname: e.target.value })
                                    }
                                />
                            </>
                        )}
                        <LabelledInput
                            label="Email"
                            placeholder="Pranav@gmail.com"
                            onChange={(e) =>
                                setPostInputs({ ...postInputs, email: e.target.value })
                            }
                        />
                        <LabelledInput
                            label="Password"
                            type="password"
                            placeholder="Enter your password"
                            onChange={(e) =>
                                setPostInputs({ ...postInputs, password: e.target.value })
                            }
                        />
                        {type === "signup" && (
                            <LabelledInput
                                label="Confirm Password"
                                type="password"
                                placeholder="Re-enter your password"
                                onChange={(e) =>
                                    setPostInputs({ ...postInputs, confirmPassword: e.target.value })
                                }
                            />
                        )}
                        <button
                            onClick={sendRequest}
                            type="button"
                            className="mt-8 w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                        >
                            {type === "signup" ? "Sign up" : "Sign in"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

interface LabelledInputType {
    label: string;
    placeholder: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    type?: string;
}

function LabelledInput({ label, placeholder, onChange, type }: LabelledInputType) {
    return (
        <div>
            <label className="block mb-2 text-sm text-black font-semibold pt-4">{label}</label>
            <input
                onChange={onChange}
                type={type || "text"}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder={placeholder}
                required
            />
        </div>
    );
}
