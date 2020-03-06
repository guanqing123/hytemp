define(function () {
    require.config({
        baseUrl: 'js/lib',
        paths: {
            "config":"../config",
            "vue": "vue",
            "lodash": "lodash.min",
            "installer": "plugins/installer",
            "iscroll-probe": "iscroll-probe",
            "iscrollTable": "plugins/iscrollTable"
        }
    });
    require(["../solist"])
})