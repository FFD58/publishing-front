const Input = ({type, value, onChange, placeholder, style}) => {

    const className = "text-center form-control " + style

    return (
        <input type={type}
               placeholder={placeholder}
               value={value}
               className={className}
               onChange={onChange}
        />
    );
};

export default Input;