import type { Meta } from '@storybook/react';

import { NoDataView } from '../../components/no-data-view';

const Story: Meta<typeof NoDataView> = {
  component: NoDataView,
  title: 'NoDataView',
};
export default Story;

export const Default = {
  args: {
    type: 'show',
    onClick: () => {
      //
    },
  },
};
