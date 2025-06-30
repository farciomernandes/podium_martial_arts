import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { sign as jwtSign, verify as jwtVerify } from 'jsonwebtoken';

@Injectable()
export class JwtAdapter {
  private secret: string;
  constructor(private readonly configService: ConfigService) {
    this.secret = this.configService.getOrThrow<string>('JWT_SECRET_KEY');
  }

  async encrypt(payload: any): Promise<string> {
    return jwtSign(payload, this.secret);
  }

  async decrypt(ciphertext: string): Promise<string> {
    return jwtVerify(ciphertext, this.secret) as any;
  }
}
