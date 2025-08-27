import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import type { NextFunction, Request, Response } from 'express';

function extractFormData(req: Request) {
	const formData: any = { ...req.body };

	// If single file
	if (req.file) {
		formData[req.file.fieldname] = req.file;
	}

	// If multiple files (as an array or object)
	if (req.files) {
		if (Array.isArray(req.files)) {

      for (const file of req.files) {
				formData[file.fieldname] = file;
			}

    } else {

			for (const [fieldname, files] of Object.entries(req.files)) {
				if (Array.isArray(files) && files.length === 1) {
					formData[fieldname] = files[0];
				} else {
					formData[fieldname] = files;
				}
			}
		}
	}

	return formData;
}

export function ValidationGuard(dtoClass: any) {
	return async (req: Request, res: Response, next: NextFunction) => {
		const data = extractFormData(req);
		const dtoObject = plainToInstance(dtoClass, data);

		const errors = await validate(dtoObject);
		if (errors.length > 0) {
			const messages = errors
				.flatMap((error) => Object.values(error.constraints || {}))
				.join(', ');
			return res.status(400).json({ message: messages });
		}

		next();
	};
}
