import {Request, Response} from "express";
import {getCustomRepository, Not, IsNull} from "typeorm";
import {SurveysUsersRepository} from "../repositories/SurveysUsersRepository";
import * as yup from "yup";
import {AppError} from "../errors/AppError";

class NpsController {

    async execute(request: Request, response: Response){
        const {survey_id} = request.params;

        const validations = yup.object().shape({
            survey_id: yup.string()
                .required("O campo survey_id é obrigatório.")
                .uuid("O campo survey_id tem que ser do tipo uuid")
        });

        await validations.validate(request.body).catch(error => {throw new AppError(error.message)});

        const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);

        const surveysUsers = await surveysUsersRepository.find({
            survey_id,
            value: Not(IsNull())
        });

        const detractor = surveysUsers.filter(survey => survey.value >= 0 && survey.value <= 6).length;
        const promoters = surveysUsers.filter(survey => survey.value >= 9 && survey.value <= 10).length;
        const passive = surveysUsers.filter(survey => survey.value >= 7 && survey.value <= 8).length;

        const totalAnswers = surveysUsers.length;

        const calculate = Number((((promoters - detractor) / totalAnswers) * 100).toFixed(2));

        return response.json({
           detractor,
           promoters,
           passive,
           totalAnswers,
           nps: calculate
        });

    }
}

export {NpsController}