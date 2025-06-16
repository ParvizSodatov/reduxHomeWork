import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import {
	AddTodo,
	completeTodo,
	deletTodo,
	EditTodo,
	getTodo,
	setOpenAddСat,
} from '../reducers/todoAsynch'
import BackspaceIcon from '@mui/icons-material/Backspace'
import EditNoteIcon from '@mui/icons-material/EditNote'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'


export default function AsynchRedux() {
	const { data, openAddCat } = useSelector(({ todoAsynch }) => todoAsynch)
	const [addNameCat, setAddNameCat] = useState('')
	const [addImageCat, setAddImageCat] = useState(null)
	const [addDescriptionCat, setAddDescriptionCat] = useState('')


	// edit
const [editNameCat,setEditNameCat]=useState('')
const [editDescriptionCat,setEditDescriptionCat]=useState('')
const[idx,setIdx]=useState(null)
const[openEditCat,setOpenEditCat]=useState(false)


const handleEditClickOpen = (row) => {
	setOpenEditCat(true)
	setEditNameCat(row.name)
	setEditDescriptionCat(row.description)
	setIdx(row.id)
	}

	const handleEdit=()=>{
		let newEditUser={
			id:idx,
			name:editNameCat,
			description:editDescriptionCat
		}
		dispatch(EditTodo(newEditUser))
	}

	const handleEditClose = () => {
		setOpenEditCat(false)
	}




	const dispatch = useDispatch()

	const handleAddClickOpen = () => {
		dispatch(setOpenAddСat(true))
	}

	const handleAddClose = () => {
		dispatch(setOpenAddСat(false))
	}

	function handleImageAdd(e){
setAddImageCat(e.target.files)

	}
	useEffect(() => {
		dispatch(getTodo())
	}, [])
	return (
		<>
			<div style={{ display: 'flex', justifyContent: 'space-around',alignItems:'center' }}>
				<h1>CreateAsynchThunk</h1>
					<Button variant='outlined' onClick={handleAddClickOpen}>
			+Add User
			</Button>
			</div>
			<TableContainer
				component={Paper}
				style={{ width: '90%', margin: '100px auto' }}
			>
				<Table sx={{ minWidth: 650 }} aria-label='simple table'>
					<TableHead>
						<TableRow>
							<TableCell>Id</TableCell>
							<TableCell align='center'>Image</TableCell>
<TableCell align='center'>Name</TableCell>
							<TableCell align='center'>Status</TableCell>
							<TableCell align='center'>Description</TableCell>
							<TableCell align='center'>Action</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{data.map(row => (
							<TableRow
								key={row.id}
								sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
							>
								<TableCell component='th' scope='row'>
									{row.id}
								</TableCell>
								<TableCell align='center'>
									{row.images.map(el => (
										<img
											key={el.id}
											src={`https://to-dos-api.softclub.tj/images/${el.imageName}`}
											alt=''
											style={{ width: '75px', borderRadius: '100px' }}
										/>
									))}
								</TableCell>
								<TableCell align='center'>{row.name}</TableCell>

								<TableCell align='center'>
									<span
										style={{
											color: row.isCompleted ? 'greenyellow' : 'red',
											fontSize: '20px',
										}}
									>
										{row.isCompleted == true ? 'Active' : 'Inactive'}
									</span>
								</TableCell>
								<TableCell align='center'>{row.description}</TableCell>
								<TableCell align='center'>
									<div
										style={{
											display: 'flex',
											justifyContent: 'center',
											gap: '10px',
										}}
									>
										<button onClick={() => dispatch(deletTodo(row.id))}>
											<BackspaceIcon style={{ color: 'red' }} />
										</button>
										<button onClick={()=>handleEditClickOpen(row)}>
											<EditNoteIcon style={{ color: 'violet' }} />
										</button>
										<input
											onClick={() => dispatch(completeTodo(row.id))}
											type='checkbox'
											checked={row.isCompleted}
										/>
									</div>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>

			{/* addModal */}

		
			<Dialog
				open={openAddCat}
				onClose={handleAddClose}
				slotProps={{
					paper: {
						component: 'form',
						onSubmit: event => {
							event.preventDefault()
							const formData = new FormData()
							formData.append('Name', addNameCat)
							formData.append('Description', addNameCat)
							formData.append('Name', addNameCat)
							for (let i = 0; i < addImageCat.length; i++) {
								formData.append('Images', addImageCat[i])
							}
							dispatch(AddTodo(formData))
							handleAddClose()
							setAddNameCat('')
							setAddDescriptionCat('')
							setAddImageCat('')
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
						label='Add Name'
						value={addNameCat}
						onChange={(e)=>setAddNameCat(e.target.value)}
						type='text'
						fullWidth
						variant='standard'
					/>
						<TextField
						autoFocus
						required
						margin='dense'
						id='name'
						value={addDescriptionCat}
						onChange={(e)=>setAddDescriptionCat(e.target.value)}
						name='email'
						label='Add Description'
						type='text'
						fullWidth
						variant='standard'
					/>
					<input type="file" onChange={handleImageAdd}/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleAddClose}>Cancel</Button>
					<Button type='submit'>Subscribe</Button>
				</DialogActions>
			</Dialog>
			
      <Dialog
        open={openEditCat}
        onClose={handleEditClose}
        slotProps={{
          paper: {
            component: 'form',
            onSubmit: (event) => {
              event.preventDefault();
              const formData = new FormData(event.currentTarget);
              const formJson = Object.fromEntries(formData.entries());
              const email = formJson.email;
              console.log(email);
              handleEditClose();
            },
          },
        }}
      >
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We
            will send updates occasionally.
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="email"
            label="edit Name"
            type="text"
				value={editNameCat}
				onChange={(e)=>setEditNameCat(e.target.value)}
            fullWidth
            variant="standard"
          />
			  <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="email"
            label="edit Name"
            type="text"
				value={editDescriptionCat}
				onChange={(e)=>setEditDescriptionCat(e.target.value)}
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose}>Cancel</Button>
          <Button type="submit" onClick={handleEdit}>Subscribe</Button>
        </DialogActions>
      </Dialog>
		</>
	)
}
