import './App.css';
import {
BrowserRouter as Router, Route, Routes
} from "react-router-dom";
import { Navbar } from './components/Navbar';
import { About } from './components/About';
import { Home } from './components/Home';
import NoteState from './context/Notes/NoteState';

function App() {
return (<>
<NoteState>
<Router >
<Navbar/> 
<div className='container'>
<Routes>
<Route  exact path="/" element={<Home/>}/>
<Route  exact path="/about" element={<About/>}/>
 </Routes>
 </div>
</Router>
</NoteState>
  </>
);
}

export default App;
