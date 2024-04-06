const DetailsEdit = ({ icon, bold, sub, button, surcharge, clicker }) => {



    return (
        <div className="detailsExterior">
            <div className="detailsInterior restaurantHeader">
                {icon}
                <div>
                    <p className="bold">{bold}</p>
                    {sub && <p style={{fontWeight:"400"}}>{sub}</p>}
                    {!sub && <div style={{height: '14px'}}></div>}
                </div>
            </div>
            {
            button && <div className="seeSimilar" onClick={() => clicker()}>
                <p>{button.text}</p>
            </div>
            }
            {surcharge && <p>{`+ $${surcharge.toFixed(2)}`}</p>}
        </div>
    )
}

export default DetailsEdit
