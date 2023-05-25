export const ENDPOINTS = {
  SERVICES: '/api/services-template',
  SERVICES_BY_ROLE: '/api/services-template/roles',
  // need to update from backend
  ASSIGN_FORM_IN_SERVICE: '/api/services-template/:serviceId/forms/:formId',
  ROLES: '/api/roles',
  ACCESS_RIGHTS: '/api/access-rights',
  FORM: '/api/forms-template',
};

export const TYPES = [
  {
    label: 'Text',
    key: 'TEXT',
  },
  {
    label: 'Number',
    key: 'NUMBER',
  },
  {
    label: 'Date',
    key: 'DATE',
  },
  {
    label: 'Dropdown',
    key: 'DROPDOWN',
  },
  {
    label: 'Checkbox',
    key: 'CHECKBOX',
  },
  {
    label: 'Radio',
    key: 'RADIO',
  },
];
