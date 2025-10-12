"use client";

import React, { FormEvent, useState } from "react";

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

export default function Subscribe() {
  const [email, setEmail] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [validationError, setValidationError] = useState<string | null>(null);

  const validateEmail = (email: string): boolean => {
    if (!email) {
      setValidationError("Email is required");
      return false;
    }
    if (!EMAIL_REGEX.test(email)) {
      setValidationError("Please enter a valid email address");
      return false;
    }
    setValidationError(null);
    return true;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setValidationError(null);

    if (!validateEmail(email)) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/v1/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSubmitStatus("success");
        setEmail("");
      } else {
        setSubmitStatus("error");
      }
    } catch (_error) {
      console.error("Error submitting form: ", _error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitStatus === "success") {
    return (
      <div className="border border-white p-13 text-center">
        <h2 className="text-lg font-bold mb-2.5">Welcome to the inner circle</h2>
        <p className="text-sm">You&apos;ll hear from me soon.</p>
      </div>
    );
  }

  return (
    <div className="p-2 md:p-16 lg:p-32 text-center">      
      {isSubmitting ? (
        <p className="text-base font-bold mb-7">Subscribing...</p>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="flex flex-wrap items-center justify-center w-full mb-3"
        >
          <div className="flex flex-nowrap items-center justify-center w-full">
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (validationError) validateEmail(e.target.value);
            }}
            className={`border ${
              validationError ? "border-red-500" : "border-white"
            } rounded-l text-base p-2 w-4/5`}
            required
          />
          <button
            type="submit"
            className="bg-white text-black border border-white rounded-r text-base p-2 items-center justify-center gap-0.5 cursor-pointer"
          >
            <span className="whitespace-nowrap">Subscribe ⚡️</span>
          </button>
          </div>

          {validationError && (
            <p className="text-red-500 w-full mt-4 text-sm">
              {validationError}
            </p>
          )}

          {submitStatus === "error" && !validationError && (
            <p className="text-red-500 w-full mt-4 text-sm">
              Something went wrong. Please try again.
            </p>
          )}
        </form>
      )}
    </div>
  );
}
