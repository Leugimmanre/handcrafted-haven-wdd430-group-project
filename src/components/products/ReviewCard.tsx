import React from 'react';
import { Review } from "@prisma/client";

interface ReviewCardProps {
    review: Review;
}

const ReviewCard = ({ review }: ReviewCardProps) => {
    // Function to generate star rating
    const renderStars = (rating: number) => {
        const filledStars = Array.from({ length: rating }, (_, index) => (
            <svg key={index} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500 fill-current" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 2l2.295 4.86 5.43.79c1.02.148 1.428 1.403.64 2.108l-3.932 3.8.93 5.418c.176 1.026-.89 1.853-1.852 1.308l-4.854-2.548-4.854 2.548c-.963.545-2.028-.282-1.852-1.308l.93-5.418-3.933-3.8c-.788-.762-.38-1.917.64-2.108l5.43-.79L10 2z" clipRule="evenodd" />
            </svg>
        ));

        const emptyStars = Array.from({ length: 5 - rating }, (_, index) => (
            <svg key={index} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-300 fill-current" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 2l2.295 4.86 5.43.79c1.02.148 1.428 1.403.64 2.108l-3.932 3.8.93 5.418c.176 1.026-.89 1.853-1.852 1.308l-4.854-2.548-4.854 2.548c-.963.545-2.028-.282-1.852-1.308l.93-5.418-3.933-3.8c-.788-.762-.38-1.917.64-2.108l5.43-.79L10 2z" clipRule="evenodd" />
            </svg>
        ));

        return [...filledStars, ...emptyStars];
    };

    return (
        <div className="bg-gray-100 rounded-lg p-4 mb-4">
            <h3 className="text-lg font-semibold">{review.title}</h3>
            <p className="mb-2">{review.content}</p>
            <div className="flex items-center mb-2">
                {renderStars(review.rating)}
            </div>
            <p className="text-gray-500">{new Date(review.createdAt).toLocaleDateString()}</p>
        </div>
    );
};

export default ReviewCard;
