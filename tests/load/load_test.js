import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '30s', target: 50 },  // Rampa de subida a 50 usuarios
    { duration: '1m', target: 50 },   // Mantener estrÃ©s
    { duration: '30s', target: 0 },   // Rampa de bajada
  ],
  thresholds: {
    http_req_duration: ['p(95)<500'], // 95% de peticiones bajo 500ms
    http_req_failed: ['rate<0.01'],   // Tasa de error menor al 1%
  },
};

export default function () {
  const res = http.get('http://localhost:8080/');
  check(res, { 'status was 200': (r) => r.status == 200 });
  sleep(1);
}