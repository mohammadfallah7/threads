export const SetupUsernameForm = () => {
  return (
    <div className="flex items-center justify-center flex-col gap-6">
      <h1 className="text-2xl font-semibold">Setup Username</h1>
      <form className="w-full space-y-4">
        <input
          type="email"
          className="auth-input"
          placeholder="Chose your username"
        />
        <button type="submit" className="auth-btn">
          Continue
        </button>
      </form>
    </div>
  );
};
