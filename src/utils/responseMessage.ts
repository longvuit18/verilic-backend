interface IResponseMessage {
    timestamp: number;
    status: number;
    message: string;
    data?: any;
}

export const responseMessage = (status: number, message: string, data?: any): IResponseMessage => {
    return {
        timestamp: new Date().getTime(),
        status,
        message,
        data
    };
};