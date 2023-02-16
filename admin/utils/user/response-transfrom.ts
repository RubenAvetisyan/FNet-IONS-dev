import { $enum } from 'ts-enum-util'
import type { H3Error } from 'h3'
import { UserGroupRoleId, UserGroupRoleName } from '@/utils/enums'

export default function (response: AuthResponse[]): AuthResult | H3Error {
  try {
    const result: AuthResult = {
      id: 0,
      fullName: '',
      email: '',
      type: '',
      description: '',
      groupId: [],
    }

    // "type" is alsow in response
    response.forEach(({ roleId, description, email, fullName, groupId, id }) => {
      const userType = $enum(UserGroupRoleId).getKeyOrThrow(roleId)
      const userGroupIds = Array.isArray(groupId) ? groupId : [groupId]

      result.id = id
      result.fullName = fullName
      result.email = email
      result.type = $enum(UserGroupRoleName).getValueOrDefault(userType, '')
      result.description = `${result.description}, ${description}` ? `${description} | ` : `${$enum(UserGroupRoleName).getValueOrDefault(userType, '')}`
      result.groupId = [...result.groupId, ...userGroupIds]
    })

    return result
  }
  catch (error: any) {
    return createError(error.masssage || 'error in transform fn')
  }
}
