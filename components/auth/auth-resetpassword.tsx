import { useSetRecoilState } from "recoil";

import { useState } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { AuthModalState } from "@/lib/states/auth-state";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export default function AuthResetPassword(): JSX.Element {
  const supabase = useSupabaseClient();
  const setAuthModalState = useSetRecoilState(AuthModalState);

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const format = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/;

  const handlePasswordReset = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);
    if (format.test(email)) return setError("Invalid email");
    const { error } = await supabase.auth.resetPasswordForEmail(email);
    if (error) setError(error.message);
    else setMessage("Check your email for the password reset link");
    setLoading(false);
  };
  return (
    <>
      <form onSubmit={handlePasswordReset} className="flex flex-col gap-2">
        <div>
          <p className="font-medium">
            Tell us the email address associated with your Reddit account, and
            we’ll send you an email with your username.
          </p>
        </div>
        <div></div>
        <div className="space-y-4">
          <Input
            handleChange={(e: any) => setEmail(e.target.value)}
            labelClassName="text-[14px] font-bold"
            className="h-10 border-main-gray font-semibold"
            name={"reset-password"}
            label={"Email"}
            type={"email"}
          />

          <Button
            type="submit"
            disabled={loading}
            className="w-full rounded-none py-3 transition-all duration-300 hover:opacity-90"
          >
            Email me
          </Button>
          <div className="mt-2">
            {message && (
              <p className="font-semibold text-secondary">{message}</p>
            )}
            {error && <p className="font-semibold text-primary">{error}</p>}
          </div>
        </div>
        <span className="py-2">
          <p
            onClick={() => setAuthModalState({ open: true, view: "login" })}
            className="cursor-pointer font-semibold text-main-black transition-all hover:text-main-gray-sec"
          >
            Sign In
          </p>
        </span>
      </form>
    </>
  );
}
