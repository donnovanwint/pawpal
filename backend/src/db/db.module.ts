import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getConfig } from '../services/app-config/configuration';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () => { 
        const {
          database: { host, port, password, user, dbName },
        } = getConfig();
        console.log('Database Configuration:', { host, port, user, password, dbName });
        return {
          type: 'postgres', 
          host,
          port,
          username: user, 
          password,
          database: dbName,
          autoLoadEntities: true,
          synchronize: true,
        };
      },
    }),
  ],
})
export class DbModule {}
 