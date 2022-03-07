import React from 'react'
import { useEffect, useState } from 'react';
import { getData } from '../../api/api';
import axios from 'axios'
import { Link } from 'react-router-dom';
import Divider from '../../components/Divider';
import CategoryItem from './widgets/CategoryItem';

const Categories = () => {
    const [categoryList, setCategoryList] = useState([]);

    useEffect(() => {
        let categories = []

        const getCategories = async () => {
            setCategoryList(await getData("http://localhost:8000/", "categories"));
        }

        getCategories();
        setCategoryList(categories)
    }, [])

    return (
        <div className="text-black flex-1 w-10/12 m-auto p-10">
            <div className="w-full flex flex-row justify-between items-center">
                <span className="text-2xl font-bold">Categories</span>
                <Link to="edit" className="btn btn-ghost text-info">Edit</Link>
            </div>
            <Divider />
            <div className="h-most overflow-scroll no-scrollbar">
                <div className="flex flex-wrap">
                    {categoryList.map(category => (<CategoryItem key={category.id} id={category.id} slug={category.slug} title={category.title} description={category.description} />))}
                </div>
            </div>
        </div>
    )
}

export default Categories;
