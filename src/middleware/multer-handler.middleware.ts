import type { Next, Req, Res } from '@reflet/express';
import multer from 'multer';
import { EXPRESS_FUNCTIONS } from '@/helpers/functions/express.functions.ts';


export function MulterHandler(
	upload: multer.Multer,
	allowFormats: Array<string>,
) {
	return async (req: Req, res: Res, next: Next) => {
		try {
			upload.single('file')(req, res, (err: multer.MulterError | unknown) => {
				if (!req.file) {

					return EXPRESS_FUNCTIONS.badRequestFailure(res, {
						message: 'No file uploaded',
						code: 'no-file-uploaded',
					});
				}

				if (!allowFormats.includes(req.file.mimetype)) {
					return EXPRESS_FUNCTIONS.badRequestFailure(res, {
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
			return EXPRESS_FUNCTIONS.unImplementedFailure(res, err);
		}
	};
}
