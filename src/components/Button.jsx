import PropTypes from "prop-types";


const ButtonPrimary = ({ href, target = "_self", label, icon, classes, download }) => {
    if (href) {
        return (
            <a
                href={href}
                target={target}
                download={download}
                className={`btn btn-primary ${classes ? classes : ""}`}
            >
                {label}
                {icon && (
                    <span className="material-symbols-rounded" aria-hidden="true">
                        {icon}
                    </span>
                )}
            </a>
        );
    } else {
        return (
            <button className={`btn btn-primary ${classes ? classes : ""}`}>
                {icon && (
                    <span className="material-symbols-rounded" aria-hidden="true">
                        {icon}
                    </span>
                )}
                {label}
            </button>
        );
    }
};

ButtonPrimary.propTypes = {
    href: PropTypes.string,
    target: PropTypes.string,
    label: PropTypes.string.isRequired,
    icon: PropTypes.string,
    classes: PropTypes.string,
    download: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
};



const ButtonOutline = ({ href, target = "_self", label, icon, classes }) => {
    if (href) {
        return (
            <a
                href={href}
                target={target}
                className={`btn btn-outline ${classes ? classes : ""}`}
            >
                {label}
                {icon && <span className="material-symbols-rounded" aria-hidden='true'>{icon}</span>}

            </a>
        );
    } else {
        return (
            <button className={`btn btn-outline ${classes ? classes : ""}`}>
                {icon && <span className="material-symbols-rounded" aria-hidden='true'>{icon}</span>}
                {label}
            </button>
        );
    }
}

ButtonOutline.propTypes = {
    href: PropTypes.string,
    target: PropTypes.string,
    label: PropTypes.string.isRequired,
    icon: PropTypes.string,
    classes: PropTypes.string,
};

export { ButtonPrimary, ButtonOutline };

