const fetch = require('node-fetch');
require('dotenv').config();
const crypto = require('crypto');
const { parse, isValid } = require('date-fns');

/**
 * Estas variables son las variables de entorno
 */

const pageId = process.env.PAGE_ID;
const access_token = process.env.ACCESS_TOKEN;
const app_secret = process.env.APP_SECRET;
const system_user_id = process.env.SYSTEM_USER_ID;
const business_app = process.env.BUSSINES_ID;

//const message = 'Hola desde Node.js usando la API de Facebook v20!';
const message = 'Hola desde Node.js usando la API de Facebook v20!, espero esta publicacion a las 12';
/**
 * Esta funcion nos ayuda a crear un token para utilizarlo 60 dias
 * 
 */

function CrearToken60días(){
    
    const appsecret_proof = crypto
    .createHmac('sha256', app_secret)
    .update(access_token)
    .digest('hex');

    console.log('App Secret Proof:', appsecret_proof);

    const access_token_request = new URLSearchParams();
    access_token_request.append('business_app', business_app);
    access_token_request.append('scope', 'email, manage_fundraisers, read_insights, publish_video, catalog_management, pages_manage_cta, pages_manage_instant_articles, pages_show_list, ads_management, ads_read, business_management, pages_messaging, pages_messaging_subscriptions, instagram_basic, instagram_manage_comments, instagram_manage_insights, instagram_content_publish, leads_retrieval, instagram_manage_messages, page_events, commerce_account_manage_orders, pages_read_engagement, pages_manage_metadata, pages_read_user_content, pages_manage_ads, pages_manage_posts, pages_manage_engagement, instagram_branded_content_brand, instagram_branded_content_creator, instagram_branded_content_ads_brand, instagram_manage_events, manage_app_solution');
    access_token_request.append('set_token_expires_in_60_days', 'true');
    access_token_request.append('appsecret_proof', appsecret_proof);
    access_token_request.append('access_token', access_token);

    
    fetch(`https://graph.facebook.com/v12.0/${system_user_id}/access_tokens`, {
        method: 'POST',
        body: access_token_request,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Respuesta:', data);
      })
      .catch(error => {
        console.error('Error al hacer la solicitud:', error.message);
      });
}

/**
 * Esta funcion nos crea un pagestoken para poder utilizarlo en el servicio para realizar posts en facebook
 */


let pages_token = null;

async function getPagesToken(){

  try {
    const response = await fetch(`https://graph.facebook.com/v21.0/me/accounts?access_token=${access_token}`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    pages_token = data.data[0].access_token;
  } catch (error) {
    console.error('Error al hacer la solicitud:', error.message);
  }

}

/**
 * Esta funcion es para realizar las publicaciones
 */

async function postToFacebookPage() {

    const url = `https://graph.facebook.com/v20.0/${pageId}/feed`;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                message: message,
                link: '',
                published: false,
                scheduled_publish_time:'1727974800',
                access_token: pages_token
            })
        });

        const data = await response.json();
        if (response.ok) {
            console.log('Publicación realizada exitosamente:', data);
        } else {

            console.error('Error al realizar la publicación:', data.error);
        
        }
    } catch (error) {
        console.error('Error en la solicitud:', error);
    }

}


function strtotime(datetime, baseTimestamp = null) {
  const baseDate = baseTimestamp ? new Date(baseTimestamp * 1000) : new Date();
  

  const date = parse(datetime, 'yyyy-MM-dd HH:mm:ss', baseDate);


  if (!isValid(date)) {
    return false; 
  }

  
  return Math.floor(date.getTime() / 1000);
}


const timestamp = strtotime("2024-10-03 12:00:00");
console.log(timestamp);

getPagesToken().then(()=>{
  postToFacebookPage();

})


