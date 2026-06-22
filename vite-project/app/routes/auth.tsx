import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router";
import { usePuterStore } from "~/lib/puter";

export const meta = () => [
  { title: "Resumind | Auth" },
  { name: "description", content: "log into your account" },
];

const Auth = () => {
  const auth = usePuterStore((state) => state.auth);
  const isLoading = usePuterStore((state) => state.isLoading);
  const puterReady = usePuterStore((state) => state.puterReady);

  // Call these hooks unconditionally to avoid changing hook order between renders
  const location = useLocation();
  const navigate = useNavigate();

  // parse `next` param safely; only auto-redirect when it's explicitly provided
  const params = new URLSearchParams(location.search);
  const rawNext = params.get("next");
  const next = rawNext ? decodeURIComponent(rawNext) : null;

  // Track previous auth state so we only redirect on a login transition
  const prevAuthRef = useRef<boolean | null>(null);

  useEffect(() => {
    if (!puterReady) return;

    const prev = prevAuthRef.current;
    // If user just became authenticated, navigate to `next` or home
    if (prev === false && auth.isAuthenticated) {
      navigate(next ?? "/");
    }

    // Set previous state for next render
    prevAuthRef.current = auth.isAuthenticated;
  }, [auth.isAuthenticated, navigate, next, puterReady]);

  if (!puterReady) {
    return <div>Loading...</div>;
  }

  return (
    <main className="bg-[url('/images/bg-auth.svg')] bg-cover min-h-screen flex items-center justify-center">
      <div className="gradient-border shadow-lg">
        <section className="flex flex-col gap-8 bg-white rounded-2xl p-10 ">
          <div className="flex flex-col gap-2 items-center text-center">
            <h1>Welcome</h1>
            <h2>Log In To Your Account</h2>
          </div>
          <div>
            {isLoading ? (
              <button className="auth-button animate-pulse">
                <p>Signing you in...</p>
              </button>
            ) : (
              <>
                {auth.isAuthenticated ? (
                  <button className="auth-button " onClick={auth.signOut}>
                    <p>Log Out</p>
                  </button>
                ) : (
                  <button className="auth-button " onClick={auth.signIn}>
                    <p> Log In</p>
                  </button>
                )}
              </>
            )}
          </div>
        </section>
      </div>
    </main>
  );
};
export default Auth;
