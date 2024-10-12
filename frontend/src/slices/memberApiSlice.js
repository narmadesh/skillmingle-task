import { apiSlice } from './apiSlice';
const API_URL = '/api/members';

export const memberApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    listMember: builder.mutation({
      query: (id) => ({
        url: `${API_URL}/teams/${id}`,
        method: 'GET',
      }),
    }),
    detailMember: builder.mutation({
      query: (id) => ({
        url: `${API_URL}/${id}`,
        method: 'GET',
      }),
    }),
    createMember: builder.mutation({
      query: (data) => ({
        url: `${API_URL}`,
        method: 'POST',
        body: data,
      }),
    }),
    updateMember: builder.mutation({
      query: (data) => ({
        url: `${API_URL}`,
        method: 'PUT',
        body: data,
      }),
    }),
    deleteMember: builder.mutation({
      query: (data) => ({
        url: `${API_URL}`,
        method: 'DELETE',
        body: data,
      }),
    }),
  }),
});

export const {
  useListMemberMutation,
  useDetailMemberMutation,
  useCreateMemberMutation,
  useUpdateMemberMutation,
  useDeleteMemberMutation,
} = memberApiSlice;
