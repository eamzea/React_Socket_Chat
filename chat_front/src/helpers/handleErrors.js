import { renderAlert } from './alerts';

const handleErrors = data => {
  const msgs = [];
  for (let key of Object.keys(data.errors)) {
    msgs.push(data.errors[key]?.msg ? data.errors[key]?.msg : data.errors[key]);
  }

  return renderAlert(msgs);
};

export default handleErrors;
