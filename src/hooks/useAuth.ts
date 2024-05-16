import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUser } from "../hooks";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { SignInFormSchemaType, SignUpFormSchemaType } from "../types";
import { signInFormSchema, signUpFormSchema } from "../schemas";

const useAuth = () => {
  const { signIn, signUp } = useUser();
  const navigate = useNavigate();
  const [isNewUser, setIsNewUser] = useState(false);
  const {
    register: registerSignUpForm,
    handleSubmit: handleSubmitSignUpForm,
    setError: setErrorSignUpForm,
    formState: {
      errors: errorsSignUpForm,
      isSubmitting: isSubmittingSignUpForm,
    },
  } = useForm<SignUpFormSchemaType>({
    resolver: zodResolver(signUpFormSchema),
  });

  const {
    register: registerSignInForm,
    handleSubmit: handleSubmitSignInForm,
    formState: {
      errors: errorsSignInForm,
      isSubmitting: isSubmittingSignInForm,
    },
  } = useForm<SignInFormSchemaType>({
    resolver: zodResolver(signInFormSchema),
  });

  const onSubmitSignUpForm: SubmitHandler<SignUpFormSchemaType> = async (
    data,
  ) => {
    if (data.confirmPassword !== data.password) {
      setErrorSignUpForm("confirmPassword", {
        message: "Passwords do not match",
      });
      return;
    }

    const user = await signUp({
      name: data.name,
      email: data.email,
      password: data.password,
      purchasedMovieIds: [],
    });
    if (!user) {
      setErrorSignUpForm("email", {
        message: "Email already used by another user",
      });
      return;
    }

    toast.success("Welcome to Khepex!");
    navigate("/");
  };
  const onSubmitSignInForm: SubmitHandler<SignInFormSchemaType> = async (
    data,
  ) => {
    const user = await signIn(data.email, data.password);
    if (!user)
      return toast.error(
        "User not found, please verify your email and password!",
      );

    toast.success("Welcome to Khepex!");
    navigate("/");
  };

  return {
    isNewUser,
    setIsNewUser,
    registerSignUpForm,
    handleSubmitSignUpForm,
    onSubmitSignUpForm,
    errorsSignUpForm,
    isSubmittingSignUpForm,
    registerSignInForm,
    handleSubmitSignInForm,
    onSubmitSignInForm,
    errorsSignInForm,
    isSubmittingSignInForm,
  };
};

export default useAuth;
