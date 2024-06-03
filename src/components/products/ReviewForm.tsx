"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

const ReviewForm = ({ productId }: { productId: number }) => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [rating, setRating] = useState(0);
    const [message, setMessage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (isSubmitting) return;

        setIsSubmitting(true);

        try {
            const response = await axios.post("/api/addReview", {
                productId,
                title,
                content,
                rating
            });

            if (response.status === 200) {
                // Review added successfully
                console.log("Review added successfully");
                // Reset the form fields
                setTitle("");
                setContent("");
                setRating(0);
                setMessage("Review added successfully!");
            } else {
                // Handle error
                console.error("Error adding review:", response.data);
                setMessage("Error adding review.");
            }
        } catch (error) {
            console.error("Error adding review:", error);
            setMessage("Error adding review.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleStarClick = (index: number) => {
        console.log(`Star ${index + 1} clicked`);
        setRating(index + 1);
    };

    const renderStars = (currentRating: number) => {
        return Array.from({ length: 5 }, (_, index) => (
            <svg
                key={index}
                xmlns="http://www.w3.org/2000/svg"
                className={`h-6 w-6 cursor-pointer ${index < currentRating ? "text-yellow-500" : "text-gray-300"}`}
                viewBox="0 0 20 20"
                fill="currentColor"
                onClick={() => handleStarClick(index)}
            >
                <path
                    fillRule="evenodd"
                    d="M10 2l2.295 4.86 5.43.79c1.02.148 1.428 1.403.64 2.108l-3.932 3.8.93 5.418c.176 1.026-.89 1.853-1.852 1.308l-4.854-2.548-4.854 2.548c-.963.545-2.028-.282-1.852-1.308l.93-5.418-3.933-3.8c-.788-.762-.38-1.917.64-2.108l5.43-.79L10 2z"
                    clipRule="evenodd"
                />
            </svg>
        ));
    };

    return (
        <form onSubmit={handleSubmit} className="mt-6 bg-gray-100 p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-bold mb-4">Add a Review</h3>
            <div className="mb-4">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title:</label>
                <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="content" className="block text-sm font-medium text-gray-700">Content:</label>
                <textarea
                    id="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Rating:</label>
                <div className="flex items-center">
                    {renderStars(rating)}
                </div>
            </div>
            {message && <p className="text-green-500 mb-4">{message}</p>}
            <button
                type="submit"
                className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                disabled={isSubmitting}
            >
                {isSubmitting ? "Submitting..." : "Submit Review"}
            </button>
        </form>
    );
};

export default ReviewForm;
