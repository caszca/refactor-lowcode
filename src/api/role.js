import request from '@/utils/request'
export default {
  getRolePermissions,
  editRolePermission,
  getRoleMenuField,
  getInfos
}
function getRolePermissions(roleId) {
  return request({
    url: '/role/getRolePermissions',
    method: 'post',
    data: { roleId }
  })
}

function editRolePermission(roleId, permissions) {
  return request({
    url: '/role/editRolePermissions',
    method: 'post',
    data: { roleId, permissions }
  })
}

function getRoleMenuField(roleId) {
  return request.get(`/role/getRoleMenuField?roleId=${roleId}`)
}

function getInfos(id) {
  return request.get(`/student/get-user-info/${id}`)
}
