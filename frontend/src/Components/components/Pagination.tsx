import { Link } from "react-router-dom"
import { LinkType } from "../.."
import ArrowIcon from "../../assets/icons/ArrowIcon"

const Pagination = ({ links, page }: { links: LinkType, page: number }) => {
    if (links?.paginateLinks?.length < 1 && links?.currentPage !== 1) return null

    return (
        <div className="flex items-center justify-end rounded bg-white px-4 py-3 sm:px-6">
            <div className="flex flex-1 justify-between sm:hidden">
                {links?.prevPage ?
                    <Link to={`?page=${page - 1}`}
                        className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                        Previous
                    </Link>
                    :
                    null
                }
                {links?.nextPage ?
                    <Link to={`?page=${page + 1}`}
                        className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                        Next
                    </Link>
                    :
                    null
                }

            </div>
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-end">
                <nav className="isolate inline-flex gap-2 -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                    {links?.prevPage ?
                        <Link to={`?page=${page - 1}`}
                            className="relative inline-flex items-center rounded px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                        >
                            <span className="sr-only">Next</span>
                            <ArrowIcon className="h-5 w-5" />
                        </Link>
                        :
                        null
                    }
                    {links?.paginateLinks?.map((link, i) => (
                        <Link key={i}
                            to={`/?page=${link?.number}`}
                            aria-current="page"
                            className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${link?.number === +page ? 'z-10 bg-orange-400 text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-400' : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0'} rounded`}
                        >
                            {link?.number}
                        </Link>
                    ))}
                    {/* <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0">
                            ...
                        </span> */}
                    {links?.nextPage ?
                        <Link to={`?page=${page + 1}`}
                            className="relative inline-flex items-center rounded px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                        >
                            <span className="sr-only">Next</span>
                            <ArrowIcon className="h-5 w-5 rotate-180" aria-hidden="true" />
                        </Link>
                        :
                        null
                    }

                </nav>
            </div>
        </div >
    )
}
export default Pagination
