import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '~/user/dto/create-user.dto';
import { LocalAuthGuard } from './guards/local-auth/local-auth.guard';
import { RefreshAuthGuard } from './guards/refresh-auth/refresh-auth.guard';
import { GoogleAuthGuard } from './guards/google-auth/google-auth.guard';
import { GithubAuthGuard } from './guards/github-auth/github-auth.guard';
import { Public } from './decorators/public.decorator';
import { Roles } from './decorators/roles.decorator';
import { LocalAdminAuthGuard } from './guards/local-admin-auth/local-admin-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('signup')
  registerUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.registerUser(createUserDto);
  }

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('signin')
  login(@Request() req) {
    const { id, name, email, role } = req.user;
    return this.authService.login(id, name, role, email);
  }

  @Public()
  @UseGuards(LocalAdminAuthGuard)
  @Post('admin/signin')
  adminLogin(@Request() req) {
    const { id, name, email, role } = req.user;
    return this.authService.login(id, name, role, email);
  }

  @Post('signout')
  async signOut(@Request() req) {
    return this.authService.signOut(req.user.id);
  }

  @Public()
  @UseGuards(RefreshAuthGuard)
  @Post('refresh')
  refreshToken(@Request() req) {
    const { id, name } = req.user;
    return this.authService.refreshToken(id, name);
  }

  @Public()
  @UseGuards(GoogleAuthGuard)
  @Get('google/login')
  googleLogin() {}

  @Public()
  @UseGuards(GoogleAuthGuard)
  @Get('google/callback')
  googleCallback(@Request() req) {
    console.log('google user:', req.user);
  }

  @Public()
  @UseGuards(GithubAuthGuard)
  @Get('github/login')
  githubLogin() {}

  @Public()
  @UseGuards(GithubAuthGuard)
  @Get('github/callback')
  githubCallback(@Request() req) {
    console.log('req.user===>', req.user);
    //TODO: redirect to nextjs callback api
  }

  @Roles('ADMIN')
  @Post('getUser')
  getUser(@Request() req) {
    const id = req.user.id;
    return `ID:${id}`;
  }
}
