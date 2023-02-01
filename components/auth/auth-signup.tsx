import { useState } from "react";
// import { useAuth } from '@lib/context/auth-context';

import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useSetRecoilState } from "recoil";
import { Button } from "@components/ui/core/button";
import { Input } from "@components/ui/core/input";
import { AuthModalState } from "@lib/state/auth-state";

const initialInputsValues = {
  fullName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Inputs = [
  {
    name: "fullName",
    label: "Your full name",
    type: "text",
  },
  {
    name: "email",
    label: "Email",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    type: "password",
  },
  {
    name: "confirmPassword",
    label: "Confirm Password",
    type: "password",
  },
];

export default function AuthSignUp(): JSX.Element {
  const supabase = useSupabaseClient();
  const [signUpForm, setSignUpForm] = useState(initialInputsValues);
  const { fullName, email, password, confirmPassword } = signUpForm;
  const [error, setError] = useState("");
  const setAuthState = useSetRecoilState(AuthModalState);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSignUpForm((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const format = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/;

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (error) setError("");

    if (format.test(email)) return setError("Invalid email");
    if (password !== confirmPassword) return setError("Password do not match");
    if (password.length < 6)
      return setError("Password must be at least 6 characters long");

    if (email && password.length >= 6) {
      try {
        const { data, error } = await supabase.auth.signUp({
          email: email,
          password: password,
          options: {
            data: {
              full_name: fullName,
            },
          },
        });
      } catch (error) {
        setError("ERROR while signing up!");
      } finally {
        setAuthState({ open: true, view: "login" });
      }
    }
  };
  return (
    <div>
      <form onSubmit={onSubmit} className="flex flex-col gap-3">
        {Inputs.map((input) => (
          <Input
            key={input.name}
            {...input}
            handleChange={handleChange}
            labelClassName="text-[14px] font-bold"
            className="border-main-gray h-10 font-semibold"
          />
        ))}
        <Button
          type="submit"
          className="w-full rounded-none py-3 transition-all duration-300 hover:opacity-90"
        >
          Sign Up
        </Button>
      </form>

      {error && <p className="text-c-red">{error}</p>}
    </div>
  );
}
