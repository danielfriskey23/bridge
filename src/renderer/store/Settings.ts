import BridgeStore from "../scripts/Utilities/BridgeStore";
import VueStore from "./index";
import path from "path";
import uuid from "uuid/v4";

let STORE: BridgeStore;
if (process.platform === "win32")
    STORE = new BridgeStore(path.join(process.env.HOMEDRIVE, process.env.HOMEPATH, ".bridge/"), "data");
else
    STORE = new BridgeStore(path.join(process.env.HOME, "bridge/"), "data");

let DATA: { [s: string]: any };
function setup() {
    if(!STORE.exists("settings")) {
        console.log("[SETTING STORE] Not found - creating new store with default values");
        STORE.setup("data");
        save({
            id: uuid(),
            is_dev_mode: false,
            is_dark_mode: true,
            intro_complete: false,
            inversed_arrows: false,
            use_tabs: true,
            line_wraps: false,
            auto_completions: true,
            text_auto_completions: true,
            auto_fill_inputs: false,
            open_all_nodes: false,
            default_project: "",
            target_version: "",
            snippet_scope: "Default",
            when_error: "On File Change",
            error_icon_indicator: true,
            error_auto_fix: true,
            focus_json_inputs: true,
            is_alternative_append_with_copy: true,
            custom_snippets: []
        });
    } else {
        DATA = STORE.load("settings");
    }

    VueStore.commit("setSettings", DATA);
    VueStore.commit("setDarkMode", DATA.is_dark_mode);

    //Upgrade old settings files
    if(DATA.id === undefined)
        save({ id: uuid() });
    if(DATA.text_auto_completions === undefined)
        save({ text_auto_completions: true });
    if(DATA.intro_complete === undefined)
        save({ intro_complete: false })
}
function save(settings: { [s: string]: any }) {
    if(DATA) DATA = Object.assign(DATA, settings);
    else DATA = settings;
   
    STORE.save("settings", Object.assign(DATA, settings));
}
function load() {
    return DATA;
}

export default {
    load: () => load(),
    save: (s: { [s: string]: any }) => save(s),
    setup: () => setup()
}
