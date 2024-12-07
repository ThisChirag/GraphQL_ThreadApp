import {createHmac, randomBytes} from 'node:crypto';
import { prismaClient } from "../db"
import JWT from 'jsonwebtoken';

const JWT_SECRET='$uperM@n'



export interface CreateUserPayload{
    firstName: string
    lastName?: string
    email: string
    password: string
}

export interface GetUserTokenPayload{
    email: string
    password: string
}


class UserService{

    public static getUserById (id: string){
        return prismaClient.user.findUnique({where: {id}})
    }

    private static generateHash(salt:string, password: string){
        const hashedPassword = createHmac('sha256', salt).update(password).digest('hex');
        return hashedPassword;

    }
    public static createUser(payload: CreateUserPayload){

        const {firstName, lastName, email, password} = payload;
        const salt = randomBytes(32).toString('hex');
        const hashedPassword = UserService.generateHash(salt, password);

        return prismaClient.user.create({
            data:{
                firstName,
                lastName,
                email,
                salt,
                password: hashedPassword,
            }
        });
    }

    private static async getUserByEmail(email: string){
        return prismaClient.user.findUnique({where: {email }});
    }

    public static async getUserToken(payload: GetUserTokenPayload){
        const {email, password} = payload;
        const user = await UserService.getUserByEmail(email);

        if(!user) throw new Error('user not found');

        const userSalt = user.salt;
        const hashedPassword = UserService.generateHash(userSalt, password);

        if(hashedPassword !== user.password) throw new Error('Wrong email or password');

        const token = JWT.sign({id: user.id, email: user.email}, JWT_SECRET );
        return token;
    }

    public static decodeJWTToken(token:string){
        return JWT.verify(token, JWT_SECRET);

    }
}

export default UserService;