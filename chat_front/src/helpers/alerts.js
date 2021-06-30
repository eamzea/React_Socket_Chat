import Swal from 'sweetalert2';

const renderAlert = errors => {
  const msgs = errors.map(error => `<p>- ${error}</p>`);

  Swal.fire({
    title: 'Error',
    html: `<p>Please verify solve this errors :</p> ${msgs.join('')}`,
    icon: 'error',
  });

  return false;
};

export { renderAlert };
