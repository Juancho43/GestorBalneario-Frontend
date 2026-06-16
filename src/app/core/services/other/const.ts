import {SearchQuery} from '../../Interfaces/SearchInterfaces';

export const emptySearchQuery : SearchQuery = {
  pagination: {
    limit: 10,
    page:0,
  },
  search:{
    query: '',
    filters:{
      type: '',
      orderDirection:'asc',
      state:'All',
      orderBy:'created_at'
    }
  }
}
