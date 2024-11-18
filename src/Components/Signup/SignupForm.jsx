import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import showToastMessage from "../../utils/showToastMessage";
import Field from "../Common/Field";
import Loading from "../Icons/Loading";

export default function SignupForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    resetField,
  } = useForm();

  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = async (formData) => {
    if (formData.password !== formData.confirmPassword) {
      setError("confirmPassword", {
        message: "Passwords do not match.",
        type: "error",
      });
      return;
    }

    setIsLoading(true);

    let nextData = {
      full_name: formData.full_name,
      email: formData.email,
      password: formData.password,
    };

    if (formData.admin) {
      nextData.role = "admin";
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_BASE_URL}/api/auth/register`,
        nextData
      );

      if (response.status === 201) {
        showToastMessage("You've successfully registered.", "success");
        showToastMessage("Please login for access quiz.", "info");
        //
        resetField("full_name");
        resetField("email");
        resetField("password");
        resetField("confirmPassword");
        resetField("admin");
      }
    } catch (err) {
      if (err.response.status === 400) {
        showToastMessage(err.response.data.message, "error");
      } else {
        showToastMessage("Something went wrong.", "error");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="" onSubmit={handleSubmit(handleSignup)}>
      <div className="">
        <Field label="Full Name" isMandatory={true} error={errors.full_name}>
          <input
            {...register("full_name", {
              required: "Name is mandatory.",
            })}
            type="text"
            id="full_name"
            className={`w-full px-4 py-3 rounded-lg border ${
              errors.full_name ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="John Doe"
          />
        </Field>

        <Field label="Email" isMandatory={true} error={errors.email}>
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
      </div>

      <div className="flex  gap-4">
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

        <Field
          label="Confirm Password"
          isMandatory={true}
          error={errors.confirmPassword}
        >
          <input
            {...register("confirmPassword", {
              required: "Confirm Password is mandatory.",
              minLength: {
                value: 6,
                message: "Your password must be at least 6 characters",
              },
            })}
            type="password"
            id="confirmPassword"
            className={`w-full px-4 py-3 rounded-lg border ${
              errors.confirmPassword ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Confirm Password"
          />
        </Field>
      </div>

      <Field label="Register as Admin">
        <input
          {...register("admin")}
          type="checkbox"
          id="admin"
          className="px-4 py-3 rounded-lg border border-gray-300"
        />
      </Field>

      <button
        type="submit"
        className="w-full bg-primary text-white py-3 rounded-lg mb-2 flex items-center justify-center gap-2"
        disabled={isLoading}
      >
        {isLoading && <Loading />}
        Create Account
      </button>
    </form>
  );
}

/**
{
  "full_name": "Saad Hasan",
  "email": "saad@learnwithsumit.com",
  "password": "password123"
}
 */
