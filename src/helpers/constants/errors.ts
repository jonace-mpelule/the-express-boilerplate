/** biome-ignore-all lint/complexity/noStaticOnlyClass: <''> */
export default class Errors {
	public static readonly UserNotFoundError = 'user-not-found';
	public static readonly UserNotFoundMessage = 'User Not Found';

	public static readonly CountryNotFoundError = 'country-not-found';
	public static readonly CountryNotFoundMessage = 'Country Not Found';

	public static readonly CredentialMismatchError = 'credential-mismatch';
	public static readonly CredentialMismatchMessage = 'Credential Mismatch. Please check and try again';
}
