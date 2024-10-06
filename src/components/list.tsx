import { useState } from 'react';
import { Pagination } from './pagination';

interface DataProps {
    id: string,
    name: string;
    description: string;
}
interface ListProps {
    data: DataProps[];
    onClick: (id: string) => void;
}

export default function List({ data, onClick }: ListProps) {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5; // Define how many items you want per page
    const totalItems = data.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    // Calculate the index of the first item on the current page
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

    return (
        <div className='flex flex-col space-y-5 '>
            <div className='h-44'>
                <ul className="w-full text-sm font-medium text-gray-900 bg-white">
                    {currentItems.map((item, i) => (
                        <li onClick={() => onClick(item.id)} key={i} className="w-full px-4 py-2 border-b border-gray-200 rounded-t-lg hover:bg-gray-100 flex justify-between">
                            <span>{item.name}</span>
                            <span>{item.description}</span>
                        </li>
                    ))}
                </ul>
            </div>

            <div>


                <Pagination totalPages={totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />
            </div>
        </div>

    );
}
