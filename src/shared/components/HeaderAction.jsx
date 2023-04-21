import React from 'react';
import PropTypes from 'prop-types';

import HeaderLayout from 'shared/components/layout/HeaderLayout';
import Button from 'shared/components/Button';
import Link from 'shared/components/Link';

const HeaderAction = ({
  confirmText,
  onConfirm,
  confirmVariant,
  confirmId,
  confirmLoading,
  cancelText,
  onCancel,
  cancelVariant,
}) => (
  <HeaderLayout>
    <div className="flex items-center">
      <Link variant={cancelVariant} onClick={onCancel} className="text-sm mr-3 sm:mr-6">
        {cancelText}
      </Link>
      <Button
        id={confirmId}
        size="sm"
        variant={confirmVariant}
        loading={confirmLoading}
        onClick={onConfirm}
      >
        {confirmText}
      </Button>
    </div>
  </HeaderLayout>
);

HeaderAction.defaultProps = {
  confirmText: 'Confirm',
  confirmVariant: 'purple',
  confirmId: null,
  confirmLoading: false,
  cancelText: 'Cancel',
  cancelVariant: 'white-opacity',
};

HeaderAction.propTypes = {
  confirmText: PropTypes.string,
  onConfirm: PropTypes.func.isRequired,
  confirmVariant: PropTypes.string,
  confirmId: PropTypes.string,
  confirmLoading: PropTypes.bool,
  cancelText: PropTypes.string,
  onCancel: PropTypes.func.isRequired,
  cancelVariant: PropTypes.string,
};

export default HeaderAction;
