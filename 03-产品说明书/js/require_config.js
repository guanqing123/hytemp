define(function () {
    require.config({
        baseUrl: 'js/lib',
        paths: {
            "config":"../config",
            "mui": "mui.min",
            "vue": "vue",
            "lodash": "lodash.min",
            "plugins": "plugins",
            "jquery": "jquery"
        }
    });
    require(["../index"])
});