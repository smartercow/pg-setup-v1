import { useState } from "react";
import { useSetRecoilState } from "recoil";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { AuthModalState } from "@lib/state/auth-state";
import { Input } from "@components/ui/core/input";
import { Button } from "@components/ui/core/button";

const initialTextInputs = {
  email: "",
  password: "",
};

const Inputs = [
  {
    name: "email",
    label: "Email",
    type: "email",
    className: "h-12",
  },
  {
    name: "password",
    label: "Password",
    type: "password",
    className: "h-12",
  },
];

export default function AuthLogin(): JSX.Element {
  const supabase = useSupabaseClient();
  const [loginForm, setLoginForm] = useState(initialTextInputs);
  const { email, password } = loginForm;
  const [error, setError] = useState("");

  const setAuthModalState = useSetRecoilState(AuthModalState);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoginForm((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));

    if (error) setError("");
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (error) setError("");

    if (email && password) {
      try {
        const res = await supabase.auth.signInWithPassword({
          email: email,
          password: password,
        });
        if (res.error) throw res.error;
        /*         const urserId = res.data.user?.id;
        console.log('urserId', urserId); */

        setAuthModalState({ open: false, view: "login" });
      } catch (error) {
        setError("ERROR while logging in!");
      }
    } else {
      setError("Please fill all fields");
    }
  };
  return (
    <>
      <form onSubmit={onSubmit} className="text-main-black flex flex-col gap-5">
        {Inputs.map((input) => (
          <Input
            key={input.name}
            {...input}
            handleChange={handleChange}
            labelClassName="text-[14px] font-bold"
            className="border-main-gray h-10 font-semibold"
          />
        ))}

        <div className="flex w-full justify-between gap-1 font-semibold">
          <span className="flex items-center gap-1">
            <input
              type="checkbox"
              name="remember"
              value="Remember me"
              className="h-5 w-5"
            />
            <label htmlFor="remember">Remember me</label>
          </span>
          <span>
            <p
              onClick={() =>
                setAuthModalState({ open: true, view: "resetPassword" })
              }
              className="text-main-gray-sec hover:text-main-black cursor-pointer transition-all"
            >
              Forget password ?
            </p>
          </span>
        </div>

        <div>
          <Button
            type="submit"
            className="w-full rounded-none py-3 transition-all duration-300 hover:opacity-90"
          >
            Login
          </Button>
        </div>
      </form>
    </>
  );
}
