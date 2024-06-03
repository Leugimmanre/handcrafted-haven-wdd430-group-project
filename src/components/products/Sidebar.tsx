// Sidebar.tsx
import React from "react";

type SidebarProps = {
    searchTerm: string;
    onSearchTermChange: (term: string) => void;
    selectedCategory: string;
    onCategoryChange: (category: string) => void;
    selectedPrice: string;
    onPriceChange: (price: string) => void;
    uniqueCategories: string[];
};

const Sidebar: React.FC<SidebarProps> = ({
    searchTerm,
    onSearchTermChange,
    selectedCategory,
    onCategoryChange,
    selectedPrice,
    onPriceChange,
    uniqueCategories,
}) => {
    return (
        <div className="w-1/4 bg-gray-200 p-4">
            <div className="mb-4">
                <label htmlFor="search" className="mt-2 font-black text-2xl text-gray-700">
                    Search Product:
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                    <input
                        type="text"
                        name="search"
                        id="search"
                        className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pr-10 pl-4 pt-2 pb-2 sm:text-base border-gray-300 rounded-md"
                        placeholder="Enter product name..."
                        value={searchTerm}
                        onChange={(e) => onSearchTermChange(e.target.value)}
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <svg
                            className="h-5 w-5 text-gray-400"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                        >
                            <path
                                fillRule="evenodd"
                                d="M14.293 5.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0 1 1 0 010-1.414l3-3a1 1 0 010 1.414z"
                                clipRule="evenodd"
                            />
                            <path
                                fillRule="evenodd"
                                d="M8 15a7 7 0 100-14 7 7 0 000 14zM1 8a7 7 0 1114 0A7 7 0 011 8z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </div>
                </div>
            </div>
            <div className="mb-4">
                <label htmlFor="category" className="mt-2 font-black text-2xl text-gray-700">
                    Filter by Category:
                </label>
                <select
                    id="category"
                    name="category"
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                    value={selectedCategory}
                    onChange={(e) => onCategoryChange(e.target.value)}
                >
                    <option value="All">All</option>
                    {uniqueCategories.map((category) => (
                        <option key={category} value={category}>
                            {category}
                        </option>
                    ))}
                </select>
            </div>
            <div className="mb-4">
                <label htmlFor="price" className="mt-2 font-black text-2xl text-gray-700">
                    Filter by Price:
                </label>
                <select
                    id="price"
                    name="price"
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                    value={selectedPrice}
                    onChange={(e) => onPriceChange(e.target.value)}
                >
                    <option value="Any">Any</option>
                    <option value="Under $50">Under $50</option>
                    <option value="$50 - $100">$50 - $100</option>
                    <option value="Over $100">Over $100</option>
                </select>
            </div>
        </div>
    );
};

export default Sidebar;
