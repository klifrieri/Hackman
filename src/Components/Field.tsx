import {FieldType} from '../Types/FieldType'

type FieldProps ={
    type:FieldType
}

const Field : React.FC<FieldProps> = ({type}) =>{
    let classToAdd:string = type === FieldType.wand? "wand":
    type === FieldType.coin ? "coin" : "noco"
    let classlist:string = `block ${classToAdd}`
    return(
    <div className={classlist} ></div>
    )
}

export default Field