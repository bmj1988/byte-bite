import { useNavigate } from 'react-router-dom'

const CategoryIcon = ({ category }) => {
    const navigate = useNavigate();
    const clicker = () => {
        navigate(`/search?search=${category.id}`)
    }

    return (
        <div className="categoryIcon" onClick={() => clicker()}>
            <img className="categoryImage" src={category.image} />
            <div className="categoryName">
                {category.name}
            </div>
        </div>
    )
}

export default CategoryIcon
