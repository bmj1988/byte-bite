const CategoryIcon = ({ category }) => {
    return (
        <div className="categoryIcon">
            <img className="categoryImage" src={category.image}/>
            <div className="categoryName">
                {category.name}
            </div>
        </div>
    )
}

export default CategoryIcon
