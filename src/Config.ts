export interface Config {
    botToken: string;
    server: Server[];
}
export interface Server {
    channelId: string;
    apiUrl: string;
}