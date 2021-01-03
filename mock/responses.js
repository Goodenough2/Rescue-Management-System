/* *
*  by 丁浩
* */
const responses = {

  // 成功
  // 2----，添加201--，删除202--，更新203--，获取204--，排序205--
  success: { code: 20000 },
  createSuccess: { code: 20100, message: '数据添加成功' },
  deleteSuccess: { code: 20200, message: '数据删除成功' },
  updateSuccess: { code: 20300, message: '数据更新成功' },
  rankSuccess: { code: 20500, message: '调整排序成功' },

  // 异常 未知的、catch的
  // 5----，添加501--，删除502--，更新503--，获取504--，排序505--
  failure: { code: 50000 },
  createFailure: { code: 50100, message: '数据添加发生错误' },
  deleteFailure: { code: 50200, message: '数据删除发生错误' },
  updateFailure: { code: 50300, message: '数据更新发生错误' },
  getDataFailure: { code: 50400, message: '数据获取发生错误' },
  rankFailure: { code: 50500, message: '调整排序发生错误' },

  // 错误 已知的
  // 4----，账户401--，未找到404--，关联405---，冲突409--
  bad: { code: 40000 },
  noToken: { code: 40100 },
  tokenIllegal: { code: 40101 },
  tokenExpired: { code: 40102 },
  loggedInOther: { code: 40105 },
  notFound: { code: 40400, message: '数据不存在' },
  updateDataNotFound: { code: 40430, message: '更新的数据不存在' },
  rankupDataIsTop: { code: 40431, message: '已到最前位置' },
  allDeleteDataNotFound: { code: 40420, message: '需要删除的数据不存在' },
  partialDeleteDataNotFound: { code: 40421, message: '操作未全部执行，某些需要删除的数据不存在' },
  dataAssociated: { code: 40500 }, // 需自定义message
  allDeleteDataAssociated: { code: 40520, message: '操作未执行，' }, // 补充message，给出详细说明，例如：message+删除的仓库类型下含有仓库数据
  partialDeleteDataAssociated: { code: 40521, message: '操作未全部执行，某些' }, // 补充message，给出详细说明，例如：message+删除的仓库类型下含有仓库数据
  deleteDataNotFoundOrAssociated: { code: 40522, message: '操作未全部执行，某些需要删除的数据不存在，另外一些' }, // 补充message，给出详细说明，例如：message+删除的仓库类型下含有仓库数据
  conflict: { code: 40900 }, // 需自定义message
  createConflict: { code: 40910 }, // 需自定义message，例如：已存在同名的仓库类型
  updateConflict: { code: 40930 } // 需自定义message，例如：已存在同名的仓库类型
}

export default responses
