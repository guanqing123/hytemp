;!function(win){
    "use strict";

    var load_pdfImg,
        load_url,
        load_document,
        _pdfjsLib,
        downloadManager,
        pageScripts = document.getElementsByTagName("script"),
        pdfImg_path = function(){
            for(var i in pageScripts){
                try{
                    var src = pageScripts[i].getAttribute("src");
                    var index = src.indexOf("pdfImg.js");
                    if(index > -1 && index == (src.length - 9)){
                        return src.substring(0, index);
                    }
                }catch(e){}
            }
            return "";
        }(),
        PdfImg = function(){
            this.init();
        };

    loadScript(pdfImg_path + "../build/pdf.js",function(){
        PDFJS.workerSrc = pdfImg_path + '../build/pdf.worker.js';
        PDFJS.cMapUrl = pdfImg_path + '../web/cmaps/';
        PDFJS.cMapPacked = true;
        if (typeof window !== 'undefined' && window['pdfjs-dist/build/pdf']) {
            _pdfjsLib = window['pdfjs-dist/build/pdf'];
        }
        downloadManager = new DownloadManager();
        if(load_pdfImg){
            getPdf(load_pdfImg);
        }
    });

    PdfImg.prototype.init = function (){
        this.url = "";
        this.containerId = "";
        this.imgWidth = "100%";
        this.black = 0;
        this.viewport = 1;
        this.success = function(){};
        this.error = function(){};
        return this;
    }

    PdfImg.prototype.show = function(config){
        return this.init().reload(config);
    }

    PdfImg.prototype.reload = function(config){
        return getPdf(extendsConfig(this, config));
    }

    PdfImg.prototype.download = function(filename, errorCallback){
        var _this = this;
        if(!_this.url){
            errorCallback("url为空，请先加载PDF！");
            return;
        }
        filename = filename || "download.pdf";
        function downloadByUrl() {
            downloadManager.downloadUrl(_this.url, filename);
        }
        downloadManager.onerror = function (err) {
            console.error('PDF failed to download: ' + err);
            if(errorCallback){
                errorCallback('PDF failed to download: ' + err);
            }
        };
        if (!load_document || !load_url) {
            downloadByUrl();
            return;
        }
        load_document.getData().then(function (data) {
            var blob = (0, _pdfjsLib.createBlob)(data, 'application/pdf');
            downloadManager.download(blob, _this.url, filename);
        }).catch(downloadByUrl);
        return _this;
    }

    PdfImg.prototype.print = function(config){
        var _this = this;

        var printImg = new PdfImg();
        printImg.viewport = 1.5;
        extendsConfig(printImg, config);
        if(load_document){
            printImg.timeout = config.timeout ? config.timeout : 500;
            printImg.printContainer = document.createElement("div");

            new PDFService(load_document, printImg)
                .renderPages()
                .then(function(){
                    printIframe(printImg);
                }, printImg.error);
        }else{
            printImg.error("PDF未加载！无法打印！");
        }

        return _this;
    }

    function extendsConfig(pdfImg, config){
        config = config || {};
        pdfImg.url = config.url ? config.url : pdfImg.url;
        pdfImg.containerId = config.containerId ? config.containerId : pdfImg.containerId;
        pdfImg.imgWidth = config.imgWidth ? config.imgWidth : pdfImg.imgWidth
        pdfImg.black = config.black == 1 ? 1 : config.black == 0 ? 0 : pdfImg.black;
        pdfImg.success = config.success ? config.success : pdfImg.success;
        pdfImg.error = config.error ? config.error : pdfImg.error;
        pdfImg.viewport = config.viewport ? config.viewport : pdfImg.viewport;
        pdfImg.imgWrapCls = config.imgWrapCls;
        return pdfImg;
    }

    function loadScript(src, callback) {
        var script = document.createElement('script');
        var loaded = false;
        script.setAttribute('src', src);
        if (callback) {
            script.onload = function () {
                if (!loaded) {
                    callback();
                }
                loaded = true;
            };
        }
        document.getElementsByTagName('head')[0].appendChild(script);
    }

    function getPdf(pdfImg){
        if(!pdfImg.url || !pdfImg.containerId){
            pdfImg.error("url和containerId不能为空！");
            return pdfImg;
        }
        if(typeof PDFJS == "undefined"){
            load_pdfImg = pdfImg;
        }else{
            if(load_document && pdfImg.url == load_url){
                renderImg(load_document, pdfImg);
            }else{
                PDFJS.getDocument(pdfImg.url).then(function(pdf){
                    load_url = pdfImg.url;
                    load_document = pdf;
                    renderImg(pdf, pdfImg);
                }, pdfImg.error);
            }
        }

        return pdfImg;
    }

    function renderImg(pdfDocument, pdfImg){
        new PDFService(pdfDocument, pdfImg)
            .renderPages()
            .then(pdfImg.success, pdfImg.error);
    }

    function PDFService(pdfDocument, pdfImg){
        this.pdfDocument = pdfDocument;
        this.currentPage = -1;
        this.scratchCanvas = document.createElement('canvas');
        this.container = pdfImg.printContainer ? pdfImg.printContainer
            : document.getElementById(pdfImg.containerId);
        this.black = pdfImg.black;
        this.imgWidth = pdfImg.imgWidth;
        this.viewport = pdfImg.viewport;
        this.imgWrapCls = pdfImg.imgWrapCls;

        this.container.innerHTML = "";
    }
    PDFService.prototype = {
        renderPages: function renderPages() {
            var _this = this;
            var pageCount = _this.pdfDocument.numPages;

            var renderNextPage = function renderNextPage(resolve, reject) {
                if (++_this.currentPage >= pageCount) {
                    resolve();
                    return;
                }
                var index = _this.currentPage;
                renderPage(_this, _this.pdfDocument, index + 1)
                    .then(_this.useRenderedPage.bind(_this))
                    .then(function () {
                        renderNextPage(resolve, reject);
                    }, reject);
            };
            return new Promise(renderNextPage);
        },
        useRenderedPage: function useRenderedPage(printItem) {
            var _this = this;
            var img = document.createElement('img');
            img.removeAttribute("height");
            img.setAttribute("width", _this.imgWidth);
            var scratchCanvas = _this.scratchCanvas;
            // 转换黑白
            if(_this.black){
                var myImglength = scratchCanvas.width * scratchCanvas.height;
                var myImgctx = scratchCanvas.getContext('2d');
                var myImage = myImgctx.getImageData(0, 0, scratchCanvas.width, scratchCanvas.height);
                var myBlack,colorsum;
                for (var k = 0; k < myImglength * 4; k += 4) {
                    colorsum = myImage.data[k];//myRed
                    colorsum += myImage.data[k + 1];//myGreen
                    colorsum += myImage.data[k + 2];//myBlue
                    if(colorsum > 720 || colorsum < 60){
                        continue;
                    }
//				myGray = parseInt(colorsum / 3);
//				myBlack = myGray - (255 - myGray) * 0.7;
                    myBlack = parseInt(colorsum * 0.567 - 178.5);
                    myImage.data[k] = myBlack;
                    myImage.data[k + 1] = myBlack;
                    myImage.data[k + 2] = myBlack;
                }
                myImgctx.putImageData(myImage, 0, 0);
            }

            if ('toBlob' in scratchCanvas && !PDFJS.disableCreateObjectURL) {
                scratchCanvas.toBlob(function (blob) {
                    img.src = URL.createObjectURL(blob);
                });
            } else {
                img.src = scratchCanvas.toDataURL();
            }
            var wrapper = document.createElement('div');
            if(_this.imgWrapCls){
                wrapper.classList.add(_this.imgWrapCls);
            }
            wrapper.appendChild(img);
            _this.container.appendChild(wrapper);
            return new Promise(function (resolve, reject) {
                img.onload = resolve;
                img.onerror = reject;
            });
        }
    };
    function renderPage(pdfService, pdfDocument, pageNumber) {
        var scratchCanvas = pdfService.scratchCanvas;
        var CSS_UNITS = 96.0 / 72.0;
        var PRINT_RESOLUTION = 150;
        var PRINT_UNITS = PRINT_RESOLUTION / 72.0;
        var width,height;
        return pdfDocument.getPage(pageNumber).then(function (pdfPage) {
            var viewport = pdfPage.getViewport(pdfService.viewport);
            scratchCanvas.width = Math.floor(viewport.width * PRINT_UNITS);
            scratchCanvas.height = Math.floor(viewport.height * PRINT_UNITS);
            width = Math.floor(viewport.width * CSS_UNITS) + 'px';
            height = Math.floor(viewport.height * CSS_UNITS) + 'px';
            var ctx = scratchCanvas.getContext('2d');
            ctx.save();
            ctx.fillStyle = 'rgb(255, 255, 255)';
            ctx.fillRect(0, 0, scratchCanvas.width, scratchCanvas.height);
            ctx.restore();
            var renderContext = {
                canvasContext: ctx,
                transform: [PRINT_UNITS, 0, 0, PRINT_UNITS, 0, 0],
                viewport: viewport,
                intent: 'print'
            };
            return pdfPage.render(renderContext).promise;
        }).then(function () {
            return {
                width: width,
                height: height
            };
        });
    }

    var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

    function _download(blobUrl, filename) {
        var a = document.createElement('a');
        if (a.click) {
            a.href = blobUrl;
            a.target = '_parent';
            if ('download' in a) {
                a.download = filename;
            }
            (document.body || document.documentElement).appendChild(a);
            a.click();
            a.parentNode.removeChild(a);
        } else {
            if (window.top === window && blobUrl.split('#')[0] === window.location.href.split('#')[0]) {
                var padCharacter = blobUrl.indexOf('?') === -1 ? '?' : '&';
                blobUrl = blobUrl.replace(/#|$/, padCharacter + '$&');
            }
            window.open(blobUrl, '_parent');
        }
    }

    var DownloadManager = function () {
        function DownloadManager() {
            _classCallCheck(this, DownloadManager);
        }

        _createClass(DownloadManager, [{
            key: 'downloadUrl',
            value: function downloadUrl(url, filename) {
                if (!(0, _pdfjsLib.createValidAbsoluteUrl)(url, 'http://example.com')) {
                    return;
                }
                _download(url + '#pdfjs.action=download', filename);
            }
        }, {
            key: 'downloadData',
            value: function downloadData(data, filename, contentType) {
                if (navigator.msSaveBlob) {
                    return navigator.msSaveBlob(new Blob([data], { type: contentType }), filename);
                }
                var blobUrl = (0, _pdfjsLib.createObjectURL)(data, contentType, _pdfjsLib.PDFJS.disableCreateObjectURL);
                _download(blobUrl, filename);
            }
        }, {
            key: 'download',
            value: function download(blob, url, filename) {
                if (navigator.msSaveBlob) {
                    if (!navigator.msSaveBlob(blob, filename)) {
                        this.downloadUrl(url, filename);
                    }
                    return;
                }
                if (_pdfjsLib.PDFJS.disableCreateObjectURL) {
                    this.downloadUrl(url, filename);
                    return;
                }
                var blobUrl = URL.createObjectURL(blob);
                _download(blobUrl, filename);
            }
        }]);

        return DownloadManager;
    }();


    function printIframe(printImg){
        var body = document.querySelector('body');

        var iframe = document.createElement("iframe");
        iframe.setAttribute("height","0");
        iframe.setAttribute("width","0");
        iframe.setAttribute("border","0");
        iframe.setAttribute("wmode","Opaque");
        iframe.setAttribute("style","position:absolute;top:-999;left:-999;border: none;");
        body.appendChild(iframe);

        // Print the selected window/iframe
        try {
            var frameWindow = iframe.contentWindow || iframe.contentDocument || iframe;
            var wdoc = frameWindow.document || frameWindow.contentDocument || frameWindow;
            wdoc.write(printImg.printContainer.innerHTML);
            wdoc.close();
            var printed = false;
            var callPrint = function () {
                if(printed) {
                    return;
                }
                // Fix for IE : Allow it to render the iframe
                frameWindow.focus();
                try {
                    // Fix for IE11 - printng the whole page instead of the iframe content
                    if (!frameWindow.document.execCommand('print', false, null)) {
                        // document.execCommand returns false if it failed -http://stackoverflow.com/a/21336448/937891
                        frameWindow.print();
                    }
                    // focus body as it is losing focus in iPad and content not getting printed
                    body.focus();
                } catch (e) {
                    frameWindow.print();
                }
                printed = true;
                frameWindow.close();
                setTimeout(function(){
                    iframe.remove();
                },500);
                printImg.success();
            }
            // Print once the frame window loads - seems to work for the new-window option but unreliable for the iframe
            frameWindow.onload = callPrint;
            // Fallback to printing directly if the frame doesn't fire the load event for whatever reason
            setTimeout(callPrint, printImg.timeout);
        } catch (err) {
            iframe.remove();
            printImg.error(err);
        }
    }

    win.pdfImg = new PdfImg();
}(window);