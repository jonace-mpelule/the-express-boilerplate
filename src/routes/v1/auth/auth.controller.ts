import { Post, type Req, type Res, Router, Use } from '@reflet/express';
import CAuthClient from '@/loaders/cauth.client.ts';
import { AcceptsHeaderGuard } from '@/middleware/accept-header-guard.middleware.ts';
import { AuthService } from './auth.service.ts';

@Router('/v1/auth')
export class AuthController {
	private authService: AuthService;
	constructor() {
		this.authService = new AuthService();
	}

	@Post('/register')
	@Use(AcceptsHeaderGuard(['application/json']))
	register = (req: Req, res: Res) => CAuthClient.Routes.Register()(req, res)


	@Post('/login')
	@Use(AcceptsHeaderGuard(['application/json']))
	login = (req: Req, res: Res) => CAuthClient.Routes.Login()(req, res)

	@Post('/logout')
	@Use(AcceptsHeaderGuard(['application/json']))
	logout = (req: Req, res: Res) => CAuthClient.Routes.Logout()(req, res)

	@Post('/refresh')
	@Use(CAuthClient.Guard())
	@Use(AcceptsHeaderGuard(['application/json']))
	refresh = (req: Req, res: Res) => CAuthClient.Routes.Refresh()(req, res);
 
	@Post('/change-password')
	@Use(CAuthClient.Guard())
	@Use(AcceptsHeaderGuard(['application/json']))
	changePassword = (req: Req, res: Res) =>
		CAuthClient.Routes.ChangePassword(String(req.cauth?.id))(req, res);
}
