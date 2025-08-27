import jwt from 'jsonwebtoken';
import type ms from 'ms';
import env from '@/config/env.ts';


type Payload = {
    [key: string]: string
}

export const generateTokens = (payload: Payload ) => {
	try {
		const accessToken = jwt.sign(payload, env.ACCESS_TOKEN_SECRET, {
			expiresIn: '15m',
		});
		const refreshToken = jwt.sign(payload, env.REFRESH_TOKEN_SECRET, {
			expiresIn: '30d',
		});
		return { accessToken, refreshToken };
	} catch (error) {
		if (error instanceof Error) {
			console.log(error.message);
			throw error;
		}
	}
};

export const generateTokenWithSecret = ({
	payload,
	secret,
	expiry,
}: {
	payload: Payload;
	secret: string;
	expiry: ms.StringValue;
}) => {
	const token = jwt.sign(payload, secret, { expiresIn: expiry });

	return token;
};

export const verifyTokenWithSecret = ({
	payload,
	secret,
}: {
	payload: string;
	secret: string;
}): { valid: boolean; userid: string | undefined } => {
	try {
		const { err, id }: any = jwt.verify(payload, secret);
		if (err) return { valid: false, userid: undefined };
		return { valid: true, userid: id };
	} catch (err) {
		if (err instanceof Error) {
			if (err.message === 'jwt malformed') {
				throw 'invalid-token';
			}
			console.log(err.message);
			throw err;
		}
		throw err;
	}
};

export const decodeTokenWithSecret = (token: string, secret: string) => {
	try {
		const data : any = jwt.verify(token, secret);
		if (data.err) return { data, error: data.err };
		return { data, error: null };
	} catch (err) {
		if (err instanceof Error) {
			if (err.message === 'jwt malformed') {
				throw 'invalid-token';
			}
			console.log(err);
			throw err;
		}
		console.log(err);
		throw err;
	}
};
