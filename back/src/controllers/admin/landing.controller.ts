import { Request, Response } from "express";
import  Landing, { ILanding } from "../../models/admin/landing";

const title = 'Landing'

export const save = async (req: Request, res: Response): Promise<Response> => {
    const newLanding: ILanding = new Landing(req.body)
    await newLanding.save()
    return res.status(200).json({
        message: `${title} Cread@`,
        data: newLanding
    })
}

export const get = async (req: Request, res: Response) => {
    Landing.find({}, (err, landing)=>{
        if(err){
            res.status(501).json({
                message: `Error al obtener ${title}s`,
                data: null
            })
        }
        res.status(200).json({
            message: '',
            data: landing
        })
    })
}

export const getByID = (req: Request, res: Response) => {
    Landing.findById(req.params.id, (err, landing) => {
        if (err) {
            res.status(501).json({
                message: `Error al obtener ${title}`,
                data: null
            })
        }
        res.status(200).json({
            message: '',
            data: landing
        })
    })
}

export const update = (req: Request, res: Response) => {
    Landing.findOneAndUpdate({ _id:req.params.id}, req.body, {new:true} ,(err, landing) => {
        if (err) {
            res.status(501).json({
                message: `Error al actualizar ${title}`,
                data: null
            })
        }
        res.status(200).json({
            message: `${title} actualizad@`,
            data: landing
        })
    })
}

export const del = (req: Request, res: Response) => {
    Landing.remove({ _id: req.params.id }, (err) => {
        if (err) {
            res.status(501).json({
                message: `Error al eliminar ${title}`,
                data: null
            })
        }
        res.status(200).json({
            message: `${title} eliminad@`,
            data: null
        })
    })
}


