    export interface PlayerDeathsPVE {
        date: number;
        reason: string;
    }

    export interface PlayerDeathsPVP {
        date: number;
        idPlayerKiller: string;
        namePlayerKiller: string;
        sleeperKill: boolean;
    }

    export interface PlayerKill {
        date: number;
        idPlayerKilled: string;
        namePlayerKilled: string;
        sleeperKill: boolean;
    }

    export interface Player {
        PlayerDeathsPVE: PlayerDeathsPVE[];
        PlayerDeathsPVP: PlayerDeathsPVP[];
        PlayerID: string;
        PlayerKills: PlayerKill[];
        PlayerName: string;
    }

    export interface RootObject {
        players: Player[];
    }
