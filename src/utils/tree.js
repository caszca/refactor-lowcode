export function getTree(treeName, disableAll) {
  if (!disableAll) {
    disableAll = false
  }
  switch (treeName) {
    case 'projectTree':
      return [{
        id: 1,
        label: '与专业培养目标的一致性',
        disabled: disableAll,
        children: [{
          id: 5,
          disabled: disableAll,
          label: '能体现专业基础理论、基本技术，工程原理在特定领域中的应用'
        }, {
          id: 6,
          disabled: disableAll,
          label: '符合专业既定培养目标的要求'
        }]
      }, {
        id: 2,
        disabled: disableAll,
        label: '体现复杂工程问题特征的设计型课题',
        children: [{
          id: 7,
          disabled: disableAll,
          label: '课题的能力培养和深度必须能体现复杂工程问题的特征',
          children: [
            {
              id: 11,
              disabled: disableAll,
              label: '必须运用深入的工程原理，经过分析才可能得到解决'
            }, {
              id: 12,
              disabled: disableAll,
              label: '涉及多方面技术、工程和其它因素，并可能相互有一定冲突'
            }, {
              id: 13,
              disabled: disableAll,
              label: '需要通过建立合适的抽象模型才能解决，在建模过程中需要体现出创造性'
            }, {
              id: 14,
              disabled: disableAll,
              label: '不是仅靠常用方法就可以完全解决的'
            }, {
              id: 15,
              disabled: disableAll,
              label: '问题中涉及的因素可能没有完全包含在专业工程实践的标准和规范中'
            }, {
              id: 16,
              disabled: disableAll,
              label: '问题相关各方的利益不完全一致'
            }, {
              id: 17,
              disabled: disableAll,
              label: '具有较高的综合性，包含多个相互关联的子问题'
            }
          ]
        }, {
          id: 8,
          disabled: disableAll,
          label: '课题的工程和技术性训练'
        }, {
          id: 9,
          disabled: disableAll,
          label: '课题中新技术运用'
        }, {
          id: 10,
          disabled: disableAll,
          label: '创新意识的培养'
        }]
      }, {
        id: 3,
        disabled: disableAll,
        label: '课题的真实性（课题来源与背景的真实性）'
      }, {
        id: 4,
        disabled: disableAll,
        label: '课题工作量适中'
      }]
    default:
      return []
  }
}
