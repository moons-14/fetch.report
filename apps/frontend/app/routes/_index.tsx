import type { MetaFunction } from "@remix-run/cloudflare";

export const meta: MetaFunction = () => {
  return [
    { title: "fetch.report" },
    { name: "description", content: "Recommendation tool for papers published on arxiv.org" },
  ];
};

export default function Index() {
  return (
    <></>
  );
}

