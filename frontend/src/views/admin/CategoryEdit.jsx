import React from 'react'
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import BASEAPI from '../../api/baseApi';
import Divider from '../../components/Divider'
import { AppContext } from '../../context/AppContext';

const CategoryEdit = () => {
    const context = React.useContext(AppContext)
    const [currentUser, setCurrentUser] = context.user

    const [categoryList, setCategoryList] = useState([]);

    useEffect(() => {
        BASEAPI.get("categories")
            .then((response) => {
                setCategoryList(response.data.categories)
            })
    }, [])

    const [pageNo, setPageNo] = useState(0);
    const itemPerPage = 10;
    const pageButtons = [];
    for (let i = 0; i <= Math.floor((categoryList.length - 1) / itemPerPage); i++) {
        pageButtons.push(<button key={i} onClick={() => setPageNo(i)}>{i + 1}</button>)
    }

    const handleDelete = (event, category) => {
        BASEAPI.delete(
            `categories/${category.slug}`,
            {
                headers: {
                    'Authorization': `Bearer ${currentUser.token}`,
                }
            }
            )
        .then(response => {
            setCategoryList(prevList=>prevList.filter(prevCategory => prevCategory.id !== category.id))
        })
    }

    return (
        <div className="flex-1 w-full text-black item">
            <div className="h-full w-8/12 m-auto text-black p-4 justify-around">
                <div>
                    <div className = "flex justify-between items-center">
                        <span className="text-2xl font-bold">Categories</span>
                        <Link to="/categories/add" className="btn btn-ghost text-blue-600">Add category</Link>
                    </div>
                    <Divider />
                    <table className="table table-compact w-full mt-5">
                        <thead className="text-white">
                            <tr>
                                <th>ID</th>
                                <th>Category</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                categoryList.map((category, i) => {
                                    if (i >= (itemPerPage * pageNo) && i < itemPerPage + (itemPerPage * pageNo)) {
                                        return (
                                            <tr key={i} className={`${i % 2 ? "bg-gray-200" : ""}`}>
                                                <th>{category.id}</th>
                                                <td>{category.title}</td>
                                                <td className="flex justify-end">
                                                    <Link to={`${category.slug}`} className="btn btn-ghost text-blue-600">Edit</Link>
                                                    <button className="btn btn-ghost text-red-600" onClick={(event) => handleDelete(event, category)}>Del</button>
                                                </td>
                                            </tr>
                                        )
                                    }

                                    return null;
                                })
                            }
                        </tbody>
                    </table>
                </div>
                <div className="btn-group w-full mt-10">
                    {
                        pageButtons.length > 1 &&
                        pageButtons.map((button) => button)
                    }
                </div>
            </div>
        </div>
    )
}

export default CategoryEdit;
