define(function () {
    require.config({
        baseUrl: 'js/lib',
        paths: {
            "config":"../config",
            "mui": "mui.min",
            "vue": "vue",
            "installer": "plugins/installer"
        }
    });
    require(["../index"])
});