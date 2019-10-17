const express = require("express")

const server=express();

server.use(express.json());

const projects=[];//[{id:0, title:"", tasks:[]}];

function checkProjectExist(req,res,next){
    const {id}=req.params;
    const projeto=projects.find(c=>c.id==id);
    if(!projeto){
      return res.status(400).json({'error':'project nao existe'});   
    }
    req.projeto=projeto;
    return next();
}

var totalRequisicoes=0;

server.use((req,res,next)=>{
    totalRequisicoes++;
    console.log(`Total de requisições:${totalRequisicoes}`)
    return next();
});

server.post("/projects",(req,res)=>{
    const {id}=req.body;
    const {title}=req.body;
    const {tasks}=req.body;
    projects.push({id,title,tasks});
    return res.json(projects)
});

server.post("/projects/:id/tasks",checkProjectExist,(req,res)=>{
    const {title}=req.body;
    req.projeto.tasks.push(title);
    return res.json(projects)
});

server.get("/projects",(req,res)=>{
    return res.json(projects)
});

server.put("/projects/:id",checkProjectExist,(req,res)=>{
     const {title}=req.body;
    req.projeto.title=title;
    return res.json(projects)
});

server.delete("/projects/:id",checkProjectExist,(req,res)=>{
    const index=projects.findIndex(c=>c.id==req.projeto.id);
    console.log(index)
    projects.splice(index,1);
    return res.json(projects)
});

server.listen(3000);