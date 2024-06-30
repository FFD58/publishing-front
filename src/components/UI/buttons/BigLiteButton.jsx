const BigLiteButton = ({title, onClick, style}) => {

    const className = 'btn btn-lg btn-dark mb-3 float-end ' + style

    return (
        <button className={className} onClick={onClick}>
            {title}
        </button>
    )
}
export default BigLiteButton;