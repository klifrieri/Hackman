type FieldProps ={
    type:string
}

const Field : React.FC<FieldProps> = ({type}) =>{
    let classlist:string = `block ${type}`
    return(
    <div className={classlist} ></div>
    )
}

export default Field