import { Config } from "src/app/configs/config";

export class RequestUtil {

    static generateRequestId(apiName?: string): string {
        return this.getInitialsApi(apiName) + new Date().getTime() + this.getRandomInt(1, 100);
    }

    static getInitialsApi(apiName: string): string {
        switch (apiName) {
            // Palabras
            case Config.apiWord: {
                return 'APLWRD';
            }
            default: {
                return 'APLDF';
            }
        }
    }

    static getRandomInt(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}
