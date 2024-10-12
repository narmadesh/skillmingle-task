import { apiSlice } from './apiSlice';
const API_URL = '/api/documents';

export const documentApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    listDocuments: builder.mutation({
      query: (id) => ({
        url: `${API_URL}`,
        method: 'GET',
      }),
    }),
   
    createDocument: builder.mutation({
      query: (data) => ({
        url: `${API_URL}`,
        method: 'POST',
        body: data,
      }),
    }),
    
    deleteDocument: builder.mutation({
      query: (data) => ({
        url: `${API_URL}`,
        method: 'DELETE',
        body: data,
      }),
    }),
  }),
});

export const {
  useListDocumentsMutation,
  useCreateDocumentMutation,
  useDeleteDocumentMutation,
} = documentApiSlice;
