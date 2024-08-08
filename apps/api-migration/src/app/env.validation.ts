import {
    IsEnum,
    IsNotEmpty,
    IsPort,
    IsString,
    validateSync,
} from 'class-validator';
import { plainToInstance } from 'class-transformer';

enum Environment {
    Development = 'development',
    Production = 'production',
    Test = 'test',
}
export class EnvironmentVariables {
    @IsEnum(Environment)
    NODE_ENV: Environment;

    @IsPort()
    PORT: string;

    @IsString()
    @IsNotEmpty()
    SECRET_REFRESH_TOKEN: string;

    @IsString()
    @IsNotEmpty()
    SECRET_ACCESS_TOKEN: string;

    @IsString()
    @IsNotEmpty()
    SMTP_EMAIL: string;

    @IsString()
    @IsNotEmpty()
    SMTP_PASS: string;

    @IsString()
    @IsNotEmpty()
    SMTP_FROM_EMAIL: string;

    @IsString()
    @IsNotEmpty()
    SMTP_FROM_NAME: string;

    @IsString()
    @IsNotEmpty()
    SMTP_HOST: string;

    @IsPort()
    SMTP_PORT: string;

    @IsString()
    @IsNotEmpty()
    DATABASE_URL: string;

    @IsString()
    @IsNotEmpty()
    ACCESS_TOKEN_EXPIRE: string;

    @IsString()
    @IsNotEmpty()
    REFRESH_TOKEN_EXPIRE: string;

    @IsString()
    @IsNotEmpty()
    CLIENT_URL: string;
}

export const validate = (config: Record<string, unknown>) => {
    const validatedConfig = plainToInstance(EnvironmentVariables, config, {
        enableImplicitConversion: true,
    });
    const errors = validateSync(validatedConfig, {
        skipMissingProperties: false,
    });

    if (errors.length > 0) {
        throw new Error(errors.toString());
    }
    return validatedConfig;
};
