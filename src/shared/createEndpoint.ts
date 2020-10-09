import axios from 'src/api/axios';

export type HttpMethod = 'get' | 'post';

export type Endpoint<Req, Res> = {
    url: string;
    method: HttpMethod;
    call: (requestData: Req) => PromiseLike<Res>;
};

export function createEndpoint<Req, Res>(method: HttpMethod, url: string): Endpoint<Req, Res> {
    return {
        url,
        method,
        call: async (requestData: Req) => {
            const res = await (method === 'get'
                ? axios.get<Res>(url, { params: requestData })
                : axios.post<Res>(url, requestData));
            return res.data;
        },
    };
}
