import React, { useContext } from 'react'
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Divider from '../../components/Divider';
import CategoryItem from './widgets/CategoryItem';
import { AppContext } from '../../context/AppContext';
import CategoryService from '../../api/categoryService';

const Categories = () => {
    const [categoryList, setCategoryList] = useState([]);

    const context = useContext(AppContext)
    const currentUser = JSON.parse(context.user)

    useEffect(() => {
        const controller = new AbortController();
        CategoryService.getCategories({
            signal: controller.signal
        })
            .then((response) => {
                setCategoryList(response.data.categories)
            })
            .catch((err) => {
            })

        return () => {
            controller.abort()
        }
    }, [])

    return (
        <div className="text-black flex-1 w-10/12 m-auto p-10">
            <div className="w-full flex flex-row justify-between items-center">
                <span className="text-2xl font-bold">Categories</span>
                {
                    (currentUser != null && currentUser.is_admin) ?

                        <Link to="edit" className="btn btn-ghost text-info">Edit</Link> :
                        <></>
                }
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
