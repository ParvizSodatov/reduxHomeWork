import { useDispatch, useSelector } from 'react-redux'
import './App.css'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import {
	addUser,
	deletUser,
	editUser,
	setAddAge,
	setAddName,
	setAddStatus,
	setEditAge,
	setEditName,
	setEditStatus,
	setIdx,
	setOpenAdd,
	setOpenEdit,
} from '../reducers/todoSynch'
export default function App() {
	const {
		data,
		addName,
		addAge,
		addStatus,
		openAdd,
		editName,
		editAge,
		editStatus,
		openEdit,
		idx,
	} = useSelector(({ todoSynch }) => todoSynch)
	const dispatch = useDispatch()
	const handleAddClickOpen = () => {
		dispatch(setOpenAdd(true))
	}
	const handleAddClose = () => {
		dispatch(setOpenAdd(false))
	}
	const handleEditClickOpen = el => {
		dispatch(setOpenEdit(true))
		dispatch(setIdx(el.id))
		dispatch(setEditName(el.name))
		dispatch(setEditAge(el.age))
		dispatch(setEditStatus(el.status))
	}
	const handleEditClose = () => {
		dispatch(setOpenEdit(false))
	}
	const handleEdit = () => {
		let newEditUser = {
			id: idx,
			name: editName,
			age: editAge,
			status: editStatus,
		}
		dispatch(editUser(newEditUser))
		dispatch(setEditName(''))
		dispatch(setEditAge(''))
		dispatch(setEditStatus(''))
		dispatch(setOpenEdit(false))
	}

	function handleAdd() {
		let newAddUser = {
			id: Date.now(),
			name: addName,
			age: addAge,
			status: addStatus,
		}
		dispatch(addUser(newAddUser))
	}
	return (
		<>
			<div
				style={{
					display: 'flex',
					justifyContent: 'space-around',
					alignItems: 'center',
				}}
			>
				<h1>SynchRedux</h1>
				<Button variant='outlined' onClick={handleAddClickOpen}>
					+Add User
				</Button>
			</div>
			<table style={{ marginTop: '100px' }}>
				<thead>
					<tr>
						<th>id</th>
						<th>name</th>
						<th>age</th>
						<th>status</th>
						<th>action</th>
					</tr>
				</thead>
				<tbody>
					{data.map(el => (
						<tr key={el.id}>
							<td>{el.id}</td>
							<td>{el.name}</td>
							<td>{el.age}</td>
							<td>
								<span
									style={{
										backgroundColor: el.status ? 'green' : 'red',
										color: 'white',
										padding: '5px 10px',
									}}
								>
									{el.status == true ? 'Active' : 'Inactive'}
								</span>
							</td>
							<td>
								<div
									style={{
										display: 'flex',
										justifyContent: 'center',
										gap: '10px',
									}}
								>
									<button
										style={{
											backgroundColor: 'red',
											color: 'white',
											padding: '5px 15px',
										}}
										onClick={() => dispatch(deletUser(el.id))}
									>
										Delete
									</button>
									<button
										style={{
											backgroundColor: 'blue',
											color: 'white',
											padding: '5px 15px',
										}}
										onClick={() => handleEditClickOpen(el)}
									>
										Edit
									</button>
								</div>
							</td>
						</tr>
					))}
				</tbody>
			</table>
			{/* addModal */}
			<Dialog
				open={openAdd}
				onClose={handleAddClose}
				slotProps={{
					paper: {
						component: 'form',
						onSubmit: event => {
							event.preventDefault()
							const formData = new FormData(event.currentTarget)
							const formJson = Object.fromEntries(formData.entries())
							const email = formJson.email
							console.log(email)
							handleAddClose()
						},
					},
				}}
			>
				<DialogTitle>Subscribe</DialogTitle>
				<DialogContent>
					<DialogContentText>
						To subscribe to this website, please enter your email address here.
						We will send updates occasionally.
					</DialogContentText>
					<TextField
						autoFocus
						required
						margin='dense'
						id='name'
						name='email'
						label='Add Name '
						type='text'
						value={addName}
						onChange={e => dispatch(setAddName(e.target.value))}
						fullWidth
						variant='standard'
					/>
					<TextField
						autoFocus
						required
						margin='dense'
						id='name'
						name='email'
						label='Add Age '
						type='text'
						value={addAge}
						onChange={e => dispatch(setAddAge(e.target.value))}
						fullWidth
						variant='standard'
					/>
					<select
						name='
          '
						id=''
						value={addStatus}
						onChange={e => dispatch(setAddStatus(e.target.value === 'true'))}
					>
						<option value='false'>Inactive</option>
						<option value='true'>Active</option>
					</select>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleAddClose}>Cancel</Button>
					<Button type='submit' onClick={handleAdd}>
						Subscribe
					</Button>
				</DialogActions>
			</Dialog>

			{/* editModal */}
			<Dialog
				open={openEdit}
				onClose={handleEditClose}
				slotProps={{
					paper: {
						component: 'form',
						onSubmit: event => {
							event.preventDefault()
							const formData = new FormData(event.currentTarget)
							const formJson = Object.fromEntries(formData.entries())
							const email = formJson.email
							console.log(email)
							handleEditClose()
						},
					},
				}}
			>
				<DialogTitle>Subscribe</DialogTitle>
				<DialogContent>
					<DialogContentText>
						To subscribe to this website, please enter your email address here.
						We will send updates occasionally.
					</DialogContentText>
					<TextField
						autoFocus
						required
						margin='dense'
						id='name'
						name='email'
						label='Add Name '
						type='text'
						value={editName}
						onChange={e => dispatch(setEditName(e.target.value))}
						fullWidth
						variant='standard'
					/>
					<TextField
						autoFocus
						required
						margin='dense'
						id='name'
						name='email'
						label='Add Age '
						type='text'
						value={editAge}
						onChange={e => dispatch(setEditAge(e.target.value))}
						fullWidth
						variant='standard'
					/>
					<select
						name='
          '
						id=''
						value={editStatus}
						onChange={e => dispatch(setEditStatus(e.target.value === 'true'))}
					>
						<option value='false'>Inactive</option>
						<option value='true'>Active</option>
					</select>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleEditClose}>Cancel</Button>
					<Button type='submit' onClick={handleEdit}>
						Subscribe
					</Button>
				</DialogActions>
			</Dialog>
		</>
	)
}
