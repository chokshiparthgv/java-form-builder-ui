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
    icon: 'text_fields'
  },
  {
    label: 'Number',
    key: 'NUMBER',
    icon: 'format_list_numbered'
  },
  {
    label: 'Date',
    key: 'DATE',
    icon: 'date_range'
  },
  {
    label: 'Dropdown',
    key: 'DROPDOWN',
    icon: 'arrow_drop_down_circle'
  },
  {
    label: 'Checkbox',
    key: 'CHECKBOX',
    icon: 'check_box'
  },
  {
    label: 'Radio',
    key: 'RADIO',
    icon: 'radio_button_checked'
  },
];
