import type { Archive, Category } from "../define";
import { generateSearchUrl } from "./url";
import * as cheerio from 'cheerio';

export type Article = {
    id: string;
    title: string;
    authors: string[];
    comments: string;
    subjects: string[];
}

export const searchByCategory = async <A extends Archive>(query: {
    archive: A;
    category?: Category<A>;
    year: number;
    month?: number;
    skip?: number;
    show?: number;
}) => {

    const url = generateSearchUrl(query);

    const html = await fetch(url)
        .then((res) => {
            if (!res.ok) {
                throw new Error(`Failed to fetch: ${res.status} ${res.statusText}`);
            }
            return res.text();
        });

    // htmlをパースしてid=articlesの要素を取得する (cheerioを使う)
    const articles: Article[] = [];
    const $ = cheerio.load(html);
    // id=articlesの要素を取得する
    const articlesElement = $("#articles");
    if (articlesElement.length === 0) {
        throw new Error("Failed to find articles element");
    }

    // <dl id='articles'>


    // <dt>
    //   <a name='item1'>[1]</a>
    //   <a href ="/abs/2101.00020" title="Abstract" id="2101.00020">
    //     arXiv:2101.00020
    //   </a>

    //     [<a href="/pdf/2101.00020" title="Download PDF" id="pdf-2101.00020" aria-labelledby="pdf-2101.00020">pdf</a>, <a href="/format/2101.00020" title="Other formats" id="oth-2101.00020" aria-labelledby="oth-2101.00020">other</a>]
    // </dt>
    // <dd>
    //   <div class='meta'>
    //     <div class='list-title mathjax'><span class='descriptor'>Title:</span>
    //       The $\epsilon&#39;/\epsilon$-Story: 1976-2021
    //     </div>
    //     <div class='list-authors'><a href="https://arxiv.org/search/hep-ph?searchtype=author&amp;query=Buras,+A+J">Andrzej J. Buras</a></div>

    //     <div class='list-comments mathjax'><span class='descriptor'>Comments:</span>
    //       31 pages, in V2 misprints in the text removed, footnote 9 improved. Matches published version
    //     </div>


    //     <div class='list-subjects'><span class='descriptor'>Subjects:</span>
    //       <span class="primary-subject">High Energy Physics - Phenomenology (hep-ph)</span>; High Energy Physics - Experiment (hep-ex); High Energy Physics - Lattice (hep-lat)
    //     </div>

    //   </div>
    // </dd>
    // <dt>
    //   <a name='item2'>[2]</a>
    //   <a href ="/abs/2101.00021" title="Abstract" id="2101.00021">
    //     arXiv:2101.00021
    //   </a>

    //     [<a href="/pdf/2101.00021" title="Download PDF" id="pdf-2101.00021" aria-labelledby="pdf-2101.00021">pdf</a>, <a href="/format/2101.00021" title="Other formats" id="oth-2101.00021" aria-labelledby="oth-2101.00021">other</a>]
    // </dt>
    // <dd>
    //   <div class='meta'>
    //     <div class='list-title mathjax'><span class='descriptor'>Title:</span>
    //       $\texttt{RGE++}:$ A $\texttt{C++}$ library to solve renormalisation group equations in quantum field theory
    //     </div>
    //     <div class='list-authors'><a href="https://arxiv.org/search/hep-ph?searchtype=author&amp;query=Deppisch,+T">Thomas Deppisch</a>, <a href="https://arxiv.org/search/hep-ph?searchtype=author&amp;query=Herren,+F">Florian Herren</a></div>

    //     <div class='list-comments mathjax'><span class='descriptor'>Comments:</span>
    //       21 pages, 1 figure
    //     </div>


    //     <div class='list-subjects'><span class='descriptor'>Subjects:</span>
    //       <span class="primary-subject">High Energy Physics - Phenomenology (hep-ph)</span>
    //     </div>

    //   </div>
    // </dd>
    // </dl>

    // articlesElementの子要素を取得する
    const children = articlesElement.children();
    // childrenの要素2つセットでArticleを作成する

    for (let i = 0; i < children.length; i += 2) {
        const dtElement = children.eq(i);
        const ddElement = children.eq(i + 1);

        const id = dtElement.find("a[title='Abstract']").attr("id");

        const titleElement = ddElement.find(".list-title").clone();
        titleElement.find("span").eq(0).remove();
        const title = titleElement.text().trim();

        const authors = ddElement.find(".list-authors").text().trim().split(", ");

        const commentElement = ddElement.find(".list-comments").clone();
        commentElement.find("span").eq(0).remove();
        const comments = commentElement.text().trim();

        const subjectElement = ddElement.find(".list-subjects").clone();
        subjectElement.find("span").eq(0).remove();
        const subjects = subjectElement.text().trim().split("; ").filter((s) => s.length > 0);

        if (!id || !title) {
            continue;
        }

        articles.push({
            id,
            title,
            authors,
            comments,
            subjects,
        });
    }

    return articles;
};