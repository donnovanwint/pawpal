import { IsNotEmpty, IsString, MaxLength, IsOptional, IsInt, IsEnum } from "class-validator";

export enum AnimalType {
    CAT = 'cat',
    DOG = 'dog',
}

export enum Gender {
    MALE = 'male',
    FEMALE = 'female',
    OTHER = 'other'
}

export class CreatePetDto {
    @IsNotEmpty()
    @IsString()
    @MaxLength(255)
    name: string;

    @IsOptional()
    @IsString()
    @MaxLength(255)
    gender?: Gender;

    @IsOptional()
    @IsInt()
    age?: number;

    @IsOptional()
    @IsEnum(AnimalType)
    animalType?: AnimalType;

    @IsOptional()
    @IsString()
    @MaxLength(1000)
    description?: string;
}