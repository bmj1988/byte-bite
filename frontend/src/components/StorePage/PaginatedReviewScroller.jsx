import ReviewBox from "./ReviewBox"


const PaginatedReviewScroller = ({ reviews }) => {
    const maxItems = reviews?.length > 2 ? 3 : reviews?.length
    const paginatedReviews = reviews?.slice(0, maxItems)

    if (!reviews) { return (<div></div>) }

    return (
        <div className="paginatedReviewBar">
            {paginatedReviews.map((review) => {
                return (
                    <ReviewBox review={review} key={review.id} />
                )
            })}
        </div>
    )
}

export default PaginatedReviewScroller
