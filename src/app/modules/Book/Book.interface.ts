import { Model, ObjectId } from "mongoose";


export enum Genre{
    FICTION = "FICTION", 
    NON_FICTION = "NON_FICTION",
    SCIENCE = "SCIENCE",
    HISTORY = "HISTORY", 
    BIOGRAPHY = "BIOGRAPHY",
    FANTASY = "FANTASY"
}

export interface TBook{
    title: string,
    author: string,
    genre: Genre,
    isbn: string,
    description?: string,
    copies: number,
    available: boolean
  }