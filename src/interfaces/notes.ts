export interface ItemNote {
  item: INotes
}

export interface INotes {
  id: number;
  title: string;
  desc: string;
  timestamp: string;
}

export interface NotesState {
  listofnotes: INotes[];
  loading: boolean
}
