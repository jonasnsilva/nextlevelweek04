import {Request, Response} from "express";
import {getCustomRepository} from "typeorm";
import {UsersRepositoriy} from "../repositories/UsersRepositoriy";
import * as yup from "yup";
import {AppError} from "../errors/AppError";

class UserController {
    async create(request: Request, response: Response) {
        const {name, email} = request.body;

        const schema = yup.object().shape({
            name: yup.string().required("Nome é obrigatório"),
            email: yup.string().email().required("E-mail é obrigatório")
        });


        try {
            await schema.isValid(request.body, {abortEarly: false})
        } catch (error){
            throw new AppError("Validation Failed!");
        }


        const usersRepository = getCustomRepository(UsersRepositoriy);

        const userAlreadyExists = await usersRepository.findOne({
            email
        });
        if (userAlreadyExists) {
            throw new AppError("User already exists!");
        }
        const user = usersRepository.create({
            name, email
        });

        await usersRepository.save(user);

        return response.status(201).json(user);
    }
}

export {UserController}