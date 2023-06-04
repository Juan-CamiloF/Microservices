export default [
    {
        label: 'Dashboard',
        path: '',
        allowedRoles: ['ROLE_ADMIN', 'ROLE_USER_CALI', 'ROLE_USER_BOGOTA', 'ROLE_USER_MEDELLIN'],
    },
    {
        label: 'Bogotá',
        path: 'ciudad/bogota',
        allowedRoles: ['ROLE_ADMIN', 'ROLE_ADMIN_BOGOTA'],
    },
    {
        label: 'Medellín',
        path: 'ciudad/medellin',
        allowedRoles: ['ROLE_ADMIN', 'ROLE_ADMIN_MEDELLIN'],
    },
    {
        label: 'Cali',
        path: 'ciudad/cali',
        allowedRoles: ['ROLE_ADMIN', 'ROLE_ADMIN_CALI'],
    }
];