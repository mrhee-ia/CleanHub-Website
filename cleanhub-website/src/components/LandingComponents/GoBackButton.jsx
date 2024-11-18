import { Link } from 'react-router-dom'
import { FaArrowLeft } from 'react-icons/fa'
import { useState } from 'react';

const goBackStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    margin: '1rem 2.5rem',
    maxWidth: 'fit-content',
    transition: 'background-color 0.2s, box-shadow 0.2s',
    borderRadius: '6px',
    padding: '0.5rem 1rem',
};
  
const goBackHoverStyles = {
    backgroundColor: 'white',
    boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.4)',
    fontWeight: 600,
};

const GoBackButton = () => {

    const [isHovered, setIsHovered] = useState(false);

    return (
        <Link to='/'
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{ ...goBackStyles, ...(isHovered ? goBackHoverStyles : {}) }}
        >
            <p><FaArrowLeft/></p>
            <p>Go Back</p>
    </Link>
    )
}

export default GoBackButton