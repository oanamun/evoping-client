import { RECEIVEDCHECK } from 'modules/device/stores/deviceStore';
import store from 'store/store';

export default function generateResponse() {
  const timeStamp = 5000;
  const limitTime = 100;
  const nrChecks = 10;

  setInterval(() => {
    const myDate = new Date().toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, '$1');
    store.dispatch({
      type: RECEIVEDCHECK,
      payload: {
        label: myDate,
        data: generateData(nrChecks, limitTime),
      },
    });
  }, timeStamp);
}

function generateData(nrChecks, limit) {
  const data = [];
  for (let i = 1; i <= nrChecks; i = i + 1) {
    data.push({
      check_id: i,
      checkName: `Check ${i}`,
      responseMS: Math.floor(Math.random() * limit) + 1,
    });
  }
  return data;
}

generateResponse();
