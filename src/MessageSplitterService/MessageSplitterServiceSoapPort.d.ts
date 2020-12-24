/* tslint:disable:max-line-length no-empty-interface */
import { Client } from 'soap';

export interface IMessageSplitterInput {
    /** s:string(undefined) */
    message: string;
    /** s:string(undefined) */
    splitter: string;
}

export interface IMessageSplitterOutput {
    /** s:string(undefined) */
    result: string[];
    /** s:string(undefined) */
    version: string;
}

export interface IMessageSplitterServiceSoapPortSoap extends Client {
    MessageSplitter: (input: Partial<IMessageSplitterInput>, cb: (err: any | null, result: IMessageSplitterOutput, rawResult: string,  soapHeader: {[k: string]: any; },  rawRequest: string) => any, options?: any, extraHeaders?: any) => void;
    MessageSplitterAsync: (input: Partial<IMessageSplitterInput>, options?: any, extraHeaders?: any) => Promise<[IMessageSplitterOutput, string, {[k: string]: any; }, string]>;
}
