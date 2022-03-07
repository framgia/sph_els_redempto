import React from 'react';
import { Link } from 'react-router-dom';

const CategoryItem = ({ id = 0, slug = "placeholder-slug", title = "Category Name", description = "" }) => {
    return (
        <div className="w-1/2 h-30 box-border px-5 py-2">
            <div className="card bg-blue-100 h-full w-full px-4 py-2 mt-5">
                <span className="card-title"> {title} </span>
                <p className="mt-3"> {description}</p>
                <div className="justify-end card-actions">
                    <Link to= {`/lesson/${slug}`} className="btn">Start</Link>
                </div>
            </div>
        </div>
    )
}

export default CategoryItem;
