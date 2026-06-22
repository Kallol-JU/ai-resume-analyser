import { resumes } from "../../constants";
import type { Route } from "./+types/home";
import Navbar from "~/components/Navbar";
import ResumeCard from "../components/ResumeCard";
import { usePuterStore } from "~/lib/puter";
import { useNavigate } from "react-router";
import { useEffect } from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Resumind" },
    {
      name: "description",
      content: "Smart Feedback For Your Dream Role",
    },
  ];
}

export default function Home() {
  const auth = usePuterStore((state) => state.auth);
  const puterReady = usePuterStore((state) => state.puterReady);
  const navigate = useNavigate();

  useEffect(() => {
    if (puterReady && !auth.isAuthenticated) {
      navigate("/auth?next=/");
    }
  }, [auth.isAuthenticated, navigate]);

  return (
    <main className="bg-[url('/images/bg-main.svg')] bg-cover">
      <Navbar />

      <section className="main-section">
        <div className="page-heading py-16">
          <h1>Track Your Applications & Resume Ratings</h1>
          <h2>Review Your Submissions And Get AI-Powered Feedback</h2>
        </div>

        {resumes.length > 0 && (
          <div className="resumes-section">
            {resumes.map((resume) => (
              <ResumeCard key={resume.id} resume={resume} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
