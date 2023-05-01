import { toast } from 'react-toastify';
import Toast from 'shared/components/Toast';

const getOptions = (options) => {
  if (Array.isArray(options)) {
    if (options.length === 1) {
      return { description: options[0] };
    }

    return {
      description: options.map((text, index) => (
        <div
          key={index}
          className={`flex items-start ml-1 ${index + 1 < options.length ? 'mb-2' : ''}`}
        >
          <span className="inline-block w-2 h-2 shrink-0 bg-black rounded-full mt-2 mr-2" />
          {text}
        </div>
      )),
    };
  }

  if (typeof options == 'string') {
    return { description: options };
  }

  return options;
};

const successToast = (options) => {
  const { title, description, showIcon, ...rest } = getOptions(options);

  toast(<Toast variant="success" title={title} description={description} showIcon={showIcon} />, {
    autoClose: 6000,
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
