import Link from "next/link";

export const LoginForm = () => {
  return (
    <div className="flex items-center justify-center flex-col gap-6">
      <h1 className="text-2xl font-semibold">Login</h1>
      <form className="w-full space-y-4">
        <input
          type="text"
          className="auth-input"
          placeholder="Enter your email"
        />
        <input
          type="password"
          className="auth-input"
          placeholder="Enter your password"
        />
        <button type="submit" className="auth-btn">
          Login
        </button>
      </form>
      <p className="text-sm text-muted">
        Do not have an account?{" "}
        <Link href="/register" className="text-primary hover:underline">
          Sign up
        </Link>
      </p>
    </div>
  );
};
