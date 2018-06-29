require.config({
    baseUrl: "/js/",
    paths: {
        "jquery": "lib/jquery",
        "handlebars": "lib/handlebars",
        "swiper": "lib/swiper.min",
        "bscroll": "lib/bscroll.min",
        "index": "page/index",
        "text": "lib/text",
        "template": "common/template",
        "lazyload": "lib/jquery.lazyload",
        "search": "page/search",
        "getUrl": "common/getUrl",
        "detail": "page/detail",
        "read": "page/read",
        "base64": "lib/jquery.base64",
        "login": "page/login"
    },
    shim: {
        "lazyload": {
            exports: "lazyload",
            deps: ["jquery"]
        },
        "base64": {
            exports: "aa",
            deps: ["jquery"]
        },
    }
});

document.documentElement.style.fontSize = window.innerWidth / 750 * 100 + 'px';