const SmallDangerButton = ({title, onClick}) => {
    return (
        <button className='btn btn-sm btn-outline-danger m-2' onClick={onClick}>
            {title}
        </button>
    );
};

export default SmallDangerButton;