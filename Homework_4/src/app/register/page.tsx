"use client";
import React, { useEffect, useState } from "react";
import { User, Error as err } from "../../../models";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ErrorMessage, Field, Form, Formik, replace } from "formik";
import * as Yup from "yup";
import { Navigate, Router } from "react-router-dom";
import { useRouter } from "next/navigation";

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

  return (
    <Formik
      initialValues={{ username: "", email: "", password: "" }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
          <div>
            <label htmlFor="username">Username</label>
            <Field type="text" name="username" />
            <ErrorMessage name="username" component="div" />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <Field type="email" name="email" />
            <ErrorMessage name="email" component="div" />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <Field type="password" name="password" />
            <ErrorMessage name="password" component="div" />
          </div>
          <button type="submit" disabled={isSubmitting}>
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
}
