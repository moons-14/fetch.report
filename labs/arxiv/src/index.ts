import { searchByCategory } from "./search";

const main = async () => {
    console.log(await searchByCategory({
        archive: "hep-ph",
        category: "hep-ph",
        year: 2021,
        month: 8,
    }));
}

main();