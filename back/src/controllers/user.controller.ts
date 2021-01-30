import { Request, Response } from "express";
import User, { Iuser } from "../models/user";
import * as jwt from "jsonwebtoken";
import * as keys from '../keys'

function createToken(user: Iuser){
    return jwt.sign({ id: user.id, email: user.email }, keys.mongodb.jwtSecret,{
        expiresIn: 86400
    })
}

export const singUp = async (req:Request, res:Response):Promise<Response> => {
    const {name, role, email, password} = req.body
    if (!name || !role || !email || !password){
        return res.status(400).json({message: 'Debe completar todos los datos'})        
    }
    const user = await User.findOne({email: email})
    if(user){
        return res.status(400).json({message: 'El usuario ya existe'})
    }
    const newUser:Iuser = new User(req.body)
    await newUser.save()  
    return res.status(200).json(newUser)
}

export const singIn = async (req: Request, res: Response) => {
    const { email, password } = req.body
    if (!email || !password) {
        return res.status(400).json({ message: 'Debe completar todos los datos' })
    }

    const user = await User.findOne({ email: email })
    if(!user){
        return res.status(400).json({ message: 'El usuario no existe' })
    }

    const isEqualPassword = await user.comparePassword(password)
    if(isEqualPassword){
        return res.status(200).json({ 
            name: user.name || '',
            email: user.email,
            role: user.role || '',
            token: createToken(user) 
        })
    }
    return res.status(400).json({ message: 'El correo o la contraseña son incorrectas' })

}
