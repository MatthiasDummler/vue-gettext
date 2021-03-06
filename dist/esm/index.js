var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import Component from "./component";
import Directive from "./directive";
import interpolate from "./interpolate";
import translateRaw from "./translate";
import { reactive, inject } from "vue";
var defaultOptions = {
    availableLanguages: { en_US: "English" },
    defaultLanguage: "en_US",
    mixins: {},
    muteLanguages: [],
    silent: false,
    translations: {},
};
export var GetTextSymbol = Symbol("GETTEXT");
export var translate = null;
export var plugin = null;
function replaceVars(string, vars) {
    if (!vars) {
        return string;
    }
    for (var varName in vars) {
        var varValue = vars[varName];
        var regexp = new RegExp("%{\\s*" + varName + "\\s*}", 'g');
        string = string.replace(regexp, varValue);
    }
    return string;
}
export function $gettext(msg, vars) {
    return replaceVars(translate ? translate.gettext(msg) : msg, vars);
}
export function $pgettext(ctx, msg, vars) {
    return replaceVars(translate ? translate.pgettext(ctx, msg) : msg, vars);
}
export function $ngettext(singular, plural, n, vars) {
    return replaceVars(translate ? translate.ngettext(singular, plural, n) : n === 1 ? singular : plural, vars);
}
export default function install(app, options) {
    if (options === void 0) { options = {}; }
    Object.keys(options).forEach(function (key) {
        if (Object.keys(defaultOptions).indexOf(key) === -1) {
            throw new Error(key + " is an invalid option for the translate plugin.");
        }
    });
    var mergedOptions = __assign(__assign({}, defaultOptions), options);
    var globalProperties = app.config.globalProperties;
    plugin = reactive({
        options: mergedOptions,
        available: mergedOptions.availableLanguages,
        current: mergedOptions.defaultLanguage,
    });
    if (options.mixins) {
        Object.keys(options.mixins).map(function (key) {
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
export var useGettext = function () { return inject(GetTextSymbol); };
//# sourceMappingURL=index.js.map