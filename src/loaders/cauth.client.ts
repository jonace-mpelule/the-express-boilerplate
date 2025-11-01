import { CAuth } from "@cauth/core"
import { ExpressContractor } from "@cauth/express"
import env from "@/config/env.ts"

const CAuthClient = CAuth({
    roles: ['User', 'Admin'],
    routeContractor: new ExpressContractor,
    dbContractor: {} as any,
    jwtConfig: {
        refreshTokenSecret: env.REFRESH_TOKEN_SECRET,
        accessTokenSecret: env.ACCESS_TOKEN_SECRET
    },
    otpConfig: {
        length: 4,
        expiresIn: 300000
    }
})


export default CAuthClient