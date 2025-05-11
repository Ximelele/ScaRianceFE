import layout_config from "../assets/layout_config"

export default {
    install(app : any) {
        app.config.globalProperties.$UI = layout_config
    }
}
