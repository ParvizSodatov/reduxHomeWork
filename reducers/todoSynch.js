import { createSlice } from '@reduxjs/toolkit'

export const TodoSynchSlice = createSlice({
	name: 'todoSynch',
	initialState: {
		data: [
			{
				id: '1',
				name: 'Parviz',
				age: '20',
				status: false,
			},
			{
				id: '2',
				name: 'Aziz',
				age: '22',
				status: true,
			},
			{
				id: '3',
				name: 'Imron',
				age: '24',
				status: false,
			},
		],
		addName:'',
		addAge:'',
		addStatus:false,
		openAdd:false,
		editName:'',
		editAge:'',
		editStatus:false,
		openEdit:false,
		idx:null,
	},
	reducers: {
		deletUser: (state, action) =>{
	
	
			(state.data = state.data.filter(el => el.id != action.payload))},
			setAddName:(state,action)=>{
				state.addName=action.payload
			},
			setAddAge:(state,action)=>{
				state.addAge=action.payload
			},
			setAddStatus:(state,action)=>{
				state.addStatus=action.payload
			},
			setOpenAdd:(state,action)=>{
				state.openAdd=action.payload
			},
			addUser:(state,action)=>{
				state.data.push(action.payload)
			},




			setEditName:(state,action)=>{
				state.editName=action.payload
			},
			setEditAge:(state,action)=>{
				state.editAge=action.payload
			},
			setEditStatus:(state,action)=>{
				state.editStatus=action.payload
			},
			setOpenEdit:(state,action)=>{
				state.openEdit=action.payload
			},
			setIdx:(state,action)=>{
				state.idx=action.payload
			},
			editUser:(state,action)=>{
				state.data=state.data.map(el=>el.id==action.payload.id?action.payload:el)
			}

	},
})
export default TodoSynchSlice.reducer
export const { deletUser,setAddAge,setAddStatus,setAddName,setOpenAdd,addUser,setEditAge,setEditStatus,setEditName,setOpenEdit,editUser,setIdx } = TodoSynchSlice.actions
