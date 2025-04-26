const EXPRESS_STATUS = {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409,
    INTERNAL_SERVER_ERROR: 500,
    NOT_IMPLEMENTED: 501,
    SERVICE_UNAVAILABLE: 503
};

const EXPRESS_MESSAGES = {
    BAD_REQUEST: "Bad Request",
    UNAUTHORIZED: "Unauthorized",
    FORBIDDEN: "Forbidden",
    NOT_FOUND: "Not Found",
    CONFLICT: "Conflict",
    NOT_IMPLEMENTED: "Not Implemented",
    INTERNAL_SERVER_ERROR: "Internal Server Error",
    SERVICE_UNAVAILABLE: "Service Unavailable"
};

export { EXPRESS_STATUS, EXPRESS_MESSAGES };
