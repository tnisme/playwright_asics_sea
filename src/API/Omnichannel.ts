import { APIRequestContext, APIResponse } from '@playwright/test';
import qs from 'qs';
import * as fs from 'fs';
import RESTConstants from '../API/RESTConstants';

export class Omnichannel {

    private static async getToken(request: APIRequestContext): Promise<string> {

        const body = qs.stringify({
            grant_type: "client_credentials",
            scope: "SALESFORCE_COMMERCE_API:bksc_dev sfcc.inventory.impex-event-log sfcc.inventory.impex-graphs sfcc.inventory.impex-graphs.rw sfcc.inventory.impex-inventory.rw sfcc.inventory.impex-inventory sfcc.inventory.availability sfcc.inventory.availability.rw sfcc.inventory.reservations sfcc.inventory.reservations.rw sfcc.inventory.admin.rw"
        })
        const response: APIResponse = await request.post(process.env.BASE_URL_API + process.env.ENDPOINT_GET_TOKEN_API, {
            data: body,
            headers: {
                'Content-Type': RESTConstants.CONTENT_X_WWW_FORM_URLENCODED,
                Authorization: 'Basic ' + process.env.AUTHORIZATION_API
            },
        });

        const responseBody = await response.json();
        const token = responseBody.access_token;

        return token;
    }

    private static async importImpexApi(request: APIRequestContext, token: string): Promise<string> {
        const body = {
            fileFormat: "JSON",
            fileName: "oci.json",
            linkDuration: 1,
        };
        const response: APIResponse = await request.post(process.env.IMPORT_INVENTORY_API + '/inventory/impex/v1/organizations/128d7cd0-1922-45bc-82a1-aec131dff484/availability-records/imports', {
            data: body,
            headers: {
                'Content-Type': RESTConstants.CONTENT_JSON,
                Authorization: `Bearer ${token}`
            },
        });
        const responseBody = await response.json();
        const uploadLink = responseBody.uploadLink;
        return uploadLink;
    }

    public static async uploadFile(request: APIRequestContext, filePath: string): Promise<any>{
        const token = await this.getToken(request);
        const uploadLink = await this.importImpexApi(request, token);

        const response: APIResponse = await request.post(process.env.IMPORT_INVENTORY_API + uploadLink, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Accept': '*/*',
            },
            multipart: {
                fileUpload: fs.createReadStream(filePath),
            },
        });

        const responseBody = await response.json();
        return responseBody;
    }
}