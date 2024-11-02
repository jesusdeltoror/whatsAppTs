import * as fs from 'fs';
import * as path from 'path';
import axios, { AxiosRequestConfig } from 'axios';
import * as FormData from 'form-data';

let botId: string = '491392060716085';
let phoneNbr: string = '528712778678';
let bearerToken: string = 'EAAcPz29isEIBOwZBDbWpfjdbPwXZBgcQyQmWUuECfhnscUTlA6foWIfTHiWMDuZA0F5y6ybf34BTiZAaZAKvP1Bc30Gobu1onPh5EydxkQawfinNWGQl4MWdd7wAR5hMN9SUeqSXLdxxa8vADs9oO82bzomOv4pQy46Uwr6YZCD1A81fB3W1EzaZA8ZD';

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

const imagePath: string = path.resolve(__dirname, 'img/qr.png');
const textOrderService: string = '998899';
const textOperatorName: string = 'Carlos Serrano';

console.log(imagePath);

const uploadImage = async (): Promise<void> => {
  const formData: FormData = new FormData();
  formData.append('file', fs.createReadStream(imagePath));
  formData.append('messaging_product', 'whatsapp');

  const url: string = `https://graph.facebook.com/v15.0/${botId}/media`;

  const config: AxiosRequestConfig = {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${bearerToken}`,
    },
    data: formData,
  };

  try {
    const response = await axios(url, config);
    const data = response.data;

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

  const url: string = `https://graph.facebook.com/v15.0/${botId}/messages`;
  const config: AxiosRequestConfig = {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${bearerToken}`,
      'Content-Type': 'application/json',
    },
    data: JSON.stringify(messageData),
  };

  try {
    const response = await axios(url, config);
    const result = response.data;

    console.log('Response from sending message:', result);
  } catch (error) {
    console.error('Error sending message:', error);
  }
};

uploadImage();