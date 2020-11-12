import { GetText } from ".";
declare const translate: (plugin: GetText) => {
    getTranslation: (msgid: string, n?: number, context?: any, defaultPlural?: any, language?: string) => any;
    gettext: (msgid: any) => any;
    pgettext: (context: any, msgid: any) => any;
    ngettext: (msgid: any, plural: any, n: any) => any;
    npgettext: (context: any, msgid: any, plural: any, n: any) => any;
};
export default translate;
