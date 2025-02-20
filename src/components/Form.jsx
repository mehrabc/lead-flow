"use client";
import bg from "@/assets/bg.jpg";
import { Loader } from "lucide-react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Image from "next/image";
import { submitForm } from "@/app/actions";
import Link from "next/link";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const formSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  gender: z.enum(["male", "female", "other"], { message: "Select a gender" }),
  country: z.string().min(2, "Select your country"),
  city: z.string().min(2, "City is required"),
  email: z.string().email("Enter a valid email"),
  phone: z.string().min(10, "Enter a valid phone number"),
  course: z.enum(["IELTS Preparation", "Spoken English"], {
    message: "Select a course",
  }),
  purpose: z.enum(
    [
      "IELTS Exam Preparation",
      "Improving English Speaking",
      "Improving English Writing & Reading",
    ],
    {
      message: "Select a purpose",
    }
  ),
  terms: z.boolean().refine((val) => val === true, {
    message: "You must agree to the terms and conditions",
  }),
});

const Form = () => {
  console.log("Rendering Form component");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false); // Loading state
  const [enrollmentId, setEnrollmentId] = useState(null);
  const [serverError, setServerError] = useState(null);
  const [phone, setPhone] = useState(""); // Use state hook
  const [selectedCountry, setSelectedCountry] = useState();
  const [displayValue, setDisplayValue] = useState();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      gender: undefined,
      country: "",
      city: "",
      email: "",
      phone: "", // Add default country code
      course: undefined,
      purpose: undefined,
      terms: false,
    },
  });

  async function onSubmit(data) {
    setIsSubmitting(true);
    try {
      const result = await submitForm(data);
      if (result.success) {
        setIsSubmitted(true);
        setEnrollmentId(result.enrollmentId);
      }
    } catch (error) {
      setServerError(error.message);
    } finally {
      setIsSubmitting(false); // Stop loading
    }
  }

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center p-8"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
        >
          <Check className="w-8 h-8 text-green-600" />
        </motion.div>
        <h2 className="text-2xl font-semibold mb-2">
          Form Submitted Successfully!
        </h2>
        <p className="text-muted-foreground">
          Thank you for your enrollment. Your enrollment ID is: {enrollmentId}
        </p>
        <p className="text-muted-foreground mt-2">
          You may now exit this page.
        </p>
      </motion.div>
    );
  }

  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="relative w-full">
          <Image
            src={bg || "/placeholder.svg"}
            alt="Background Image"
            className="w-full max-h-[300px] object-cover"
          />
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black opacity-35"></div>

          {/* Hero Text */}
          <div className="absolute flex flex-col gap-3 w-full text-center z-30 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white">
            <h1 className=" text-2xl sm:text-3xl lg:text-6xl font-bold">
              Register and Start Your Journey!
            </h1>
            <h2 className="font-semibold lg:text-2xl sm:text-lg text-xs">
              Register today to explore global university opportunities, receive
              free mentoring, and take the first step toward your future!
            </h2>
          </div>
        </div>
        <div className="flex flex-col items-start lg:p-6 sm:p-4 p-6 max-w-[90%] sm:max-w-full lg:max-w-[70%] mx-auto ">
          <h3 className="text-sm sm:text-lg lg:text-xl font-semibold px-5">
            Personal Information
          </h3>
          <span className="font-normal text-xs sm:text-sm lg:text-base px-5 mb-4">
            Tell us about yourself
          </span>
          <form
            onSubmit={handleSubmit(onSubmit, (errors) =>
              console.log("Form errors:", errors)
            )}
            className=""
          >
            <div className="gap-x-3 gap-y-2 grid sm:grid-cols-2 grid-cols-1 ">
              <div className="flex flex-col px-5">
                <label className="form-label">First Name</label>
                <input {...register("firstName")} className="input-field" />
                {errors.firstName && (
                  <p className="text-red-500 text-xs">
                    {errors.firstName.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col px-5">
                <label className="form-label">Last Name</label>
                <input {...register("lastName")} className="input-field" />
                {errors.lastName && (
                  <p className="text-red-500 text-xs">
                    {errors.lastName.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col px-5">
                <label className="form-label">Phone Number</label>
                <Controller
                  name="phone"
                  control={control}
                  rules={{ required: "Phone number is required" }}
                  render={({ field }) => (
                    <PhoneInput
                      country={"bd"}
                      excludeCountries={["il"]}
                      value={phone}
                      onChange={(phone) => setPhone(phone)}
                      countryCodeEditable={false}
                      enableSearch={true}
                      disableSearchIcon={true}
                      // inputClass="!text-xs !px-12 !text-start !text-formInputText !font-semibold !h-[43.2px] !rounded-md !border-[1.8px] !border-black/50 !focus:outline-2 !focus:outline-offset-2 !focus:outline-violet-500 !w-full"
                      // buttonClass="!border-black/50 !border-r-[1.8px]"
                      inputClass="form-control"
                      containerClass="react-tel-input"
                      buttonClass="flag-dropdown"
                    />
                  )}
                />

                {errors.phone && (
                  <p className="text-red-500 text-xs">{errors.phone.message}</p>
                )}
                {displayValue && (
                  <p className="text-xs font-medium mt-2">
                    Selected Phone Number: {displayValue}
                  </p>
                )}
              </div>
              <div className="flex flex-col px-5">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  {...register("email")}
                  className="input-field"
                />
                {errors.email && (
                  <p className="text-red-500 text-xs">{errors.email.message}</p>
                )}
              </div>
              <div className="flex flex-col px-5">
                <label className="form-label">Country</label>
                <input
                  {...register("country")}
                  value={selectedCountry}
                  className="input-field"
                />
                {errors.country && (
                  <p className="text-red-500 text-xs">
                    {errors.country.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col px-5">
                <label className="form-label">City</label>
                <input {...register("city")} className="input-field" />
                {errors.city && (
                  <p className="text-red-500 text-xs">{errors.city.message}</p>
                )}
              </div>
              <div className="flex flex-col px-5">
                <label className="form-label">Gender</label>
                <select {...register("gender")} className="input-field">
                  <option value="">Select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
                {errors.gender && (
                  <p className="text-red-500 text-xs">
                    {errors.gender.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col px-5">
                <label className="form-label">Which Course?</label>
                <select {...register("course")} className="input-field">
                  <option value="IELTS Preparation">IELTS Preparation</option>
                  <option value="Spoken English">Spoken English</option>
                </select>
                {errors.course && (
                  <p className="text-red-500 text-xs">
                    {errors.course.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col px-5">
                <label className="form-label">Purpose of Taking Course</label>
                <select {...register("purpose")} className="input-field">
                  <option value="IELTS Exam Preparation">
                    IELTS Exam Preparation
                  </option>
                  <option value="Improving English Speaking">
                    Improving English Speaking
                  </option>
                  <option value="Improving English Writing & Reading">
                    Improving English Writing & Reading
                  </option>
                </select>
                {errors.purpose && (
                  <p className="text-red-500 text-xs">
                    {errors.purpose.message}
                  </p>
                )}
              </div>
            </div>
            <div className="px-5 flex flex-col gap-2 mt-5">
              <label className="form-label">
                <input type="checkbox" {...register("terms")} /> I confirm that
                the information provided is accurate and complete. I agree to
                the{" "}
                <Link
                  href="/terms-and-conditions"
                  className=" underline underline-offset-4 font-semibold"
                >
                  Terms & Conditions and Privacy Policy
                </Link>{" "}
                of Veritas Edutech Limited.
              </label>

              {errors.terms && (
                <p className="text-red-500 text-xs">{errors.terms.message}</p>
              )}
              <button
                type="submit"
                className="bg-blue-600 text-white text-sm px-6 py-2 rounded-md flex items-center justify-center"
                disabled={isSubmitting} // Disable while submitting
              >
                {isSubmitting ? (
                  <>
                    <Loader
                      size={20}
                      color="#ffffff"
                      strokeWidth={1.75}
                      className="mr-1.5 animate-ping"
                    />
                    Submitting...
                  </>
                ) : (
                  "Submit"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Form;
