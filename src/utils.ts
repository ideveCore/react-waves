import axios from "axios";

interface SrvResponse {
  TTL: number;
  data: string;
  name: string;
  type: number;
}

const resolve_srv = async (record: string): Promise<Array<SrvResponse>> => {
  const response = await axios.get(
    `https://cloudflare-dns.com/dns-query?name=${record}&type=SRV`,
    {
      headers: {
        Accept: "application/dns-json",
      },
    },
  );
  return response.data.Answer || [];
};

const get_server_urls = async (): Promise<Array<string>> => {
  return await resolve_srv("_api._tcp.radio-browser.info").then((hosts) => {
    hosts.sort();
    return hosts.map((host) => "https://" + host.data.split(" ")[3]);
  });
};

export const get_server_base_url = async (): Promise<string> => {
  const urls_list = await get_server_urls();
  return new Promise(async (resolve, reject) => {
    try {
      const responses = await Promise.all(
        urls_list.map((url: string) => axios.get(`${url}/json/stats`)),
      );
      for (let i = 0; i < responses.length; i++) {
        const response = responses[i];
        if (response.data.status === "OK") {
          resolve(urls_list[i]);
          return;
        }
      }
      throw new Error("Erro ao buscar radios!");
    } catch (error) {
      reject(error);
    }
  });
};
