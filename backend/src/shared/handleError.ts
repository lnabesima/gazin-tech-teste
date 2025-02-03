import { HttpException, HttpStatus } from '@nestjs/common';
import {
  PrismaClientKnownRequestError,
  PrismaClientValidationError,
} from '@prisma/client/runtime/library';

export function handleError(error: unknown, type: string): never {
  const normalizedType = type.toLowerCase();

  if (error instanceof HttpException && error.getStatus() === 400) {
    throw error; //this is too hacky, but will have to do for now
  }

  if (error instanceof PrismaClientKnownRequestError) {
    if (error.code === 'P2025') { //this means not found
      throw new HttpException(`${normalizedType === 'level' ? 'Level' : 'Developer'} not found.`,
        HttpStatus.NOT_FOUND);
    }
  }

  if (error instanceof PrismaClientValidationError) {
    console.error('Validation error: ', error.message);
    throw new HttpException('Some parameters are either invalid or missing.',
      HttpStatus.BAD_REQUEST);
  }

  //TODO: implement a logger method here
  console.error('Unexpected error: ', error);
  throw new HttpException('Unexpected error.', HttpStatus.INTERNAL_SERVER_ERROR);
}

