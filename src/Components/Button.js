
import PropTypes from 'prop-types'

const Button = (props) => {
    return (
        <button
            style={{ backgroundColor: props.color }}
            className='btn'
            onClick={props.onClick}>
            {props.text}
        </button>
    )
}

Button.defaultProps = {
    color: 'green',
}

Button.propTypes = {
    text: PropTypes.string.isRequired,
    color: PropTypes.string,
    onClick: PropTypes.func,
}

export default Button
