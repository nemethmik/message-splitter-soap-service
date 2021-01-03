/* tslint:disable:max-line-length no-empty-interface */
import { Client } from 'soap';

export interface IQueryProductsInput {
    /** xsd:string(undefined) */
    fields: string;
    /** xsd:string(undefined) */
    filter: string;
}

export interface IQueryProductsOutput {
    product: SalesLTServiceSoapPortTypes.Iproduct[];
    /** xsd:string(undefined) */
    version: string;
}

export interface ISalesLTServiceSoapPortSoap extends Client {
    QueryProducts: (input: Partial<IQueryProductsInput>, cb: (err: any | null, result: IQueryProductsOutput, rawResult: string,  soapHeader: {[k: string]: any; },  rawRequest: string) => any, options?: any, extraHeaders?: any) => void;
    QueryProductsAsync: (input: Partial<IQueryProductsInput>, options?: any, extraHeaders?: any) => Promise<[IQueryProductsOutput, string, {[k: string]: any; }, string]>;
}

export namespace SalesLTServiceSoapPortTypes {
    export interface Iproduct {
        /** http://tempuri.org/#xsd:int(undefined) */
        ProductID: number;
        /** http://tempuri.org/#nvarchar(undefined) */
        Name: string;
        /** http://tempuri.org/#nvarchar(undefined) */
        ProductNumber: string;
        /** http://tempuri.org/#nvarchar(undefined) */
        Color: string;
        /** http://tempuri.org/#money(totalDigits,fractionDigits,maxInclusive,minInclusive) */
        StandardCost: number;
        /** http://tempuri.org/#money(totalDigits,fractionDigits,maxInclusive,minInclusive) */
        ListPrice: number;
        /** http://tempuri.org/#nvarchar(undefined) */
        Size: string;
        /** http://tempuri.org/#xsd:decimal(undefined) */
        Weight: number;
        /** http://tempuri.org/#xsd:int(undefined) */
        ProductCategoryID: number;
        /** http://tempuri.org/#xsd:int(undefined) */
        ProductModelID: number;
        /** http://tempuri.org/#datetime(pattern,maxInclusive,minInclusive) */
        SellStartDate: Date;
        /** http://tempuri.org/#datetime(pattern,maxInclusive,minInclusive) */
        SellEndDate: Date;
        /** http://tempuri.org/#datetime(pattern,maxInclusive,minInclusive) */
        DiscontinuedDate: Date;
        /** http://tempuri.org/#dbobject(undefined) */
        ThumbNailPhoto: string;
        /** http://tempuri.org/#nvarchar(undefined) */
        ThumbnailPhotoFileName: string;
        /** http://tempuri.org/#uniqueidentifier(pattern) */
        rowguid: string;
        /** http://tempuri.org/#datetime(pattern,maxInclusive,minInclusive) */
        ModifiedDate: Date;
    }
}
