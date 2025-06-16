import { configureStore } from '@reduxjs/toolkit'
import  TodoSynchSlice from '../../reducers/todoSynch'
import  TodoAsynchSlice  from '../../reducers/todoAsynch'

export const store=configureStore({
	reducer:{
		todoSynch:TodoSynchSlice,
    todoAsynch:TodoAsynchSlice,
	}
	
})