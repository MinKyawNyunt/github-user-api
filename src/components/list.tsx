import { useState } from 'react';
import { Pagination } from './pagination';
import { Skeleton } from './ui/skeleton';
import NoData from './no-data';

interface DataProps {
    id: string | number,
    name: string;
    description: string;
}
interface ListProps {
    data: DataProps[];
    onClick?: (id: string | number) => void;
    loading: boolean;
}

export default function List({ data, onClick, loading }: ListProps) {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5; // Define how many items you want per page
    const totalItems = data.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    // Calculate the index of the first item on the current page
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

    const handleClick = (id: number | string) => {
        if (onClick) {
            onClick(id)
        }
    }

    const renderLi = (items: DataProps[]) => {
        {
            return items.map((item, i) => (
                <li onClick={() => handleClick(item.id)} key={i} className="w-full border rounded-sm p-4 mb-2 shadow hover:bg-gray-100 flex justify-between">
                    <span className='flex flex-1 items-center font-bold'>{item.name}</span>
                    <span className='flex-1 items-center text-right font-bold'>{item.description}</span>
                </li>
            ))
        }
    }

    const renderSkeleton = () => {
        {
            return (
                <>
                    <li className="w-full border rounded-sm p-4 mb-2 shadow hover:bg-gray-100 flex justify-between">
                        <Skeleton className="h-5 w-24" />
                        <Skeleton className="h-5 w-12" />
                    </li>

                    <li className="w-full border rounded-sm p-4 mb-2 shadow hover:bg-gray-100 flex justify-between">
                        <Skeleton className="h-5 w-20" />
                        <Skeleton className="h-5 w-12" />
                    </li>

                    <li className="w-full border rounded-sm p-4 mb-2 shadow hover:bg-gray-100 flex justify-between">
                        <Skeleton className="h-5 w-28" />
                        <Skeleton className="h-5 w-12" />
                    </li>

                    <li className="w-full border rounded-sm p-4 mb-2 shadow hover:bg-gray-100 flex justify-between">
                        <Skeleton className="h-5 w-24" />
                        <Skeleton className="h-5 w-12" />
                    </li>

                    <li className="w-full border rounded-sm p-4 mb-2 shadow hover:bg-gray-100 flex justify-between">
                        <Skeleton className="h-5 w-24" />
                        <Skeleton className="h-5 w-12" />
                    </li>
                </>
            )
        }
    }

    if (!loading && !data.length) {
        return <NoData />
    }

    return (
        <div className='flex flex-col space-y-5 justify-center items-center w-full'>
            <div className='min-h-44 w-full'>
                <ul className="w-full text-sm font-medium text-gray-900 bg-white">
                    {/* {loading ? '' : {  }} */}
                    {loading ? renderSkeleton() : renderLi(currentItems)}
                </ul>
            </div>

            <div>


                <Pagination totalPages={totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />
            </div>
        </div>

    );
}
