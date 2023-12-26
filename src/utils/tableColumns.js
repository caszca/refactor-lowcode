// 几种最常用的tableColumns
// id, showName, theOrder, columnName 必选
// firstVisible：默认true； sortable：默认false； width：默认200
export function getTableColumns(tableName, type) {
  switch (tableName) {
    default:
      return [
        { id: 1, showName: '编码', theOrder: 1, columnName: 'code', width: 150 },
        { id: 2, showName: '名称', theOrder: 2, columnName: 'name', width: 250 },
        { id: 3, showName: '备注', theOrder: 3, columnName: 'remarks' }
      ]
  }
}
