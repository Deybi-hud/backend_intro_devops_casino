import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '30s', target: 50 },
    { duration: '1m', target: 50 },
    { duration: '30s', target: 0 },
  ],
  thresholds: {
    http_req_duration: ['p(95)<500'],
    http_req_failed: ['rate<0.01'],
  },
};

export default function () {
  const res = http.get('http://a1723d010bdf949b5add817e3279197e-2015793512.us-east-1.elb.amazonaws.com/');
  check(res, { 'status was 200': (r) => r.status == 200 });
  sleep(1);
}