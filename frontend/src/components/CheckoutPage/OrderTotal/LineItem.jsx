import '../checkout.css'

const LineItem = ({ text, amount }) => {
    return (
        <div className="detailsExterior">
            <p>{text}</p>
            <p>${amount.toFixed(2)}</p>
        </div>
    )
}

export default LineItem
