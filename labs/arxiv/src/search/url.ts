import { categories, baseurl } from '../define';
import type { Archive, Category } from '../define';

export const generateSearchUrl = <A extends Archive>(query: {
    archive: A;
    category?: Category<A>;
    year: number;
    month?: number;
    skip?: number;
    show?: number;
}) => {
    if (!categories[query.archive]) throw new Error(`Invalid archive: ${query.archive}`);

    let categoryName: string = query.archive;
    if (query.category) {
        const archiveCategoryList = categories[query.archive] as readonly string[];
        if (!archiveCategoryList.includes(query.category as string)) {
            throw new Error(`Invalid category: ${query.category}`);
        }

        //@ts-ignore
        if (query.archive !== query.category) {
            categoryName = `${query.archive}.${query.category}`;
        }
    }

    const yearMonth = query.month
        ? `${query.year}-${query.month.toString().padStart(2, "0")}`
        : query.year.toString();

    // url classを使って{listBaseUrl}/{categoryName}/{yearMonth}を生成する
    const url = new URL(baseurl);
    url.pathname = `list/${categoryName}/${yearMonth}`;
    if (query.skip) url.searchParams.set("skip", query.skip.toString());
    if (query.show) url.searchParams.set("show", query.show.toString());

    return url.toString();
};