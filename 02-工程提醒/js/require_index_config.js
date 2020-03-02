define(function () {
    require.config({
        baseUrl: 'js/lib',
        paths: {
            "vue": "vue"
        }
    });
    require(["../index"])
})