const fetch = require('node-fetch');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');
const botId = '491392060716085';
const phoneNbr = '528712778678';
const bearerToken = 'EAAcPz29isEIBOZBwsrqGZBioX5udXWNJ8WsnlC3uFJi0ZCmFL2SiTNxyv5pFNFNv5rmDlCoWYdCmw41nY27ngLGzPubQLZCQsPAVLMbS8WMUrJQYJlb86h9ALrGKK2zrIfpKMTieFvWpdlE74PcOMCaod5ZBzVHnY1CyfaHTZB8rZBYyRkxFlpWn9T4RAyhSaDsIXqKdtZAjUnDh0GAT82QXlYt6';

const imagePath = path.resolve(__dirname, 'img/qr.png');
const variable1 = '998899';
const variable2 = 'Carlos Serrano';


const uploadImage = async () => {
  const formData = new FormData();
  formData.append('file', fs.createReadStream(imagePath));
  formData.append('messaging_product', 'whatsapp'); 

  const url = `https://graph.facebook.com/v15.0/${botId}/media`;

  const postReq = {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${bearerToken}`,
    },
    body: formData,
  };

  try {
    const response = await fetch(url, postReq);
    const data = await response.json();

    if (data.id) {
      console.log('Image ID:', data.id);
      await sendMessage(data.id); 
      x = data.id
    } else {
      console.error('Error al subir la imagen:', data);
    }
  } catch (error) {
    console.error('Error:', error);
  }
};


const sendMessage = async (imageId) => {
  const messageData = {
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
              text: variable1,
            },
            {
              type: 'text',
              text: variable2,
            },
          ],
        },
      ],
    },
  };

  /* const messageData = {
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
              type: 'text',
              text: 'Hola Mundo xx',
            },
          ],
        },
        {
          type: 'body',
          parameters: [
            {
              type: 'text',
              text: variable1,
            },
            {
              type: 'text',
              text: variable2,
            },
          ],
        },
      ],
    },
  }; */

  const url = `https://graph.facebook.com/v15.0/${botId}/messages`;
  const messageReq = {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${bearerToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(messageData),
  };

  try {
    const response = await fetch(url, messageReq);
    const result = await response.json();

    console.log('Response from sending message:', result);
  } catch (error) {
    console.error('Error sending message:', error);
  }
};






uploadImage();


