import { EXPRESS_MESSAGES, EXPRESS_STATUS } from "@/helpers/constants/express.values.ts";
import { Res, Req } from "@reflet/express";
import { totalUnhandledErrors } from "./prometheus.functions.ts";
import { Logger } from "@/loaders/loki.client.ts";
import env from "@/config/env.ts"
export class EXPRESS_FUNCTIONS {
    static async getIP(req: Req) {
        return req.headers["x-forwarded-for"] || req.connection.remoteAddress;
    }

    static async getOS(req: Req) {
        return req.headers["user-agent"];
    }

    static async created(res: Res, data: {}) {
        return res.status(EXPRESS_STATUS.CREATED).send(data)
    }

    static async success(res: Res, data: {}) {
        return res.status(EXPRESS_STATUS.OK).send({
            code: "success",
            ...data
        })
    }

    static async tempRedirect(res: Res, url: string) {
        return res.redirect(EXPRESS_STATUS.TEMPORARY_REDIRECT,url)
    }
  
  
    static async successWithNoContent(res: Res) {
        return res.sendStatus(EXPRESS_STATUS.NO_CONTENT)
    }

    static async conflictFailure(res: Res, data: {}) {
        return res.status(EXPRESS_STATUS.CONFLICT).send({ ...data })
    }

    static async badRequestFailure(res: Res, data: {}) {
        return res.status(EXPRESS_STATUS.BAD_REQUEST).send({ ...data })
    }
    static async notFoundFailure(res: Res, data: {}) {
        return res.status(EXPRESS_STATUS.NOT_FOUND).send({ ...data })
    }

    static async forbiddenFailure(res: Res, data: {}) {
        console.log('data', data)
        return res.status(EXPRESS_STATUS.FORBIDDEN).send({
            code: EXPRESS_STATUS.FORBIDDEN.toString().toLowerCase(),
            ...data
        })
    }

    static async unauthorizedFailure(res: Res, data: {}) {
        return res.status(EXPRESS_STATUS.UNAUTHORIZED).send({
            ...data, 
            message: EXPRESS_MESSAGES.UNAUTHORIZED, 

        })
    }

    static async notAcceptableFailure(res: Res) {
        return res.status(EXPRESS_STATUS.NOT_ACCEPTABLE).send({
            message: EXPRESS_MESSAGES.NOT_ACCEPTABLE,
        });
    }

    static async unImplementedFailure(res: Res, error: any) {
        if (env.ENV == "production") {
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
