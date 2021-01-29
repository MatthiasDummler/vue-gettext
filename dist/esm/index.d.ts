import translateRaw from "./translate";
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
export declare let translate: ReturnType<typeof translateRaw>;
export declare let plugin: GetText;
export declare function $gettext(msg: string, vars?: Record<string, any>): string;
export declare function $pgettext(ctx: string, msg: string, vars?: Record<string, any>): string;
export declare function $ngettext(singular: string, plural: string, n: number, vars?: Record<string, any>): string;
export interface GetText {
    options: GetTextOptions;
    available: {
        [key: string]: string;
    };
    current: string;
}
export default function install(app: App, options?: Partial<GetTextOptions>): GetText;
export declare const useGettext: () => GetText;
