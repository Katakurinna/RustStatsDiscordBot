import { Client } from "@typeit/discord";

export class Main {
  private static _client: Client;

  static get Client(): Client {
    return this._client;
  }

  static start(): void {
    this._client = new Client();

    this._client.login(
      "ODA1NDc0ODM4MTg4OTE2Nzg2.YBba5g.WUyl4e4LxRQhaFH70Y-C7VO1wC0",
      `${__dirname}/*.ts`,
      `${__dirname}/*.js`,
    );
  }
}

Main.start();
