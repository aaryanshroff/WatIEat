import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import FormError from "../components/FormError";
import { apiService } from "../services/api-service";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    try {
      const token = await apiService("/auth/login", "POST", {
        email: formData.email,
        password: formData.password,
      });

      localStorage.setItem("token", token);

      navigate("/");
    } catch (error) {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="xl:w-1/3 lg:w-1/2 w-full px-4">
        <h1 className="text-4xl text-left font-bold tracking-wide">
          Log In<span className="text-5xl text-red-500">.</span>
        </h1>
        <div className="border rounded-lg shadow-sm px-8 py-8 mt-8">
          <form action="" className="flex flex-col space-y-8 w-full">
            <label htmlFor="" className="space-y-2">
              <span className="font-medium">Email</span>
              <div>
                <input
                  type="email"
                  placeholder="timapple@gmail.com"
                  className="form-control invalid:border-pink-500 invalid:text-pink-600
      focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
                  onChange={(e) =>
                    setFormData((curr) => ({
                      ...curr,
                      email: e.target.value,
                    }))
                  }
                />
              </div>
            </label>
            <label htmlFor="" className="space-y-2">
              <span className="font-medium">Password</span>
              <div>
                <input
                  type="password"
                  placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
                  className="form-control"
                  onChange={(e) =>
                    setFormData((curr) => ({
                      ...curr,
                      password: e.target.value,
                    }))
                  }
                />
              </div>
            </label>
          </form>
          <button
            className="btn-primary mb-2"
            onClick={handleSubmit}
            disabled={!formData.email || !formData.password}
          >
            Submit
          </button>
          <FormError errorMsg={error} />
          {/* Submit button */}
        </div>
        <div className="my-3">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-blue-500 hover:cursor-pointer hover:text-blue-600"
          >
            Register
          </Link>
        </div>
      </div>
      {/* Heading, form, submit button */}
    </div>
  );
};

export default Login;
