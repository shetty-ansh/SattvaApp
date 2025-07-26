import * as mongodb from 'mongodb'

export interface Entry{
    _id?: mongodb.ObjectId;
    title: string;
    desc: string;
    date: Date;
    rating: '1' | '2' | '3' | '4' | '5' ;
}
//Favourite
