import { Link } from "@remix-run/react"
import { Library, Menu, Package2 } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet"
import { Button } from "../ui/button"

export const Header = () => {
    return (<>
        <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
            <nav className="font-medium flex items-center gap-5 text-sm lg:gap-6 ">
                <Link
                    to="#"
                    className="flex items-center gap-2 text-lg font-semibold md:text-base"
                >
                    <Library className="h-6 w-6" />
                    <span>Fetch Report</span>
                </Link>
                {/* <Link
                    to="#"
                    className="text-foreground transition-colors hover:text-foreground"
                >
                    Dashboard
                </Link> */}
                <Link
                    to="https://x.com/moons_dev"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground transition-colors hover:text-foreground"
                >
                    Twitter
                </Link>
                <Link
                    to="https://github.com/moons-14/fetch.report"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground transition-colors hover:text-foreground"
                >
                    GitHub
                </Link>
            </nav>
        </header>
    </>)
}