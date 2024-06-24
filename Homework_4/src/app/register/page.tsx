"use client";
import React, { useEffect, useState } from "react";
import { User, Error as err } from "../../../models";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ErrorMessage, Field, Form, Formik, replace } from "formik";
import * as Yup from "yup";
import { Navigate, Router } from "react-router-dom";
import { useRouter } from "next/navigation";
import "../register/registerPage.css"

const validationSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});


type RegistrationProps = {
  onSubmit: (formData: FormData) => void;
  emailError: string;
  passwordError: string;
  error: string;
};

export default function Page() {
const router = useRouter();
  function postData(user: User) {
    const response = fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user }),
    })
      .then((response) => {
        if (response.ok) {
          router.replace('login');
        } else {
          throw new Error("Failed to save data");
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }
  
  function registerUser(username: any, password: any, email: any) {
    postData({ username, email, password } as User);
  }

  function register(formData: User) {
    const result = registerUser(
      formData.username,
      formData.password,
      formData.email
    );
    return result;
  }

  const handleSubmit = (values: any, { setSubmitting }) => {
    setSubmitting(true);
    register(values);
    console.log("Submitted values:", values);

    setSubmitting(false);
  };

  const logInRedirect = () => {
    router.replace('./login');
  };

  return (
    <Formik
      initialValues={{ username: "", email: "", password: "" }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <div className="container">
        <Form className="form">
          <div className="group">
            <h1 className="title">Register</h1>
            <h2 className="lable">Username</h2>
            <Field className="lable" type="text" name="username"/>
            <ErrorMessage className="error" name="username" component="div" />
          </div>
          <div className="group">
            <h2 className="lable">Email</h2>
            <Field className="lable" type="email" name="email" />
          </div>
          <div className="group">
            <h2 className="lable">Password</h2>
            <Field className="lable" type="password" name="password" />
            <ErrorMessage className="error" name="password" component="div" />
          </div>
          <button type="submit" disabled={isSubmitting} className="registerButton">
            Register
          </button>
          <div>
            <h3 className="message">Already have an account? &nbsp;&nbsp;
              <button type="button" onClick={logInRedirect} className="loginButton">Log In
              </button>
            </h3>
          </div>
        </Form>
      </div>
      )}
    </Formik>
  );
}
