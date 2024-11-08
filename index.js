"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var QRCode = require("qrcode");
var buffer_1 = require("buffer");
var axios_1 = require("axios");
var FormData = require("form-data");
//VARIABLES----------------------------
var botId = '491392060716085';
var phoneNbr = '528712778678';
var bearerToken = 'EAAcPz29isEIBO3l0Ysh4rjb3AMrPz6DxxwqDAvYJO5GTumOmZBCPAPMoMZAJQCltVL2YcgUooNIFjZClUQ8Fhmfz7lMoqV2TL4DjfYikQJrfiUe3jqQsRsZAKirzbGdgbi0BMu7Dh9jYIxfIMl7eabLZCDPwSmRaq0bCkU7wD3dSt6yeSs29IWq7rlUoKR04DzJ0W8W8aBGxnNbms3Wwg3Ipw';
var url = "https://graph.facebook.com/v15.0/".concat(botId, "/");
var textOrderService = '101010';
var textOperatorName = 'PEPE';
//CODE QR GENERATOR--------------------------------
QRCode.toDataURL(textOrderService, {
    errorCorrectionLevel: 'Q',
})
    .then(function (url) {
    //document.getElementById('serviceOrderNumQR').setAttribute('src', url);
    //document.getElementById('serviceOrderNum').innerText =
    'ORDEN DE SERVICIO: 1029479';
    uploadImage(url);
})
    .catch(function (err) {
    console.error(err);
});
//UPLOAD IMG API GRAPH META-----------------------    
var uploadImage = function (image64) { return __awaiter(void 0, void 0, void 0, function () {
    var buffer, formData, config, response, data, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                buffer = buffer_1.Buffer.alloc(image64.length);
                buffer.write(image64.replace('data:image/png;base64,', ''), 'base64');
                formData = new FormData();
                formData.append('file', buffer, 'image.png');
                formData.append('messaging_product', 'whatsapp');
                config = {
                    method: 'POST',
                    headers: {
                        'Authorization': 'Bearer ' + bearerToken,
                        'Content-Type': 'multipart/form-data',
                    },
                    data: formData,
                };
                _a.label = 1;
            case 1:
                _a.trys.push([1, 6, , 7]);
                return [4 /*yield*/, (0, axios_1.default)("".concat(url, "media"), config)];
            case 2:
                response = _a.sent();
                data = response.data;
                if (!data.id) return [3 /*break*/, 4];
                console.log('Image ID:', data.id);
                return [4 /*yield*/, sendMessage(data.id)];
            case 3:
                _a.sent();
                return [3 /*break*/, 5];
            case 4:
                console.error('Error to upload image:', data);
                _a.label = 5;
            case 5: return [3 /*break*/, 7];
            case 6:
                error_1 = _a.sent();
                console.error('Error:', error_1);
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); };
var sendMessage = function (imageId) { return __awaiter(void 0, void 0, void 0, function () {
    var messageData, config, response, result, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                messageData = {
                    messaging_product: 'whatsapp',
                    to: phoneNbr,
                    type: 'template',
                    template: {
                        name: 'mclg_qr2',
                        language: { code: 'es_MX' },
                        components: [
                            {
                                type: 'header',
                                parameters: [
                                    {
                                        type: 'image',
                                        image: {
                                            id: imageId,
                                        },
                                    },
                                ],
                            },
                            {
                                type: 'body',
                                parameters: [
                                    {
                                        type: 'text',
                                        text: textOrderService,
                                    },
                                    {
                                        type: 'text',
                                        text: textOperatorName,
                                    },
                                ],
                            },
                        ],
                    },
                };
                config = {
                    method: 'POST',
                    headers: {
                        Authorization: "Bearer ".concat(bearerToken),
                        'Content-Type': 'application/json',
                    },
                    data: JSON.stringify(messageData),
                };
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, (0, axios_1.default)("".concat(url, "messages"), config)];
            case 2:
                response = _a.sent();
                result = response.data;
                console.log('Response from sending message:', result);
                return [3 /*break*/, 4];
            case 3:
                error_2 = _a.sent();
                console.error('Error sending message:', error_2);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
