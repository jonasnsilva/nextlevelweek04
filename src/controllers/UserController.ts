import {Request, Response} from "express";
import {getCustomRepository} from "typeorm";
import {UsersRepositoriy} from "../repositories/UsersRepositoriy";
import * as yup from "yup";
import {AppError} from "../errors/AppError";

class UserController {
    async create(request: Request, response: Response) {
        const {name, email} = request.body;

        const validations = yup.object().shape({
            name: yup.string().required("O campo nome é obrigatório"),
            email: yup.string().required("O campo e-mail é obrigatório").email("O campo email tem que ser um e-mail")
        });


        await validations.validate(request.body).catch(error => {throw new AppError(error.message)});


        const usersRepository = getCustomRepository(UsersRepositoriy);

        const userAlreadyExists = await usersRepository.findOne({
            email
        });
        if (userAlreadyExists) {
            throw new AppError("Usuário já consta na nossa base de dados.");
        }
        const user = usersRepository.create({
            name, email
        });

        await usersRepository.save(user);

        return response.status(201).json(user);
    }
}

export {UserController}