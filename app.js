import express from 'express'
import fs from 'fs';

const port = 5000;
const app = express();
app.use(express.json());
const data = JSON.parse(fs.readFileSync('./Natours/dev-data/data/tours-simple.json'));


const getAllTours = (req,res)=>{

    res.status(200).json({
        status :"success",
        data : {
            tours : data
        }
    })
}

const getTour = (req,res)=>{

    const id = req.params.id * 1 ;
    const tour = data.find(el => el.id === id);
    if(!tour){
        return res.status(404).json({
            status : "Fail",
            message : "Invalid Id"
        })
    }
    else{
        return res.status(200).json({
            status :"success",
            data : {
                tours : tour
            }
        }) 
    }
}

const createTour = (req,res)=>{
    const newId = data[data.length -1].id+1;
    const newTour = Object.assign({id : newId},req.body);
    data.push(newTour);
    fs.writeFile('./dev-data/data/tours-simple.json',JSON.stringify(data),(err)=>{
        if(!err){
            res.status(201).json({
                status : "success",
                tour : newTour
            })
        }
    })
}

const updateTour = (req,res)=>{
    const id = req.params.id * 1;
    if(id <= data.length ){
        res.status(200).json({
            status : "success",
            data : "Updated Data"
        })
    }
    else{
        return res.status(404).json({
            status : "Fail",
            message : "Invalid Id"
        })
    }
}

const deleteTour = (req,res)=>{
    const id = req.params.id * 1;
    if(id <= data.length ){
        res.status(204).json({
            status : "success",
            data : null
        })
    }
    else{
        return res.status(404).json({
            status : "Fail",
            message : "Invalid Id"
        })
    }
}

// app.get('/api/v1/tours',getAllTours);
// app.get('/api/v1/tours/:id',getTour);
// app.post('/api/v1/tours',createTour);
// app.patch('/api/v1/tours/:id',updateTour);
// app.delete('/api/v1/tours/:id',deleteTour);

app.route('/api/v1/tours').get(getAllTours).post(createTour);

app.route('/api/v1/tours/:id').get(getTour).patch(updateTour).delete(deleteTour);

app.listen(port,()=>{
    console.log(`appmis running ${port}`)
});