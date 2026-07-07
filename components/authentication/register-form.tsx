import Link from "next/link";

export const RegisterForm = () => {
  return (
    <div className="flex items-center justify-center flex-col gap-6">
      <h1 className="text-2xl font-semibold">Register</h1>
      <form className="w-full space-y-4">
        <input
          type="text"
          className="auth-input"
          placeholder="Enter your full name"
        />
        <input
          type="email"
          className="auth-input"
          placeholder="Enter your email"
        />
        <input
          type="password"
          className="auth-input"
          placeholder="Enter your password"
        />
        <button type="submit" className="auth-btn">
          Register
        </button>
      </form>
      <p className="text-sm text-muted">
        Already have an account?{" "}
        <Link href="/login" className="text-primary hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  );
};
