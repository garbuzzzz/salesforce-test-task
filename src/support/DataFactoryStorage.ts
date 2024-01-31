import {
  DefaultAccountBody,
} from 'src/types/types.data';
import dotenv from 'dotenv';
import randomstring from 'randomstring';

dotenv.config();

const prefix = process.env.PREFIX as string;

export const defaultAccountBody: DefaultAccountBody = {
  Name: `${prefix}_Account_${randomstring.generate(10)}`,
};
