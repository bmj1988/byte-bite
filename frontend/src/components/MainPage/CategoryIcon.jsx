const CategoryIcon = ({ category }) => {

    const clicker = () => {
        alert('Feature coming soon!')
    }

    return (
        <div className="categoryIcon" onClick={() => clicker()}>
            <img className="categoryImage" src={category.image}/>
            <div className="categoryName">
                {category.name}
            </div>
        </div>
    )
}

export default CategoryIcon
