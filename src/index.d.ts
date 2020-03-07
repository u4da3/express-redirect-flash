import {Response, RequestHandler} from 'express-serve-static-core';

declare function redirectFlashMiddleware(options?: object): RequestHandler;
declare namespace redirectFlashMiddleware {}
export = redirectFlashMiddleware;

declare module 'express-serve-static-core' {
  interface Response {
    redirectFlash(url: string, data: any): void;
    redirectFlash(status: number, url: string, data: any): void;
  }
}
