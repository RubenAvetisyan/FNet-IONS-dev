import { $enum } from "ts-enum-util"
import { UserGroupRoleId, UserGroupRoleName } from '@/utils/enums'

export default function (response: AuthResponse[]) {
    try {
        const result: AuthResult = {
            id: 0,
            fullName: '',
            email: '',
            type: '',
            description: '',
            groupId: [],
        }

        response.forEach(({ roleId, description, email, fullName, groupId, id, type }) => {
            const userType = $enum(UserGroupRoleId).getKeyOrThrow(roleId)
            console.log('userType: ', userType);
            result.id = id
            result.fullName = fullName
            result.email = email
            result.type = $enum(UserGroupRoleName).getValueOrDefault(userType, '')
            result.description = description ? description + ' | ' : '' + type
            result.groupId.push(groupId as number)
        })

        console.log('result: ', result);
        return result
    } catch (error) {
        return error
    }
}