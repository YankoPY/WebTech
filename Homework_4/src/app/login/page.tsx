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

  return (
    <Formik
      initialValues={{ username: "", password: "" }}
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
