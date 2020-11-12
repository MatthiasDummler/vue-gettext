import { App } from "vue";
export interface GetTextOptions {
    availableLanguages: {
        [key: string]: string;
    };
    defaultLanguage: string;
    mixins: object;
    muteLanguages: Array<string>;
    silent: boolean;
    translations: {
        [key: string]: {
            [key: string]: any;
        };
    };
}
export declare const GetTextSymbol: unique symbol;
export interface GetText {
    options: GetTextOptions;
    available: {
        [key: string]: string;
    };
    current: string;
}
export default function install(app: App, options?: Partial<GetTextOptions>): GetText;
export declare const useGettext: () => GetText;
