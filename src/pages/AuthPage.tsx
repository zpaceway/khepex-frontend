import { FaGoogle } from "react-icons/fa";
import { useState } from "react";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import TextField from "../components/TextField";
import { useUser } from "../hooks";
import { toast } from "react-toastify";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

const signUpFormSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(6),
  confirmPassword: z.string().min(6),
});

const signInFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

type SignUpFormSchemaType = z.infer<typeof signUpFormSchema>;
type SignInFormSchemaType = z.infer<typeof signInFormSchema>;

const AuthPage = () => {
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

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-zinc-950 bg-opacity-90 p-4 text-white">
      <div className="absolute inset-0 z-0">
        <img
          src="/images/popcorn.webp"
          className="h-full w-full object-cover opacity-30"
          alt=""
        />
      </div>
      <form
        className="z-10 flex w-full max-w-md flex-col gap-8 overflow-hidden rounded-md border border-purple-300 border-opacity-20 bg-purple-300 bg-opacity-20 px-4 py-8 shadow-md"
        onSubmit={
          isNewUser
            ? handleSubmitSignUpForm(onSubmitSignUpForm)
            : handleSubmitSignInForm(onSubmitSignInForm)
        }
      >
        <h1 className="z-10 text-2xl font-bold">
          Welcome to{" "}
          <span className="text-3xl font-black text-purple-400">
            <span>KHE</span>
            <span className="text-lg font-medium text-white">pex</span>
          </span>
        </h1>
        <div className="z-10 flex flex-col gap-2">
          {isNewUser && (
            <TextField
              placeholder="Name"
              {...registerSignUpForm("name")}
              errorMessage={errorsSignUpForm.name?.message}
            />
          )}
          <TextField
            placeholder="Email"
            type="email"
            {...(isNewUser
              ? registerSignUpForm("email")
              : registerSignInForm("email"))}
            errorMessage={
              isNewUser
                ? errorsSignUpForm.email?.message
                : errorsSignInForm.email?.message
            }
          />
          <TextField
            placeholder="Password"
            type="password"
            {...(isNewUser
              ? registerSignUpForm("password")
              : registerSignInForm("password"))}
            errorMessage={
              isNewUser
                ? errorsSignUpForm.password?.message
                : errorsSignInForm.password?.message
            }
          />
          {isNewUser && (
            <TextField
              placeholder="Confirm Password"
              type="password"
              {...registerSignUpForm("confirmPassword")}
              errorMessage={errorsSignUpForm.confirmPassword?.message}
            />
          )}
          <Button isLoading={isSubmittingSignUpForm || isSubmittingSignInForm}>
            {isNewUser ? "Sign up" : "Sign in"}
          </Button>
          <div className="flex justify-end">
            <button
              type="button"
              className="text-right text-xs underline"
              disabled={isSubmittingSignUpForm || isSubmittingSignInForm}
              onClick={() => setIsNewUser((state) => !state)}
            >
              {isNewUser
                ? "I already have an account"
                : "I don't have an account"}
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="z-10 flex items-center text-sm">
            <div className="h-0 w-full border-t"></div>
            <div className="whitespace-nowrap px-2">or continue with</div>
            <div className="h-0 w-full border-t"></div>
          </div>
          <Button
            type="button"
            onClick={() => {
              toast.warn("This feature is not yet implemented :(");
            }}
            disabled={isSubmittingSignUpForm || isSubmittingSignInForm}
          >
            <FaGoogle />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AuthPage;
