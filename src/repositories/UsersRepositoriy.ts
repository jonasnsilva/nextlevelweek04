import {EntityRepository, Repository} from "typeorm";
import {User} from "../models/User";

@EntityRepository(User)
class UsersRepositoriy extends Repository<User> {


}

export { UsersRepositoriy }