import type { Next, Req, Res } from '@reflet/express';
import multer from 'multer';
import { ResFN } from '@/utils/response.utils.ts';

export function MulterHandler(
	upload: multer.Multer,
	allowFormats: Array<string>,
) {
	return async (req: Req, res: Res, next: Next) => {
		try {
			upload.single('file')(req, res, (err: multer.MulterError | unknown) => {
				if (!req.file) {
					return ResFN.badRequest(res, {
						message: 'No file uploaded',
						code: 'no-file-uploaded',
					});
				}

				if (!allowFormats.includes(req.file.mimetype)) {
					return ResFN.badRequest(res, {
						message: `File format not allowed. Allowed formats: ${allowFormats.join(', ')}`,
						code: 'invalid-format',
					});
				}

				if (err instanceof multer.MulterError) {
					console.log(err.message);
					return res.status(500).send({
						message: err.message,
					});
				}

				next();
			});
		} catch (err) {
			return ResFN.internalServerError(res, err);
		}
	};
}
