const InfoButton = ({title, onClick}) => {
    return (
        <button className='btn btn btn-outline-info m-2' onClick={onClick}>
            {title}
        </button>
    )
}
export default InfoButton;