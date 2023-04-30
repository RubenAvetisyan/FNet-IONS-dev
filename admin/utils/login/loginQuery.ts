import knex from 'knex';

export const queryBuilder = (user: string, password: string) => {
  const query = knex({
    client: 'mysql',
    connection: {
      host: '127.0.0.1',
      user: 'your_database_user',
      password: 'your_database_password',
      database: 'myapp_test'
    }
  }).select(
    'user.id as id',
    'user.title as fullName',
    'ps_title.title as role',
    'ps_title.id as roleId',
    'user.description as description',
    'user.email as email',
    'gr.group_id as groupId',
    'gr_title.title as type'
  ).from('erp.user as user')
    .innerJoin('erp.user_group as gr', 'user.id', 'gr.user_id')
    .innerJoin('erp.user_group_title as gr_title', 'gr.group_id', 'gr_title.id')
    .innerJoin('erp.user_group_permset as ps', 'ps.group_id', 'gr.group_id')
    .innerJoin('erp.user_permset_title as ps_title', 'ps_title.id', 'ps.permset_id')
    .where('user.login', user)
    .andWhere('password', password)
    .andWhere('erp.user.status', 0)
    .andWhereNot('gr.group_id', 19)
    .andWhereNot('gr.group_id', 25)
    .andWhereNot('ps_title.id', 3)
    .andWhereNot('ps_title.id', 4)
    .andWhere((qb) => {
      qb.where('user.title', 'not like', '%#%')
        .orWhere('user.title', 'not like', '%test%')
        .orWhere('user.title', 'not like', '%Test%')
        .orWhere('user.title', 'not like', '%Тест%')
        .orWhere('user.title', 'not like', '%тест%')
        .orWhere('user.description', 'not like', '%уфанет%')
        .orWhere('user.description', 'not like', '%Уфанет%')
        .orWhere('user.description', 'not like', '%ufanet%')
        .orWhere('user.description', 'not like', '%Ufanet%')
        .orWhere('user.description', 'not like', '%Авантис%')
        .orWhere('user.description', 'not like', '%авантис%');
    }).groupBy('user.id');

  const queryString = query.toQuery();

  return queryString
}
