import {Request, Response} from "express";
import {getCustomRepository} from "typeorm";
import {SurveysRepository} from "../repositories/SurveysRepository";
import * as yup from "yup";
import {AppError} from "../errors/AppError";

class SurveysController {
    async create(request: Request, response: Response){
        const {title, description} = request.body;

        const validations = yup.object().shape({
            title: yup.string()
                .required("O campo title é obrigatório")
                .min(6, "O campo title tem que ter no mínimo 6 caracteres"),
            description: yup.string()
                .required("O campo description é obrigatório")
                .min(15, "O campo description tem que ter no mínimo 15 caracteres")
                .max(200, "O campo description só pode ter até 200 caracteres")
        })


        await validations.validate(request.body).catch(error => {throw new AppError(error.message)});


        const surveysRepository = getCustomRepository(SurveysRepository);

        const survey = surveysRepository.create({
            title,
            description
        });

        await surveysRepository.save(survey);

        return response.status(201).json(survey);

    }

    async show(request: Request, response: Response){
        const surveysRepository = getCustomRepository(SurveysRepository);

        const all = await surveysRepository.find();

        return response.json(all);
    }
}

export { SurveysController }