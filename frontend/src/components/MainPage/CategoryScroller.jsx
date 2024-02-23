import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { categoriesArray, thunkCategories } from "../../redux/categories"
import CategoryIcon from "./CategoryIcon"

const CategoryScroller = () => {
    const dispatch = useDispatch()
    const categories = useSelector(categoriesArray)
    useEffect(() => {
        dispatch(thunkCategories())
    }, [dispatch])

    return (
        <div className="categoryScroller">
            {categories.map((category) => {
                return (
                    <CategoryIcon category={category} key={category.id}/>
                )
            })}
        </div>
    )

}

export default CategoryScroller
