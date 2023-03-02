"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
exports.__esModule = true;
var Sentry = __importStar(require("@sentry/node"));
var Tracing = __importStar(require("@sentry/tracing"));
var setupSentry = function (app) {
    if (process.env.NODE_ENV === 'production') {
        Sentry.init({
            dsn: process.env.SENTRY_DSN,
            integrations: [
                // enable HTTP calls tracing
                new Sentry.Integrations.Http({ tracing: true }),
                // enable Express.js middleware tracing
                new Tracing.Integrations.Express({ app: app }),
            ],
            // We recommend adjusting this value in production, or using tracesSampler
            // for finer control
            tracesSampleRate: 0.5
        });
    }
    // The sentry request handler must be the first middleware on the app
    // RequestHandler creates a separate execution context using domains, so that every
    // transaction/span/breadcrumb is attached to its own Hub instance
    app.use(Sentry.Handlers.requestHandler());
    // TracingHandler creates a trace for every incoming request
    app.use(Sentry.Handlers.tracingHandler());
};
exports["default"] = setupSentry;
//# sourceMappingURL=sentry.js.map