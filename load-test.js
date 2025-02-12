import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
  vus: 10000,  // Virtual Users
  duration: '30s',  // Test duration
};

export default function () {
  http.get('http://localhost:4000');  // Change URL for Fastify/Express
  sleep(1);
}
