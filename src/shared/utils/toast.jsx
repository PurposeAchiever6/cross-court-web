import { toast } from 'react-toastify';
import Toast from 'shared/components/Toast';

const getOptions = (options) => {
  if (typeof options == 'string') {
    return { description: options };
  }

  return options;
};

const successToast = (options) => {
  const { title, description, showIcon, ...rest } = getOptions(options);

  toast(<Toast variant="success" title={title} description={description} showIcon={showIcon} />, {
    autoClose: 4000,
    ...rest,
  });
};

const errorToast = (options) => {
  const { title, description, showIcon, ...rest } = getOptions(options);

  toast(<Toast variant="error" title={title} description={description} showIcon={showIcon} />, {
    ...rest,
  });
};

export default {
  success: successToast,
  error: errorToast,
};
