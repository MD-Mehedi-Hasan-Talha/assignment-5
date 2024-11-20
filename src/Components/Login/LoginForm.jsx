import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import showToastMessage from "../../utils/showToastMessage";
import Field from "../Common/Field";
import Loading from "../Icons/Loading";

//TODO: Is Admin checkbox will handleld.
export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const { handleSetAuth } = useAuth();

  const submitLogin = async (formData) => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_BASE_URL}/api/auth/login`,
        formData
      );

      if (response.status === 200) {
        const data = response.data.data;

        if (formData.admin) {
          if (data?.user?.role?.toLowerCase() === "admin") {
            handleSetAuth({
              user: data.user,
              accessToken: data.tokens.accessToken,
              refreshToken: data.tokens.refreshToken,
            });
            showToastMessage(
              "You've successfully logged in as admin.",
              "success"
            );
            navigate("/dashboard");
          } else {
            showToastMessage("Invalid Email or Password!", "error");
          }
        } else {
          handleSetAuth({
            user: data.user,
            accessToken: data.tokens.accessToken,
            refreshToken: data.tokens.refreshToken,
          });
          showToastMessage("You've successfully logged in.", "success");
          navigate("/");
        }
      }
    } catch (err) {
      if (err.status === 401) {
        showToastMessage("Invalid Email or Password!", "error");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(submitLogin)}>
      <Field
        label="Enter your email address"
        isMandatory={true}
        error={errors.email}
      >
        <input
          {...register("email", {
            required: "Email is mandatory.",
          })}
          type="email"
          id="email"
          className={`w-full px-4 py-3 rounded-lg border ${
            errors.email ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="Email address"
        />
      </Field>
      <Field
        label="Enter your Password"
        isMandatory={true}
        error={errors.password}
      >
        <input
          {...register("password", {
            required: "Password is mandatory.",
            minLength: {
              value: 6,
              message: "Your password must be at least 6 characters",
            },
          })}
          type="password"
          id="password"
          className={`w-full px-4 py-3 rounded-lg border ${
            errors.password ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="Password"
        />
      </Field>
      <Field label="Login as Admin">
        <input
          {...register("admin")}
          type="checkbox"
          id="admin"
          name="admin"
          className="px-4 py-3 rounded-lg border border-gray-300"
        />
      </Field>
      <button
        type="submit"
        className="w-full bg-primary text-white py-3 rounded-lg mb-4 flex items-center justify-center gap-2"
        disabled={isLoading}
      >
        {isLoading && <Loading />}
        Sign in
      </button>
    </form>
  );
}
