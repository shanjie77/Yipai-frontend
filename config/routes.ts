export default [
  { name:'主页',path: '/', icon: 'smile', component: './Index' },
  {path:'/interface_info/:id',name:'查看接口,',icon: 'smile',component: './InterfaceInfo',hideInMenu:true},
  { name:'登录',path: '/user', layout: false, routes: [{ path: '/user/login', component: './User/Login' }] },
  { name:'注册',path: '/user', layout: false, routes: [{ path: '/user/register', component: './User/Register' }] },

  {
    path: '/admin',
    icon: 'crown',
    access: 'canAdmin',
    name:'管理员页面',
    routes: [
      { icon: 'table', path: '/admin/interface_info', component: './Admin/InterfaceInfo',name:'接口管理', },
      { icon: 'analysis', path: '/admin/interface_analysis', component: './Admin/InterfaceAnalysis',name:'接口分析', },
  //    { path: '/admin', redirect: '/admin/sub-page' },
  //    { path: '/admin/sub-page', component: './Admin' },
    ],
 },

 // { path: '/', redirect: '/welcome' },
  { path: '*', layout: false, component: './404' },
];
