import Modal from "./modal";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { useSession } from "@supabase/auth-helpers-react";
import { AuthModalState } from "lib/state/auth-state";
import AuthLogin from "../auth/auth-login";
import AuthResetPassword from "../auth/auth-resetpassword";
import AuthSignUp from "../auth/auth-signup";
import { HeroIcon } from "@components/ui/icons/hero-icon";

export default function AuthModal() {
  const session = useSession();
  const [authModalState, setAuthModalState] = useRecoilState(AuthModalState);
  const [passReset, setPassReset] = useState(false);

  const handleClose = () => {
    setAuthModalState((prev) => ({
      ...prev,
      open: false,
      view: "overview",
    }));
  };

  useEffect(() => {
    if (authModalState.view === "resetPassword") {
      setPassReset(true);
    } else {
      setPassReset(false);
    }
  }, [authModalState]);

  useEffect(() => {
    if (session) {
      setAuthModalState({ open: false, view: "overview" });
    }
  }, [session]);

  return (
    <Modal
      open={authModalState.open}
      closeModal={handleClose}
      className="dosis max-w-xs md:max-w-md"
    >
      <div className="text-main-black bg-white px-6 py-3 md:px-10 md:py-8">
        <div className="flex justify-end">
          <button
            onClick={() => setAuthModalState({ open: false, view: "overview" })}
          >
            <HeroIcon iconName="XMarkIcon" />
          </button>
        </div>
        <div className="mb-2 py-1 text-center font-bold md:mb-6">
          <h2 className="text-xl uppercase md:text-3xl">
            {authModalState.view === "login" && "Login"}
            {authModalState.view === "signup" && "Sign up"}
            {authModalState.view === "resetPassword" && "Reset password"}
          </h2>
        </div>
        {authModalState.view === "login" && <AuthLogin />}
        {authModalState.view === "signup" && <AuthSignUp />}
        {authModalState.view === "resetPassword" && <AuthResetPassword />}

        {!passReset && (
          <div className="mt-2">
            <p
              onClick={() =>
                setAuthModalState({
                  open: true,
                  view: authModalState.view === "login" ? "signup" : "login",
                })
              }
              className="text-main-gray-sec hover:text-main-black cursor-pointer font-semibold transition-all"
            >
              {authModalState.view === "login" && `Don't have an account ?`}
              {authModalState.view === "signup" && "Already have an account ?"}
            </p>
          </div>
        )}
      </div>
    </Modal>
  );
}
