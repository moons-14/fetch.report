import arxivClient, { or, and, category } from "arxiv-client";
import { allCategories } from "./categories";

const main = async () => {
    const articles = await arxivClient
        .query(or(...allCategories.slice(10, 20)))
        .sortBy("lastUpdatedDate")
        .sortOrder("descending")
        .start(0)
        .maxResults(500)
        .execute();

    for (const article of articles) {
        console.log(article.updated, article.primaryCategory);
    }

    console.log(articles.length);
    console.log("allCategories", allCategories.length);
    // console.dir(articles, { depth: null });
}

main();