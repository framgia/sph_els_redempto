import React from 'react'
import { useEffect, useState } from 'react';
import BASEAPI from '../../api/baseApi';
import { Link } from 'react-router-dom';
import Divider from '../../components/Divider';
import CategoryItem from './widgets/CategoryItem';
import { AppContext } from '../../context/AppContext';

const Categories = () => {
    const context = React.useContext(AppContext);
    const [currentUser, setCurrentUser] = context.user;
    const [categoryList, setCategoryList] = useState([]);

    useEffect(() => {
        BASEAPI.get("categories")
            .then((response) => {
                setCategoryList(response.data.categories)
            })
    }, [])

    return (
        <div className="text-black flex-1 w-10/12 m-auto p-10">
            <div className="w-full flex flex-row justify-between items-center">
                <span className="text-2xl font-bold">Categories</span>
                {
                    (currentUser != null && currentUser.user.is_admin) ?

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
