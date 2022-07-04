import { useContext, useEffect, useState } from 'react';
import {Card,Form,Button,Container,Row,Col,Modal} from 'react-bootstrap'
import axios from 'axios'
import { Store } from './Store';
import { FaEdit } from 'react-icons/fa';
import { RiDeleteBinLine } from 'react-icons/ri';
import { SiAddthis } from 'react-icons/si';
import { MdOutlineDoneOutline } from 'react-icons/md';


function App() {
  const {todoState,todoDispatch} = useContext(Store)
  
  const [todo, setTodo] = useState('')
  const [id, setId] = useState('')

  const [form, setForm] = useState(false)


  let handleTodo = async (e) =>{
    e.preventDefault()
    let {data} = await axios.post('/api/todo/data',{
      todo: todo
    })
  }

  useEffect(()=>{
    async function todo(){
      let {data} = await axios.get('/api/todo/getdata')
      todoDispatch({
        type: "TODOLIST",
        payload: data
      })
    }
    todo()
  },[])

  let handleDelete = async (id) =>{
    let {data} = await axios.post('/api/todo/delete',{
      id: id,
    })
  }

  let handleShow = async (id) =>{
    setForm(true)
    let {data} = await axios.get(`/api/todo/${id}`)
    setTodo(data.todo);
    setId(data._id)
    console.log(data);
  }

  let handleModalSubmit = async (e) =>{
    e.preventDefault()
    let {data} = await axios.put('/api/todo/edit',{
      id: id,
      todo: todo,
    })
  }

  return (
    <Container  style={{width: 800}}>
      <h2 className='textHeders'> 
        I did this project with <br/> 
        <span style={{color: "#02CADA"}}>React</span> {' '}
        <span style={{color: "#008E6E"}}>MongoDB</span>{' '}
        <span style={{color: "#F15E64"}}>Context-Api</span>
      </h2>
      <Card className='main' style={{height: 600, marginTop: 30}}>
        <h1 className='text-center mt-5'>To-Do</h1>
        <Card.Body className='body'>
          <Row>
            <Col lg={10}>
              <Form.Control 
                className='p-2 text'
                type="text" 
                placeholder="Add New To-Do" 
                onChange={(e)=> setTodo(e.target.value)}
              />
            </Col>

            <Col lg={2}>
              <Button 
                variant="primary"
                onClick={handleTodo}
              >
                <span className='icon'>
                  <SiAddthis/>
                </span>
              </Button>
            </Col>
          </Row>

          <div className='mt-3'>
            {todoState.todo && todoState.todo.map((item)=>(
              <Row>
                <Col lg={10}>
                  {form && 
                    item._id == id
                    ?
                    <Form>
                      <Form.Control 
                        className='p-1 mt-3 text'
                        style={{background: "#B0D5FC"}}
                        type="text" 
                        placeholder="Add New To-Do" 
                        onChange={(e)=> setTodo(e.target.value)}
                        value={todo}
                      /> 
                    </Form>
                      
                    :
                      <Card className=' mt-3 '>
                        <h5 className='text'>{item.todo}</h5>
                      </Card>
                  }
                </Col>

                <Col lg={2}>
                  {form &&
                    item._id == id
                    ?
                      <Button 
                      variant="info"
                      className='mt-3 p-2 textBtnSubmit'
                        onClick={handleModalSubmit}
                      >
                        Submit
                      </Button>
                    :
                      <>
                        <Button 
                          variant="success"
                          className='mt-3 p-2'
                          onClick={()=> handleShow(item._id)}
                        >
                          <span className='textBtn'>
                            <FaEdit/>
                          </span>
                          
                        </Button>

                        <Button 
                          variant="danger"
                          className='mt-3 p-2 ms-2'
                          onClick={()=>handleDelete(item._id)}
                        >
                          <span className='textBtn'>
                            <RiDeleteBinLine/>
                          </span>
                        </Button>
                      </>
                  }
                </Col>
                <br/>
              </Row>
            ))} 
          </div>
         
        </Card.Body>
      </Card>
    </Container>
  );
}

export default App;