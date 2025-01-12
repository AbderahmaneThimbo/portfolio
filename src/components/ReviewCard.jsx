import PropTypes from "prop-types";

const ratings = Array.from({ length: 5 }, () => ({
    icon: 'star',
    style: { fontVariationSettings: '"FILL" 1' }
}));


const ReviewCard = ({ content, imgSrc, name, company }) => {
    return (
        <div className="">
            <div className="">
                {
                    ratings.map(({ icon, style }, key) => (
                        <span className="material-symbols-rounded"
                            key={key}
                            style={style}>
                            {icon}
                        </span>
                    ))
                }
            </div>

            <p className="">
                {content}
            </p>

            <div className="">
                <figure className="">
                    <img
                        src={imgSrc}
                        alt={name}
                        width={44}
                        height={44}
                        loading='lazy'
                        className="img-cover"
                    />
                </figure>

                <div>
                    <p>{name}</p>
                    <p className="">
                        {company}
                    </p>
                </div>
            </div>
        </div>
    )
}

ReviewCard.propTypes = {
    content: PropTypes.string.isRequired,
    imgSrc: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    company: PropTypes.string.isRequired
}

export default ReviewCard