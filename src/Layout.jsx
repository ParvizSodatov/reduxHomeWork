import { Link, Outlet } from 'react-router'

export default function Layout(){
	return <>
	<div>
		<button>
			<Link to='/'>Synch</Link>
		</button>
		<button>
			<Link to='/CreateAsynchThunk'>CAT</Link>
		</button>
		<Outlet/>
	</div>
	</>

}