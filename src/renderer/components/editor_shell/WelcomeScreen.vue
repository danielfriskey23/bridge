<template>
    <v-layout
        v-bind:class="classObject"
        :style="`height: ${available_height}px;`"
        @dblclick="createFile"
        column
    >
        <div v-if="!$store.state.Settings.intro_complete" style="padding: 20vh">
            <h1>Welcome to bridge.</h1>
            <br>
            <p>
                Creating Minecraft addons has never been more convenient!
            </p>
            <ul>
                <li>
                    <v-icon small>mdi-auto-fix</v-icon>
                    <span>Syntax highlighting</span>
                </li>
                <li>
                    <v-icon small>mdi-format-list-bulleted</v-icon>
                    <span>Rich auto-completions</span>
                </li>
                <li>
                    <v-icon small>mdi-folder-multiple</v-icon>
                    <span>Easy project management</span>
                </li>
                <li>
                    <v-icon small>mdi-json</v-icon>
                    <span>Custom addon syntax</span>
                </li>
                <li>
                    <v-icon small>mdi-nodejs</v-icon>
                    <span>Customizable through plugins</span>
                </li>
            </ul>
            <p style="padding-top: 20px">
                <v-btn v-on:click="hideIntro" outlined>
                    Got it!
                </v-btn>
            </p>
        </div>
        <img id="large-bridge-logo" v-else v-bind:src="icon_path">
    </v-layout>
</template>

<script>
    import path from "path";
    import DataUrl from "dataurl";
    import fs from "fs";
    import CreateFileWindow from "../../windows/CreateFile";
    import Settings from "../../store/Settings";

    export default {
        name: "welcome-screen",
        props: {
            available_height: Number
        },
        methods: {
            createFile(event) {
                new CreateFileWindow(undefined, false);
            },
            hideIntro() {
                let settings = Settings.load()
                settings.intro_complete = true
                Settings.save(settings)
                this.$store.commit("setSettings", { intro_complete: true })
            }
        },
        data() {
            return {
                classObject: {
                    "no-files-open": this.$store.state.Settings.intro_complete
                },
                icon_path: DataUrl.convert({
                    data: fs.readFileSync(path.join(__static, "/icon.png")),
                    mimetype: `image/png`
                })
            }
        }
    }
</script>

<style scoped>
    div, li {
        list-style-type: none;
        text-align: center;
    }
    span {
        margin-left: 4px;
    }
    img {
        display: block;
        margin: 25vh auto;
        max-width: 1024px;
        max-height: 1024px;
        width: 30vh;
        height: 30vh;
    }
</style>
