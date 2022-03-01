import React from 'react'

const CategoryItem = ({title = "Category Name"}) => {
    return (
        <div className="w-1/2 h-30 box-border px-5 py-2">
            <div className="card bg-blue-100 h-full w-full px-4 py-2 mt-5">
                <span className="card-title"> {title} </span>
                <p className="mt-3">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vehicula pellentesque porta. Sed dapibus sem dolor, ac porttitor justo convallis non. In et urna volutpat, eleifend turpis quis, luctus ex. Nam eu mi neque. Praesent hendrerit tempus ex, lacinia dapibus augue mollis eu. Proin tincidunt metus tellus, at tincidunt libero condimentum sit amet. Nullam placerat nunc et tempor vestibulum. Integer sagittis elit ac elit molestie, a tristique libero tristique. Morbi congue sagittis ligula vitae condimentum. Curabitur ac posuere lectus. In vitae aliquet lectus, sed efficitur arcu. Suspendisse vehicula venenatis dolor, non posuere nulla condimentum id. Nunc auctor purus nec risus posuere, ac eleifend massa auctor.</p>
                <div class="justify-end card-actions">
                    <button class="btn">Start</button>
                </div>
            </div>
        </div>
    )
}

export default CategoryItem;
