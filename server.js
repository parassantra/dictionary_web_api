const express = require("express");
const api = require("./api.json");
const bodyParser = require("body-parser");
const cors = require("cors");
const dataServices = require("./data-services")
var app = express();
app.use(bodyParser.json());
app.use(cors());
var HTTP_PORT = process.env.PORT || 8080;

const onHttpStart = ()=>
{
    dataServices.initDBConnection().then((msg)=>{
        console.log(msg);
        console.log("Server started on port " +  HTTP_PORT);
    }).catch((err)=>{
        console.log("Error: " + err);
    });
    
}

app.get("/", (req, res)=>{
    res.redirect('/api');
})

app.get("/api", (req, res)=>{
    res.send(api);
})

//get all English Terms
app.get("/terms/english",(req, res)=>{
    dataServices.getAllEnglishTerms().then((data)=>{
        res.status(200).json(data);
    }).catch((err)=>{
        res.status(500).send("Error: "+ err);
    })
})


//get English terms by word
app.get("/terms/english/:word", (req, res)=>{
    dataServices.getAllEnglishTermsByWord(req.params.word).then((data)=>{
        res.json(data);
    }).catch((err)=>{
        res.status(404).send("Error: " + err);
    })
})

//get English terms by id
app.get("/term/english/:id", (req, res)=>{
    dataServices.findEnglishTermsById(req.params.id).then((data)=>{
        res.json(data);
    }).catch((err)=>{
        res.status(404).send("Error: " + err);
    })
})

//get English terms by word
app.get("/term/english/:word", (req, res)=>{
    dataServices.findEnglishTermsByWord(req.params.word).then((data)=>{
        res.json(data);
    }).catch((err)=>{
        res.status(404).send("Error: " + err);
    })
})

//get Non-English terms 
app.get("/terms/other",(req, res)=>{
    dataServices.getAllNonEnglishTerms(req.body).then((data)=>{
        res.status(200).json(data);
    }).catch((err)=>{
        res.status(500).send("Error: "+ err);
    })
})

//get All Non-English terms by id
app.get("/terms/other/:id", (req, res)=>{
    dataServices.getAllOtherTermsByEnglishId(req.params.id).then((data)=>{
        res.json(data);
    }).catch((err)=>{
        res.status(404).send("Error: " + err);
    })
})

//get Non-English terms by id
app.get("/term/other/:id", (req, res)=>{
    dataServices.findNonEnglishTermsById(req.params.id).then((data)=>{
        res.json(data);
    }).catch((err)=>{
        res.status(404).send("Error: " + err);
    })
})

//Add English terms
app.post("/terms/english",(req, res)=>{
    dataServices.addEnglishTerms(req.body).then((data)=>{
        res.status(200).json(data);
    }).catch((err)=>{
        res.status(500).send("Error: "+ err);
    })
})

//Add Non-English terms
app.post("/terms/other",(req, res)=>{
    dataServices.addNonEnglishTerms(req.body).then((data)=>{
        res.status(200).json(data);
    }).catch((err)=>{
        res.status(500).send("Error: "+ err);
    })
})


//add definition for English terms by id
app.put("/terms/english/:id/add-definition", (req, res)=>{
    dataServices.addEnglishDefinition(req.body,req.params.id).then((data)=>{
        res.status(200).json(data);
    }).catch((err)=>{
        res.status(500).send("Error: " + err);
    })
})

//add definition for non-English terms by id
app.put("/terms/other/:id/add-definition", (req, res)=>{
    dataServices.addNonEnglishDefinition(req.body,req.params.id).then((data)=>{
        console.log(req.body)
        res.status(200).json(data);
    }).catch((err)=>{
        res.status(500).send("Error: " + err);
    })
})

//increment English term's "helpYes" counter
app.put("/terms/english/helpYes/:id", (req, res)=>{
    dataServices.incrmentHelpYesEnglish(req.params.id).then((data)=>{
        res.status(200).json(data);
    }).catch((err)=>{
        res.status(500).send("Error: " + err);
    })
})

//increment a non English term's "helpYes" counter
app.put("/terms/other/helpYes/:id", (req, res)=>{
    dataServices.incrmentHelpYesNonEnglish(req.params.id).then((data)=>{
        res.status(200).json(data);
    }).catch((err)=>{
        res.status(500).send("Error: " + err);
    })
})

//increment a term's "helpNo" counter
app.put("/terms/english/helpNo/:id", (req, res)=>{
    dataServices.incrmentHelpNoEnglish(req.params.id).then((data)=>{
        res.status(200).json(data);
    }).catch((err)=>{
        res.status(500).send("Error: " + err);
    })
})

//increment non-English term's "helpNo" counter
app.put("/terms/other/helpNo/:id", (req, res)=>{
    dataServices.incrmentHelpNoNonEnglish(req.params.id).then((data)=>{
        res.status(200).json(data);
    }).catch((err)=>{
        res.status(500).send("Error: " + err);
    })
})

//increment English term definition's "likes" counter
app.put("/terms/english/definition-like/:id", (req, res)=>{
    dataServices.incrementLikesOnEnglishDefinition(req.params.id).then((data)=>{
        res.status(200).json(data);
    }).catch((err)=>{
        res.status(500).send("Error: " + err);
    })
})

//increment Non-English term definition's "likes" counter
app.put("/terms/other/definition-like/:id", (req, res)=>{
    dataServices.incrementLikesOnNonEnglishDefinition(req.params.id).then((data)=>{
        res.status(200).json(data);
    }).catch((err)=>{
        res.status(500).send("Error: " + err);
    })
})

app.listen(HTTP_PORT, onHttpStart);