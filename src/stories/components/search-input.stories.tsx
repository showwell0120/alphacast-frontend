import type { Meta } from '@storybook/react';

import SearchInput from '../../components/search-input';

const Story: Meta<typeof SearchInput> = {
  component: SearchInput,
  title: 'SearchInput',
};
export default Story;

export const Default = {
  args: {},
};
