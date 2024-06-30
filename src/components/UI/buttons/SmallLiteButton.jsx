const SmallLiteButton = ({title, onClick}) => {
    return (
        <button className='btn btn-sm btn-outline-light m-2' onClick={onClick}>
            {title}
        </button>
    );
};

export default SmallLiteButton;