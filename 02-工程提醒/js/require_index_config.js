define(function () {
    require.config({
        baseUrl: 'js/lib',
        paths: {
            "config":"../config",
            "mui": "mui.min",
            "loading": "plugins/loading",
            "vue": "vue",
            "lodash": "lodash.min"
        },
        shim:{
            "loading":{
                deps:["mui"]
            }
        }
    });
    require(["../index"])
})