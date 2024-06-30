const SmallInfoButton = ({title, onClick}) => {
    return (
        <button className='btn btn-sm btn-outline-info m-2' onClick={onClick}>
            {title}
        </button>
    )
}
export default SmallInfoButton;