import axios from "axios";

/**
 *
 * Get bases server url
 *
 * @param {String} record - base server url
 * @returns {Array} Array of the bases server urls
 *
 */
const resolve_srv = async (record) => {
  const response = await axios.get(`https://cloudflare-dns.com/dns-query?name=${record}&type=SRV`, {
    headers: {
      'Accept': 'application/dns-json'
    }
  });

  return response.data.Answer || [];
}

/**
 * Get a list of base urls of all available radio-browser servers
 * Returns: array of strings - base urls of radio-browser servers
 *
 */
const get_server_urls = async () => {
  return resolve_srv("_api._tcp.radio-browser.info").then(hosts => {
    hosts.sort();
    return hosts.map(host => "https://" + host.data.split(" ")[3]);
  });
}

/**
 *
 * Get the base server url
 *
 * @returns {Promise<string>} returns a promise with the server url
 *
 */
export const get_server_base_url = async () => {
  const urls_list = await get_server_urls();
  return new Promise(async (resolve, reject) => {
    try {
      const responses = await Promise.all(
        urls_list.map(url => axios.get(`${url}/json/stats`))
      );
      for (let i = 0; i < responses.length; i++) {
        const response = responses[i];
        if (response.data.status === 'OK') {
          resolve(urls_list[i]);
          return;
        }
      }
      resolve(null);
    } catch (error) {
      reject(error);
    }
  });
}
