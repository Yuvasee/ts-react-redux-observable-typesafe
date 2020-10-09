import { createEndpoint } from 'src/shared/createEndpoint';

export type GetDataReq = {
    postId: number;
};

export type GetDataRes = {
    postId: number;
    id: number;
    name: string;
    email: string;
    body: string;
}[];

export const apiGetData = createEndpoint<GetDataReq, GetDataRes>('get', 'http://jsonplaceholder.typicode.com/comments');
