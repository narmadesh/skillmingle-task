import { apiSlice } from './apiSlice';
const API_URL = '/api/todos';

export const todoApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    listTodo: builder.mutation({
      query: (id) => ({
        url: `${API_URL}`,
        method: 'GET',
      }),
    }),
    detailTodo: builder.mutation({
      query: (id) => ({
        url: `${API_URL}/${id}`,
        method: 'GET',
      }),
    }),
    createTodo: builder.mutation({
      query: (data) => ({
        url: `${API_URL}`,
        method: 'POST',
        body: data,
      }),
    }),
    updateTodo: builder.mutation({
      query: (data) => ({
        url: `${API_URL}`,
        method: 'PUT',
        body: data,
      }),
    }),
    deleteTodo: builder.mutation({
      query: (data) => ({
        url: `${API_URL}`,
        method: 'DELETE',
        body: data,
      }),
    }),
  }),
});

export const {
  useListTodoMutation,
  useDetailTodoMutation,
  useCreateTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
} = todoApiSlice;
