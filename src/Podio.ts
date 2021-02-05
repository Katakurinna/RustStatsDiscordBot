import {
    Discord,
    CommandMessage,
    Command,
    Description
} from "@typeit/discord";
import { MessageEmbed } from "discord.js";
import { Player } from "./RustAdminStats";
const fetch = require('node-fetch');

@Discord("!")
@Description("Podium")
export abstract class AllInOne {
    private lastTime: number;
    @Command("podio")
    private podio(message: CommandMessage) {
        if (this.lastTime + (300000) > Date.now()) {
            message.reply("No han pasado 5 minutos desde la ultima vez que se obtuvo el podio.");
            return;
        }
        
        let url = "http://localhost:8888/getPlayersGlobalStats";
        let settings = { method: "Get" };
        let names: string[] = [];
        let kills: string[] = [];
        fetch(url, settings)
            .then(res => res.json())
            .then(json => {
                let podio = json.players.sort((a, b) => this.compare(a, b));

                podio.slice(0, 5).forEach(e => {
                    names.push(e.PlayerName);
                    kills.push(e.PlayerKills.length);
                });

                message.channel.send(this.generatePodiumMessage(names, kills));
            });
        this.lastTime = Date.now();
    }
    public compare(a: Player, b: Player): number {
        return a.PlayerKills.length > b.PlayerKills.length ? -1 : a.PlayerKills.length == b.PlayerKills.length ? 0 : 1;
    }

    public generatePodiumMessage(names: string[], kills: string[]): MessageEmbed {
        const exampleEmbed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle('PODIUM')
            .setAuthor('RustStatistics')
            .addFields(
                { name: 'TOP KILLER', value: names[0] + " 🔫 " + kills[0] },
                { name: '\u200B', value: '\u200B' },
                { name: 'TOP 2',  value: names[1] + " 🔫 " + kills[1], inline: true },
                { name: 'TOP 3',  value: names[2] + " 🔫 " + kills[2], inline: true },
                { name: 'TOP 4',  value: names[3] + " 🔫 " + kills[3], inline: true },
                { name: 'TOP 5',  value: names[4] + " 🔫 " + kills[4], inline: true },
            )
            .setTimestamp()
            .setFooter('RustStatistics by Katakurinna');
        return exampleEmbed;
    }
}