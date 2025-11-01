import { Get, Post, type Req, Router, Use } from '@reflet/express';
import CAuthClient from '@/loaders/cauth.client.ts';
import { AcceptsHeaderGuard } from '@/middleware/accept-header-guard.middleware.ts';
import { ValidationGuard } from '@/middleware/validation-guard.middleware.ts';
import { controllerHandler } from '@/utils/router.handler.ts';
import { CreateCountryDTO } from './countries.dto.ts';
import { CountriesService } from './countries.service.ts';

@Router('/v1/countries')
export class countriesController {
	private countriesService: CountriesService;
	constructor() {
		this.countriesService = new CountriesService();
	}

	@Get('/')
	getCountries = controllerHandler(async () => {
		const countries = await this.countriesService.handleGetCountries();
		return { countries: [] };
	});

	@Post('/')
	@Use(CAuthClient.Guard())
	@Use(AcceptsHeaderGuard(['application/json']))
	@Use(ValidationGuard(CreateCountryDTO))
	createCountry = controllerHandler(
		async (req: Req) => {
			const result = await this.countriesService.handleCreateCounry(req.body);
			return {
				country: [],
			};
		},
		{
			successStatus: 201,
		},
	);
}
