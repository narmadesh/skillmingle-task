import { apiSlice } from './apiSlice';
const API_URL = '/api/teams';

export const teamsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    list: builder.mutation({
      query: () => ({
        url: `${API_URL}`,
        method: 'GET',
      }),
    }),
    detail: builder.mutation({
      query: (id) => ({
        url: `${API_URL}/${id}`,
        method: 'GET',
      }),
    }),
    create: builder.mutation({
      query: (data) => ({
        url: `${API_URL}`,
        method: 'POST',
        body: data,
      }),
    }),
    update: builder.mutation({
      query: (data) => ({
        url: `${API_URL}`,
        method: 'PUT',
        body: data,
      }),
    }),
    delete: builder.mutation({
      query: (data) => ({
        url: `${API_URL}`,
        method: 'DELETE',
        body: data,
      }),
    }),
  }),
});

export const {
  useListMutation,
  useDetailMutation,
  useCreateMutation,
  useUpdateMutation,
  useDeleteMutation,
} = teamsApiSlice;
