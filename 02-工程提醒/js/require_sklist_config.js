define(function () {
    require.config({
        baseUrl: 'js/lib',
        paths: {
            "config":"../config",
            "mui":"mui.min",
            "vue": "vue",
            "lodash": "lodash.min",
            "installer": "plugins/installer",
            "iscroll-probe": "iscroll-probe",
            "iscrollTable": "plugins/iscrollTable",
            "plugins": "plugins"
        }
    });
    require(["../sklist"])
})