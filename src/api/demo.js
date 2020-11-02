import request from '@/utils/requestNew'
import Qs from 'Qs'

export function getTenantId(query) {
  return request({
    url: `/UserPermission/GetTenantId?tenantId=${query}`,
    method: 'get',
    data: Qs.stringify(query),
    headers: {
      'Authorization': 'Bearer 536b589e-6e61-42e9-b15a-014f0041d672'
    }
  })
}
