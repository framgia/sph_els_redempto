import React from 'react'
import { useEffect, useState } from 'react';
import getData from '../../api/mockApi';
import Divider from '../../components/Divider';
import CategoryItem from './widgets/CategoryItem';

const Categories = () => {
    const [categoryList, setCategoryList] = useState([]);

    useEffect(() => {
        getData()
            .then((json) => {
                setCategoryList(json.categories)
            })
    }, [])

    return (
        <div className="text-black flex-1 w-10/12 m-auto p-10">
            <span className="text-2xl font-bold">Categories</span>
            <Divider />
            <div className="h-most overflow-scroll no-scrollbar">
                <div className="flex flex-wrap">
                    {categoryList.map(category => (<CategoryItem id={category.id} slug={category.slug} title={category.title} body={category.body} />))}
                </div>
            </div>
        </div>
    )
}

export default Categories;
