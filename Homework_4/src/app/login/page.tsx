"use client";
import React, { useEffect, useState } from "react";
import { User, Error as err } from "../../../models";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ErrorMessage, Field, Form, Formik, replace } from "formik";
import * as Yup from "yup";
import { Navigate, Router } from "react-router-dom";
import { useRouter } from "next/navigation";
import { POST } from "../api/login/route";
import { createHmac } from "crypto";
import "../login/loginPage.css";

const salt = "foo"

const validationSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

export default function Page() {
const router = useRouter();
  function postData(user: User) {
    const response = fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user }),
    })
      .then((response) => {
        if (response.ok) {
          router.replace('homepage');
        } else {
          throw new Error("Failed to login");
        }
      })
      
      .catch((err) => {
        console.error(err);
      });
  }
  
  function loginUser(username: any, password: any) {
    postData({ username, password } as User);
  }

  function login(formData: User) {
    const hash = createHmac('sha256', salt);
      hash.update(formData.password);
      formData.password = hash.digest('hex');
    const result = loginUser(
      formData.username,
      formData.password,
    );
    return result;
  }

  const handleSubmit = (values: any, { setSubmitting }) => {
    setSubmitting(true);
    login(values);
    console.log("Submitted values:", values);
    setSubmitting(false);
  };

  const registerRedirect = () => {
    router.replace('./register');
  };

  return (
    <Formik
      initialValues={{ username: "", password: "" }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
    <div className="container">
      <Form className="form">
        <div className="group">
          <h1 className="title">Sign In</h1>
           <h2 className="lable">Username</h2>
          <Field className="lable" type="text" name="username"/>
          <ErrorMessage className="error" name="username" component="div" />
        </div>
        <div className="group">
          <h2 className="lable">Password</h2>
          <Field className="lable" type="password" name="password" />
          <ErrorMessage className="error" name="password" component="div" />
        </div>
        <button type="submit" disabled={isSubmitting} className="loginButton">
          Log In
        </button>
        <div>
        <h3 className="message">Don't have an account? &nbsp;&nbsp;
        <button type="button" onClick={registerRedirect} className="registerB">Register
        </button>
        </h3>
        </div>
      </Form>
    </div>
      )}
    </Formik>
  );
}
