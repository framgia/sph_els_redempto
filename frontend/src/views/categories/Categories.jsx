import React from 'react'
import Divider from '../../components/Divider';
import CategoryItem from './widgets/CategoryItem';

const Categories = () => {
    const categoryList = [
        "Basic 500",
        "In a restaurant",
        "On a trip",
    ]

    return (
        <div className="text-black flex-1 w-10/12 m-auto p-10">
            <span className="text-2xl font-bold">Categories</span>
            <Divider />
            <div className="h-most overflow-scroll no-scrollbar">
                <div className="flex flex-wrap">
                    {categoryList.map(category => (<CategoryItem title={category}/>))}
                </div>
            </div>
        </div>
    )
}

export default Categories;
