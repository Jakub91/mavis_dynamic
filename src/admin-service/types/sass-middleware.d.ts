declare module 'sass-middleware' {
    import { RequestHandler } from 'express';
    import { Options as SassOptions } from 'sass';

    interface SassMiddlewareOptions extends SassOptions {
        src: string;
        dest?: string;
        root?: string;
        prefix?: string;
        force?: boolean;
        debug?: boolean;
        indentedSyntax?: boolean;
        response?: boolean;
        error?: (error: Error) => void;
    }

    function sassMiddleware(options: SassMiddlewareOptions): RequestHandler;
    export = sassMiddleware;
}
