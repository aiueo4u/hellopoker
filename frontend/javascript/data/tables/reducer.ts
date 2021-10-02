type Action = {
  type: string;
  tableId: number;
  tables: any[]; // TODO
};

export type TablesState = {
  isPrepared: boolean;
  isTableCreated: boolean;
  tableId: number | undefined;
  tables: readonly any[]; // TODO
};

const initialState: TablesState = {
  isPrepared: false,
  isTableCreated: false,
  tableId: undefined,
  tables: [],
} as const;

export const tables = (state: TablesState = initialState, action: Action): TablesState => {
  switch (action.type) {
    case 'CLEAR_TABLE_FORM':
      return initialState;
    case 'CREATE_TABLE_FORM_ON_SUCCESS':
      return {
        ...state,
        tableId: action.tableId,
        isTableCreated: true,
      };
    case 'LOADING_TABLES_DATA':
      return Object.assign({}, state, { isPrepared: false });
    case 'LOADING_TABLES_DATA_ON_SUCCESS':
      return {
        ...state,
        isPrepared: true,
        tables: action.tables,
      };
    default:
      return state;
  }
};
