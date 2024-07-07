import { useEffect, useState } from 'react'

import Navbar from './components/Navbar'

import {v4 as uuidv4} from 'uuid';


function App() {

  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [Finished, setFinished] = useState(true)

  useEffect(() => {
   let todostring=localStorage.getItem("todos")
   if(todostring){
     let todos=JSON.parse(localStorage.getItem("todos"));
     setTodos(todos)
   }
  }, [])
  
  function toggleFinish(){

  }

  const saveToLS=(params)=>{
    localStorage.setItem("todos",JSON.stringify(todos))
  }

  function handleAdd(){
    setTodos([...todos,{id:uuidv4(),todo,isCompleted:false}])
    setTodo("")
    saveToLS();
    
  }
  function handleDelete(e,id){
    // let id=e.target.name;
    let index=todos.findIndex(item=>{
      return item.id===id;
    })

    let newTodos=todos.filter(item=>{
      return item.id!==id;
    });
   
    setTodos(newTodos);
    saveToLS();
  }
  function handleEdit(e,id){
    let t=todos.filter(i=>i.id===id);
    setTodo(t[0].todo);
    let newTodos=todos.filter(item=>{
      return item.id!==id;
    })

    setTodos(newTodos);
    saveToLS();

  }
 
  function handleChange(e){
    setTodo(e.target.value);
   
  }
  function handleCheckbox(e){
    let id=e.target.name;
    let index=todos.findIndex(item=>{
      return item.id===id;
    })

    let newTodos=[...todos]; // we should give like this otherwise it cretes new object
    newTodos[index].isCompleted=!newTodos[index].isCompleted;
    setTodos(newTodos);
   
  }

  
 
  return (
    <>
     <Navbar/>
      <div className='container mx-auto my-5 rounded-xl  bg-violet-100 p-5  min-h-[80vh]'>
        
          <div className='addTodo my-5'>
               <h2 className='text-lg font-bold my-2'>Add a Todo</h2>
               <input onChange={handleChange} value={todo} type="text" className='w-1/2' placeholder='Enter your todo '></input>
               <button onClick={handleAdd} className='bg-violet-800 hover:bg-violet-950  p-2 py-1 text-sm font-bold text-white rounded-md mx-6'>Save</button>

          </div>
          <input type="checkbox" value={Finished}>Show Finished</input>
          <h2 className='text-lg font-bold'>Your Todos</h2>
          <div className='todos'>
            {todos.length===0 && <div className='m-5'>No Todos to display</div>}
            {todos.map(item=>{
            
              return(
                <div  className='todo flex w-1/4  justify-between my-5'>
                  <div className='flex gap-5'>
                  <input onChange={handleCheckbox} type='checkbox'value={item.isCompleted} name={item.id} id=""></input>
                  <div className={item.isCompleted? "line-through":""}>
                    {item.todo}
                  </div>
                    </div>
                  
                  <div className='buttons flex h-full'>
                    <button onClick={(e)=>{handleEdit(e,item.id)}} className='bg-violet-800 hover:bg-violet-950  p-2 py-1 text-sm font-bold text-white rounded-md mx-1'>Edit</button>
                    <button onClick={(e)=>{handleDelete(e,item.id)}}className='bg-violet-800 hover:bg-violet-950  p-2 py-1 text-sm font-bold text-white rounded-md mx-1'>Delete</button>
                  </div>
                </div>
              )
             })}
          </div>
        </div>
     
     

    </>
  )
}

export default App
