import { HttpHeaders } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { RequestUtil } from './request-util';
import { ServiceConstants } from './service-constants';

export class HeadersUtil {

    static location = null;

    static getHeadersBasic(apiName: string) {

        let headers = new HttpHeaders()
            .append(ServiceConstants.APP_ID, environment.APP_ID)
            .append(ServiceConstants.REQUEST_ID, RequestUtil.generateRequestId(apiName));
        return headers;
    }

    /*static getHeadersUnknownUser(apiName: string) {
        let headers = this.getHeadersBasic(apiName);
        headers = headers.append(ServiceConstants.AUTHORIZATION, environment.tokenApiUnknownUser);
        return headers;
    }*/
}


