define(function () {
    require.config({
        baseUrl: 'js/lib',
        paths: {
            "config":"../config",
            "mui": "mui.min",
            "vue": "vue",
            "lodash": "lodash.min",
            "installer": "plugins/installer"
        }
    });
    require(["../download"])
});