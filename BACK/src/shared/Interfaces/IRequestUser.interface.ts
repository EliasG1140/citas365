import { Request } from "express";

interface IUserRequest {
  id: number
  username: string
  nombre: string
  apellido: string
  rol: string
  iat: number
  exp: number
}

export interface IGetUserAuthInfoRequest extends Request{
  user: IUserRequest
}