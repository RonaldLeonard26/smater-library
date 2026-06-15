const LISTS_LIMIT = [
  { label: '10', value: '10' },
  { label: '14', value: '14' },
  { label: '18', value: '18' },
];

const LIMIT_DEFAULT = LISTS_LIMIT[0].value;

const PAGE_DEFAULT = 0;

const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png'];
const MAX_FILE_SIZE = 2000000; //2MB

export {
  LISTS_LIMIT,
  LIMIT_DEFAULT,
  PAGE_DEFAULT,
  ACCEPTED_IMAGE_TYPES,
  MAX_FILE_SIZE,
};
