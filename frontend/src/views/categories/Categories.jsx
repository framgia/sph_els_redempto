import React from 'react'
import Divider from '../../components/Divider';
import CategoryItem from './widgets/CategoryItem';

const Categories = () => {
    const categoryList = [
        {
            id: "1",
            slug: "basic-500",
            title: "Basic 500",
            body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec commodo hendrerit condimentum. Suspendisse urna velit, porta in sodales et, egestas in lectus. Donec dignissim ornare quam, non sagittis dolor fringilla at. Fusce sollicitudin mauris ante, sit amet luctus nisl viverra et. Sed a urna dolor. Nullam semper sed tortor et vehicula. Cras a malesuada tellus, a lacinia mauris. Nam finibus nisl sit amet hendrerit sollicitudin. Aenean vel odio in purus mattis volutpat eu non lorem. In in ornare tortor, eu lobortis sapien. Aliquam eu ex sapien. Nulla pharetra posuere velit, ac egestas turpis aliquam a. Nunc a mattis urna. Praesent mi magna, consequat ut ultricies eget, lobortis ut lorem. Vestibulum congue eu nisi at porta.",
        },
        {
            id: "2",
            slug: "restaurant",
            title: "In a restaurant",
            body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vehicula pellentesque porta. Sed dapibus sem dolor, ac porttitor justo convallis non. In et urna volutpat, eleifend turpis quis, luctus ex. Nam eu mi neque. Praesent hendrerit tempus ex, lacinia dapibus augue mollis eu. Proin tincidunt metus tellus, at tincidunt libero condimentum sit amet. Nullam placerat nunc et tempor vestibulum. Integer sagittis elit ac elit molestie, a tristique libero tristique. Morbi congue sagittis ligula vitae condimentum. Curabitur ac posuere lectus. In vitae aliquet lectus, sed efficitur arcu. Suspendisse vehicula venenatis dolor, non posuere nulla condimentum id. Nunc auctor purus nec risus posuere, ac eleifend massa auctor.",
        },
        {
            id: "3",
            slug: "trip",
            title: "On a trip",
            body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent ut condimentum justo. Mauris tristique eros non dui consequat, quis bibendum sem ultrices. In accumsan lorem in felis placerat, vitae ultrices lorem luctus. Sed nulla ipsum, dapibus sit amet turpis id, volutpat finibus nibh. Cras eget hendrerit elit, vitae convallis enim. Mauris dapibus in sapien sit amet ornare. Nunc interdum tempor erat. Nullam malesuada odio ut quam dictum, vel malesuada eros lobortis. Integer dapibus sem risus, eu malesuada ipsum condimentum quis. Nam blandit, nunc ut volutpat interdum, risus enim varius est, eget tincidunt nisi tellus nec tellus. Morbi sed dui nec dui sagittis dapibus. Pellentesque malesuada nunc sed porttitor dignissim. Curabitur consequat, neque vel porttitor facilisis, nunc purus efficitur leo, faucibus egestas nisi diam non quam. Integer mi magna, ullamcorper quis libero vitae, vulputate fermentum tortor. Phasellus venenatis convallis nisi, a scelerisque orci auctor vel.",
        },
    ]

    return (
        <div className="text-black flex-1 w-10/12 m-auto p-10">
            <span className="text-2xl font-bold">Categories</span>
            <Divider />
            <div className="h-most overflow-scroll no-scrollbar">
                <div className="flex flex-wrap">
                    {categoryList.map(category => (<CategoryItem id={category.id} slug={category.slug} title={category.title} body={category.body}/>))}
                </div>
            </div>
        </div>
    )
}

export default Categories;
