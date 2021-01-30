import { model, Schema, Document } from 'mongoose'


export interface IElement {
    name: string,
    type: string,
    width: string
    element: string,
    class: string,
    redirect: string,
    href: string,
    alt: string,
    src: string,
    email: string,
    phone: string,
    text: string,
    color: string,
    fontSize: string,
    fontWeight: string,
    inputs: IInput[],  
    icons: IICon[],
    borderWidth: string,
    borderColor: string,
    backgroundColor: string,
    textColor: string,
    buttonBackgroundColor: string,
    buttonTextColor: string,
    buttonBorderColor: string,
    buttonBorderWidth: string,
    successMessage: string,
    labelColor:string,
    labelFontSize:string,
    label : string,
    minToday : boolean,
    inline : boolean,
}

export interface IInput {
    name: string,
    placeholder: string,
    class: string,
    disabled: boolean,
    index: number,
    borderColor: string,
    backgroundColor: string,
    textColor: string,
    labelClass: string,
    borderWidth: string,
    required: boolean,
}

export interface ILanding extends Document {
    id: number,
    name: string,
    backgroundURL: string,
    backgroundName: string,
    backgroundColor: string,
    logoURL: string,    
    logoName: string,
    opacity: number,
    validationRut: boolean,
    elements: IElement[]
}

export interface IICon {
    name: string,
    redirect: string,
    class: string,
    index: number,
    width: string,
    image: string,
}


const landingSchema = new Schema({

    name: {
        type: String,
        required: true,
    },
    backgroundName: {
        type: String,        
    },
    backgroundURL: {
        type: String
    },
    backgroundColor: {
        type: String
    },
    logoName: {
        type: String
    },
    logoURL: {
        type: String
    },
    opacity: {
        type: Number
    },
    validationRut: {
        type: Boolean
    },
    elements: {
       type: Array
    }
    
})


export default model<ILanding>('Landing', landingSchema)

