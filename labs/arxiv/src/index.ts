import arxivClient, { or, and, category } from "arxiv-client";
import { allCategories } from "./categories";
import type { ArxivEntry } from "arxiv-client/dist/apiClient";

const main = async () => {
    const lastFetchDate = new Date("2024-10-03T00:00:00Z");
    const categories = allCategories.map((name) => ({ name, fetchedAt: lastFetchDate }));

    const articles: ArxivEntry[] = [];
    const maxPagesPerCategory = 5;
    const maxResultsPerPage = 500;
    const batchSize = 10;

    for (let i = 0; i < categories.length; i += batchSize) {
        const batch = categories.slice(i, i + batchSize).map(v => v.name);
        let page = 0;
        let fetchedArticles: ArxivEntry[] = [];
        do {
            fetchedArticles = await arxivClient
                .query(or(...batch))
                .sortBy("lastUpdatedDate")
                .sortOrder("descending")
                .start(page * maxResultsPerPage)
                .maxResults(maxResultsPerPage)
                .execute();

            const newArticles = fetchedArticles.filter(article => new Date(article.updated) > lastFetchDate);
            articles.push(...newArticles);

            page++;
        } while (fetchedArticles.length === maxResultsPerPage && page < maxPagesPerCategory);
    }

    for (const article of articles) {
        console.log(article.updated, article.primaryCategory);
    }

    console.log(articles.length);
    console.log("allCategories", allCategories.length);
    // console.dir(articles, { depth: null });
}

// main();


const getArticlesByCategory = async (categories: { name: string; fetchedAt: Date; }[]) => {
    const articles: ArxivEntry[] = [];
    const maxPagesPerCategory = 5;
    const maxResultsPerPage = 500;
    let fetchedArticles: ArxivEntry[] = [];
    let page = 0;

    do {
        if (page > 0) {
            await new Promise(resolve => setTimeout(resolve, 3000));
        }

        fetchedArticles = await arxivClient
            .query(or(...categories.map(v => v.name)))
            .sortBy("lastUpdatedDate")
            .sortOrder("descending")
            .start(page * maxResultsPerPage)
            .maxResults(maxResultsPerPage)
            .execute();

        console.log(fetchedArticles.length);

        const newArticles = fetchedArticles.filter(article => {
            const category = categories.find(v => v.name === article.primaryCategory);
            return category && new Date(article.updated) > category.fetchedAt;
        });

        for (const article of newArticles) {
            console.log(article.updated, article.primaryCategory);
        }

        articles.push(...newArticles);

        page++;
    } while (fetchedArticles.length === maxResultsPerPage && page < maxPagesPerCategory);

    return articles;
};

//getArticlesByCategoryでAllCategoriesの最初の10個を取得
const main2 = async () => {
    const lastFetchDate = new Date("2024-10-03T00:00:00Z");
    const categories = allCategories.slice(0, 10).map((name) => ({ name, fetchedAt: lastFetchDate }));
    const result = await getArticlesByCategory(categories);
}

main2();