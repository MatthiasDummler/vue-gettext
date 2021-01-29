import Component from "./component";
import Directive from "./directive";
import interpolate from "./interpolate";
import translateRaw from "./translate";
import { reactive, App, inject, getCurrentInstance } from "vue";

export interface GetTextOptions {
  availableLanguages: { [key: string]: string };
  defaultLanguage: string;
  mixins: object;
  muteLanguages: Array<string>;
  silent: boolean;
  translations: { [key: string]: { [key: string]: any } };
}

const defaultOptions: GetTextOptions = {
  availableLanguages: { en_US: "English" },
  defaultLanguage: "en_US",
  mixins: {},
  muteLanguages: [],
  silent: false,
  translations: {},
};

export const GetTextSymbol = Symbol("GETTEXT");

export let translate: ReturnType<typeof translateRaw> = null;
export let plugin: GetText = null;

function replaceVars(string: string, vars?: Record<string, any>) {
  if (!vars) {
    return string;
  }
  for (const varName in vars) {
    const varValue = vars[varName];
    const regexp = new RegExp(`%{\\s*${varName}\\s*}`, 'g')
    string = string.replace(regexp, varValue);
  }
  return string;
}

export function $gettext(msg: string, vars?: Record<string, any>): string {
  return replaceVars(translate ? translate.gettext(msg) : msg, vars);
}

export function $pgettext(ctx: string, msg: string, vars?: Record<string, any>): string {
  return replaceVars(translate ? translate.pgettext(ctx, msg) : msg, vars);
}

export function $ngettext(singular: string, plural: string, n: number, vars?: Record<string, any>): string {
  return replaceVars(translate ? translate.ngettext(singular, plural, n) : n === 1 ? singular : plural, vars);
}

export interface GetText {
  options: GetTextOptions;
  available: { [key: string]: string };
  current: string;
}

export default function install(app: App, options: Partial<GetTextOptions> = {}) {
  Object.keys(options).forEach((key) => {
    if (Object.keys(defaultOptions).indexOf(key) === -1) {
      throw new Error(`${key} is an invalid option for the translate plugin.`);
    }
  });

  const mergedOptions = {
    ...defaultOptions,
    ...options,
  };

  const globalProperties = app.config.globalProperties;

  plugin = reactive({
    options: mergedOptions,
    available: mergedOptions.availableLanguages,
    current: mergedOptions.defaultLanguage,
  });

  if (options.mixins) {
    Object.keys(options.mixins).map((key) => {
      return (plugin[key] = plugin.options.mixins[key](plugin));
    });
  }
  globalProperties.$language = plugin;

  app.directive("translate", Directive(plugin));
  app.component("translate", Component);

  globalProperties.$translations = plugin.options.translations;
  translate = translateRaw(plugin);
  globalProperties.$gettext = translate.gettext.bind(translate);
  globalProperties.$pgettext = translate.pgettext.bind(translate);
  globalProperties.$ngettext = translate.ngettext.bind(translate);
  globalProperties.$npgettext = translate.npgettext.bind(translate);
  globalProperties.$gettextInterpolate = interpolate(plugin);

  app.provide(GetTextSymbol, plugin);
  return plugin;
}

export const useGettext = (): GetText => inject(GetTextSymbol);
