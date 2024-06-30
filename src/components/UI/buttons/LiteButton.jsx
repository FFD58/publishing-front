const LiteButton = ({title, onClick}) => {
    return (
        <button className='btn btn btn-outline-light mb-3' onClick={onClick}>
            {title}
        </button>
    );
};

export default LiteButton;