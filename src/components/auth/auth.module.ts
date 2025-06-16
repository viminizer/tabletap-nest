import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { HttpModule } from '@nestjs/axios';
import { JwtModule } from '@nestjs/jwt';
import { TOKEN_TTL } from 'src/libs/utils';

@Module({
  imports: [
    HttpModule,
    JwtModule.register({
      secret: `${process.env.SECRET_TOKEN}`,
      signOptions: { expiresIn: TOKEN_TTL },
    }),
  ],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
