"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.useGettext = exports.$ngettext = exports.$pgettext = exports.$gettext = exports.translate = exports.GetTextSymbol = void 0;
var component_1 = require("./component");
var directive_1 = require("./directive");
var interpolate_1 = require("./interpolate");
var translate_1 = require("./translate");
var vue_1 = require("vue");
var defaultOptions = {
    availableLanguages: { en_US: "English" },
    defaultLanguage: "en_US",
    mixins: {},
    muteLanguages: [],
    silent: false,
    translations: {},
};
exports.GetTextSymbol = Symbol("GETTEXT");
exports.translate = null;
function $gettext(msg) {
    return exports.translate ? exports.translate.gettext(msg) : msg;
}
exports.$gettext = $gettext;
function $pgettext(ctx, msg) {
    return exports.translate ? exports.translate.pgettext(ctx, msg) : msg;
}
exports.$pgettext = $pgettext;
function $ngettext(singular, plural, n) {
    return exports.translate ? exports.translate.ngettext(singular, plural, n) : n === 1 ? singular : plural;
}
exports.$ngettext = $ngettext;
function install(app, options) {
    if (options === void 0) { options = {}; }
    Object.keys(options).forEach(function (key) {
        if (Object.keys(defaultOptions).indexOf(key) === -1) {
            throw new Error(key + " is an invalid option for the translate plugin.");
        }
    });
    var mergedOptions = __assign(__assign({}, defaultOptions), options);
    var globalProperties = app.config.globalProperties;
    var plugin = vue_1.reactive({
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
    app.directive("translate", directive_1.default(plugin));
    app.component("translate", component_1.default);
    globalProperties.$translations = plugin.options.translations;
    exports.translate = translate_1.default(plugin);
    globalProperties.$gettext = exports.translate.gettext.bind(exports.translate);
    globalProperties.$pgettext = exports.translate.pgettext.bind(exports.translate);
    globalProperties.$ngettext = exports.translate.ngettext.bind(exports.translate);
    globalProperties.$npgettext = exports.translate.npgettext.bind(exports.translate);
    globalProperties.$gettextInterpolate = interpolate_1.default(plugin);
    app.provide(exports.GetTextSymbol, plugin);
    return plugin;
}
exports.default = install;
exports.useGettext = function () { return vue_1.inject(exports.GetTextSymbol); };
//# sourceMappingURL=index.js.map