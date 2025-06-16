import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { setOpenAdd, TodoSynchSlice } from './todoSynch'
import { EightMpRounded } from '@mui/icons-material'

export const getTodo = createAsyncThunk('todoAsynch/getTodo', async () => {
	try {
		let { data } = await axios.get('https://to-dos-api.softclub.tj/api/to-dos')
		return data.data
		console.log(data)
	} catch (error) {
		console.log(error)
	}
})
export const deletTodo = createAsyncThunk(
	'todoAsynch/deletTodo',
	async (id, { dispatch }) => {
		try {
			await axios.delete(`https://to-dos-api.softclub.tj/api/to-dos?id=${id}`)
			dispatch(getTodo())
		} catch (error) {
			console.log(error)
		}
	}
)
export const completeTodo = createAsyncThunk(
	'todoAsynch/completeTodo',
	async (id,{dispatch}) => {
		try {
			await axios.put(`https://to-dos-api.softclub.tj/completed?id=${id}`)
			dispatch(getTodo())
		} catch (error) {
			console.log(error);
		}
	}
)

export const AddTodo=createAsyncThunk('todoAsynch/AddTodo',async(formData,{dispatch})=>{
	try {
		await axios.post('https://to-dos-api.softclub.tj/api/to-dos',formData)
		dispatch(getTodo())
	} catch (error) {
		console.log(error);
		
	}
})

export const EditTodo=createAsyncThunk('todoAsynch/EditTodo',async (user,{dispatch}) => {
	try {
		await axios.put('https://to-dos-api.softclub.tj/api/to-dos',user)
		dispatch(getTodo())
	} catch (error) {
		console.log(error);
		
	}
})

export const TodoAsynchSlice = createSlice({
	name: 'todoAsynch',
	initialState: {
		data: [],
		openAddCat:'',
	},
	reducers: {
		setOpenAddСat:(state,action)=>{
			state.openAddCat=action.payload
		}
	},
	extraReducers: builder => {
		builder.addCase(getTodo.fulfilled, (state, action) => {
			state.data = action.payload
		})
	},
})
export default TodoAsynchSlice.reducer
export const {setOpenAddСat} = TodoAsynchSlice.actions
