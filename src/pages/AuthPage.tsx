import AuthForm from "../components/AuthForm";

const AuthPage = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-zinc-950 bg-opacity-90 p-4 text-white">
      <div className="absolute inset-0 z-0">
        <img
          src="/images/popcorn.webp"
          className="h-full w-full object-cover opacity-30"
          alt=""
        />
      </div>
      <AuthForm />
    </div>
  );
};

export default AuthPage;
