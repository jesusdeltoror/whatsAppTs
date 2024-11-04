import * as QRCode from 'qrcode'
import {Buffer} from 'buffer'
import * as fs from 'fs';
import * as path from 'path';
import axios, { AxiosRequestConfig } from 'axios';
import * as FormData from 'form-data';
//INTERFACE----------------------------
interface MessageData {
    messaging_product: string;
    to: string;
    type: string;
    template: {
      name: string;
      language: {
        code: string;
      };
      components: [
        {
          type: string;
          parameters: [
            {
              type: string;
              image?: {
                id: string;
              };
              text?: string;
            }
          ]
        },
        {
          type: string;
          parameters: [
            {
              type: string;
              text: string;
            },
            {
              type: string;
              text: string;
            }
          ]
        }
      ]
    };
  }
interface PostReq {
  method: string;
  headers: {
    Authorization: string;
  };
  data: FormData;
}
interface MessageReq {
  method: string;
  headers: {
    Authorization: string;
    'Content-Type': string;
  };
  data: string;
}
//VARIABLES----------------------------
let botId: string = '491392060716085';
let phoneNbr: string = '528712778678';
let bearerToken: string = 'EAAcPz29isEIBO3l0Ysh4rjb3AMrPz6DxxwqDAvYJO5GTumOmZBCPAPMoMZAJQCltVL2YcgUooNIFjZClUQ8Fhmfz7lMoqV2TL4DjfYikQJrfiUe3jqQsRsZAKirzbGdgbi0BMu7Dh9jYIxfIMl7eabLZCDPwSmRaq0bCkU7wD3dSt6yeSs29IWq7rlUoKR04DzJ0W8W8aBGxnNbms3Wwg3Ipw';
let url: string = `https://graph.facebook.com/v15.0/${botId}/`
let textOrderService: string = '101010';
let textOperatorName: string = 'PEPE';
//CODE QR GENERATOR--------------------------------
QRCode.toDataURL(textOrderService, {
    errorCorrectionLevel: 'Q',
  })
    .then((url: string) => {
      //document.getElementById('serviceOrderNumQR').setAttribute('src', url);
      //document.getElementById('serviceOrderNum').innerText =
        'ORDEN DE SERVICIO: 1029479'
        uploadImage(url)
    })
    .catch((err: any) => {
      console.error(err);
    });

//UPLOAD IMG API GRAPH META-----------------------    
let uploadImage = async (image64: string): Promise<void> => {
    const buffer = Buffer.alloc(image64.length);
    buffer.write(image64.replace('data:image/png;base64,', ''), 'base64');
    
   
    let formData: FormData = new FormData();
        formData.append('file', buffer, 'image.png');
        formData.append('messaging_product', 'whatsapp');

    let config: AxiosRequestConfig = {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + bearerToken,
            'Content-Type': 'multipart/form-data',
        },
        data: formData,
};
  try {
    let response = await axios(`${url}media`, config);
    let data = response.data;
    if (data.id) {
      console.log('Image ID:', data.id);
      await sendMessage(data.id);
    } else {
      console.error('Error to upload image:', data);
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

const sendMessage = async (imageId: string): Promise<void> => {
    const messageData: MessageData = {
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
    let config: AxiosRequestConfig = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${bearerToken}`,
        'Content-Type': 'application/json',
      },
      data: JSON.stringify(messageData),
    };
  
    try {
      let response = await axios(`${url}messages`, config);
      let result = response.data;
  
      console.log('Response from sending message:', result);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };