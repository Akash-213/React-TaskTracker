import PropTypes from 'prop-types'
import Button from './Button'
import { useLocation } from 'react-router-dom';


const Header = (props) => {
    //location is useful
    const location = useLocation()
    return (
        <header className='header'>
            <h1>{props.title}</h1>
            {location.pathname === '/' && <Button
                color={props.showAddBtn ? 'red' : 'green'}
                text={props.showAddBtn ? 'Close' : 'Add'}
                onClick={props.onAdd}
            />}
        </header>
    )
}

Header.defaultProps = {
    title: 'Task Tracker',
}

Header.propTypes = {
    title: PropTypes.string,
}

export default Header
