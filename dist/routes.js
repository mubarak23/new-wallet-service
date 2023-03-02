"use strict";
exports.__esModule = true;
/* tslint:disable */
/* eslint-disable */
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
var runtime_1 = require("@tsoa/runtime");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
var AuthController_1 = require("./controllers/AuthController");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
var UrlShortLerController_1 = require("./controllers/UrlShortLerController");
// @ts-ignore - no great way to install types from subpackage
var promiseAny = require('promise.any');
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
var models = {
    "IAccessTokenData": {
        "dataType": "refObject",
        "properties": {
            "token": { "dataType": "string", "required": true },
            "user": { "dataType": "any" },
            "wallet": { "dataType": "any" },
            "refreshToken": { "dataType": "string", "required": true }
        },
        "additionalProperties": false
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "DetailedError": {
        "dataType": "refObject",
        "properties": {
            "message": { "dataType": "string", "required": true },
            "standardizedErrorCode": { "dataType": "string", "required": true }
        },
        "additionalProperties": false
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IServerResponse_IAccessTokenData_": {
        "dataType": "refObject",
        "properties": {
            "status": { "dataType": "boolean", "required": true },
            "message": { "dataType": "string" },
            "data": { "ref": "IAccessTokenData" },
            "error": { "dataType": "string" },
            "errors": { "dataType": "array", "array": { "dataType": "refObject", "ref": "DetailedError" } }
        },
        "additionalProperties": false
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ISignupDto": {
        "dataType": "refObject",
        "properties": {
            "firstName": { "dataType": "string", "required": true },
            "lastName": { "dataType": "string", "required": true },
            "emailAddress": { "dataType": "string", "required": true },
            "phoneNumber": { "dataType": "string", "required": true },
            "password": { "dataType": "string", "required": true }
        },
        "additionalProperties": false
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ILoginDto": {
        "dataType": "refObject",
        "properties": {
            "emailAddress": { "dataType": "string", "required": true },
            "password": { "dataType": "string", "required": true }
        },
        "additionalProperties": false
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IUrlShortler": {
        "dataType": "refObject",
        "properties": {
            "shortUrl": { "dataType": "string", "required": true },
            "longUrl": { "dataType": "string", "required": true },
            "uniqueCode": { "dataType": "string", "required": true }
        },
        "additionalProperties": false
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IServerResponse_IUrlShortler_": {
        "dataType": "refObject",
        "properties": {
            "status": { "dataType": "boolean", "required": true },
            "message": { "dataType": "string" },
            "data": { "ref": "IUrlShortler" },
            "error": { "dataType": "string" },
            "errors": { "dataType": "array", "array": { "dataType": "refObject", "ref": "DetailedError" } }
        },
        "additionalProperties": false
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IServerResponse_void_": {
        "dataType": "refObject",
        "properties": {
            "status": { "dataType": "boolean", "required": true },
            "message": { "dataType": "string" },
            "data": { "dataType": "void" },
            "error": { "dataType": "string" },
            "errors": { "dataType": "array", "array": { "dataType": "refObject", "ref": "DetailedError" } }
        },
        "additionalProperties": false
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IUpdateUrlShortLer": {
        "dataType": "refObject",
        "properties": {
            "longUrl": { "dataType": "string", "required": true },
            "uniqueCode": { "dataType": "string", "required": true }
        },
        "additionalProperties": false
    }
};
var validationService = new runtime_1.ValidationService(models);
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
function RegisterRoutes(app) {
    // ###########################################################################################################
    //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
    //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
    // ###########################################################################################################
    app.post('/api/auth/users/signup', function AuthController_agentSignup(request, response, next) {
        var args = {
            reqBody: { "in": "body", "name": "reqBody", "required": true, "ref": "ISignupDto" }
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        var validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            var controller = new AuthController_1.AuthController();
            var promise = controller.agentSignup.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.post('/api/auth/users/signin', function AuthController_agentSignin(request, response, next) {
        var args = {
            reqBody: { "in": "body", "name": "reqBody", "required": true, "ref": "ILoginDto" }
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        var validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            var controller = new AuthController_1.AuthController();
            var promise = controller.agentSignin.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/api/url/:uniqueCode', function UrlShortLerController_handleFetchUrlDetails(request, response, next) {
        var args = {
            uniqueCode: { "in": "path", "name": "uniqueCode", "required": true, "dataType": "string" }
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        var validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            var controller = new UrlShortLerController_1.UrlShortLerController();
            var promise = controller.handleFetchUrlDetails.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.put('/api/url/update', function UrlShortLerController_handleUpdateUrlShortler(request, response, next) {
        var args = {
            reqBody: { "in": "body", "name": "reqBody", "required": true, "ref": "IUpdateUrlShortLer" }
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        var validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            var controller = new UrlShortLerController_1.UrlShortLerController();
            var promise = controller.handleUpdateUrlShortler.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app["delete"]('/api/url/:uniqueCode', function UrlShortLerController_handleDeleteUrl(request, response, next) {
        var args = {
            uniqueCode: { "in": "path", "name": "uniqueCode", "required": true, "dataType": "string" }
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        var validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            var controller = new UrlShortLerController_1.UrlShortLerController();
            var promise = controller.handleDeleteUrl.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    function isController(object) {
        return 'getHeaders' in object && 'getStatus' in object && 'setStatus' in object;
    }
    function promiseHandler(controllerObj, promise, response, successStatus, next) {
        return Promise.resolve(promise)
            .then(function (data) {
            var statusCode = successStatus;
            var headers;
            if (isController(controllerObj)) {
                headers = controllerObj.getHeaders();
                statusCode = controllerObj.getStatus() || statusCode;
            }
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            returnHandler(response, statusCode, data, headers);
        })["catch"](function (error) { return next(error); });
    }
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    function returnHandler(response, statusCode, data, headers) {
        if (headers === void 0) { headers = {}; }
        if (response.headersSent) {
            return;
        }
        Object.keys(headers).forEach(function (name) {
            response.set(name, headers[name]);
        });
        if (data && typeof data.pipe === 'function' && data.readable && typeof data._read === 'function') {
            data.pipe(response);
        }
        else if (data !== null && data !== undefined) {
            response.status(statusCode || 200).json(data);
        }
        else {
            response.status(statusCode || 204).end();
        }
    }
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    function responder(response) {
        return function (status, data, headers) {
            returnHandler(response, status, data, headers);
        };
    }
    ;
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    function getValidatedArgs(args, request, response) {
        var fieldErrors = {};
        var values = Object.keys(args).map(function (key) {
            var name = args[key].name;
            switch (args[key]["in"]) {
                case 'request':
                    return request;
                case 'query':
                    return validationService.ValidateParam(args[key], request.query[name], name, fieldErrors, undefined, { "noImplicitAdditionalProperties": "throw-on-extras" });
                case 'path':
                    return validationService.ValidateParam(args[key], request.params[name], name, fieldErrors, undefined, { "noImplicitAdditionalProperties": "throw-on-extras" });
                case 'header':
                    return validationService.ValidateParam(args[key], request.header(name), name, fieldErrors, undefined, { "noImplicitAdditionalProperties": "throw-on-extras" });
                case 'body':
                    return validationService.ValidateParam(args[key], request.body, name, fieldErrors, undefined, { "noImplicitAdditionalProperties": "throw-on-extras" });
                case 'body-prop':
                    return validationService.ValidateParam(args[key], request.body[name], name, fieldErrors, 'body.', { "noImplicitAdditionalProperties": "throw-on-extras" });
                case 'formData':
                    if (args[key].dataType === 'file') {
                        return validationService.ValidateParam(args[key], request.file, name, fieldErrors, undefined, { "noImplicitAdditionalProperties": "throw-on-extras" });
                    }
                    else if (args[key].dataType === 'array' && args[key].array.dataType === 'file') {
                        return validationService.ValidateParam(args[key], request.files, name, fieldErrors, undefined, { "noImplicitAdditionalProperties": "throw-on-extras" });
                    }
                    else {
                        return validationService.ValidateParam(args[key], request.body[name], name, fieldErrors, undefined, { "noImplicitAdditionalProperties": "throw-on-extras" });
                    }
                case 'res':
                    return responder(response);
            }
        });
        if (Object.keys(fieldErrors).length > 0) {
            throw new runtime_1.ValidateError(fieldErrors, '');
        }
        return values;
    }
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}
exports.RegisterRoutes = RegisterRoutes;
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
//# sourceMappingURL=routes.js.map