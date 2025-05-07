import { EXPRESS_MESSAGES, EXPRESS_STATUS } from "@/helpers/constants/express.values.ts";
import { Res, Req } from "@reflet/express";
import { totalUnhandledErrors } from "./prometheus.functions.ts";
import { Logger } from "@/loaders/loki.client.ts";
import config from "@/config/index.ts";

export class EXPRESS_FUNCTIONS {
    static async getIP(req: Req) {
        return req.headers["x-forwarded-for"] || req.connection.remoteAddress;
    }

    static async getOS(req: Req) {
        return req.headers["user-agent"];
    }

    static async conflictFailure(res: Res, data: {}) {
        return res.status(EXPRESS_STATUS.CONFLICT).send({ ...data })
    }

    static async notFoundFailure(res: Res, data: {}) {
        return res.status(EXPRESS_STATUS.NOT_FOUND).send({ ...data })
    }

    static async forbiddenFailure(res: Res, data: {}) {
        console.log('data', data)
        return res.status(EXPRESS_STATUS.FORBIDDEN).send({ ...data })
    }

    static async unauthorizedFailure(res: Res, data: {}) {
        console.log('data', data)
        return res.status(EXPRESS_STATUS.UNAUTHORIZED).send({ ...data })
    }

    static async unImplementedFailure(res: Res, error: any) {
        if (config.env == "production") {
            Logger.error({
                error
            })
            totalUnhandledErrors.inc({
                route: res.req.url
            })
        }
        return res.status(EXPRESS_STATUS.INTERNAL_SERVER_ERROR).send({
            message: EXPRESS_MESSAGES.INTERNAL_SERVER_ERROR,
            error: error,
        });
    }
}
