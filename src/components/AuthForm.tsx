import { FaGoogle } from "react-icons/fa";
import TextField from "../components/TextField";
import { toast } from "react-toastify";
import Button from "../components/Button";
import TextLogo from "../components/TextLogo";
import useAuth from "../hooks/useAuth";

const AuthForm = () => {
  const {
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
  } = useAuth();

  return (
    <form
      className="z-10 flex w-full max-w-md flex-col gap-8 overflow-hidden rounded-md border border-purple-300 border-opacity-20 bg-purple-300 bg-opacity-20 px-4 py-8 shadow-md"
      onSubmit={
        isNewUser
          ? handleSubmitSignUpForm(onSubmitSignUpForm)
          : handleSubmitSignInForm(onSubmitSignInForm)
      }
    >
      <h1 className="z-10 text-2xl font-bold">
        Welcome to <TextLogo />
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
  );
};

export default AuthForm;
