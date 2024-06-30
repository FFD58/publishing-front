const BigInfoButton = ({title, onClick, style}) => {

    const className = 'btn btn-lg btn-outline-info mt-4 mb-4 ' + style

    return (
        <button className={className} onClick={onClick}>
            {title}
        </button>
    )
}
export default BigInfoButton;