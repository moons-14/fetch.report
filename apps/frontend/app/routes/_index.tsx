import type { MetaFunction } from "@remix-run/cloudflare";
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { ArrowRight, BookOpen, Search, ThumbsUp } from "lucide-react"
import { Link } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "fetch.report" },
    { name: "description", content: "Recommendation tool for papers published on arxiv.org" },
  ];
};

export default function LandingPage() {
  return (
    <>
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                Find papers according to your interests.
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                We will deliver a paper that meets your interests.
              </p>
            </div>
            <div className="w-full max-w-sm space-y-2">
              <Button>
                Comming Soon ...
              </Button>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            <div className="flex flex-col items-center space-y-4 text-center">
              <Search className="h-10 w-10 text-primary" />
              <h2 className="text-xl font-bold">Smart Search</h2>
              <p className="text-gray-500 dark:text-gray-400">
                Find the most relevant papers based on your interests and reading history.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-4 text-center">
              <ThumbsUp className="h-10 w-10 text-primary" />
              <h2 className="text-xl font-bold">Personalized Recommendations</h2>
              <p className="text-gray-500 dark:text-gray-400">
                Get daily recommendations tailored to your specific research areas and preferences.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-4 text-center">
              <BookOpen className="h-10 w-10 text-primary" />
              <h2 className="text-xl font-bold">Stay Updated</h2>
              <p className="text-gray-500 dark:text-gray-400">
                Never miss important papers in your field with our real-time updates and notifications.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}