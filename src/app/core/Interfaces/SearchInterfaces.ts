export interface SearchQuery{
  search: SearchBarData;
  pagination: PaginationInfo;
}
export interface SearchBarData{
  query: string;
  filters: Filters;
}
export interface Filters{
  state?: string;
  type?: string;
  orderBy?: string;
  orderDirection?: 'asc' | 'desc';
}
export interface PaginationInfo{
  page: number;
  limit: number;
}
export interface FilterOption {
  label: string;
  value: string;
}
