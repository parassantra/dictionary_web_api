const mongoose = require("mongoose");

const definitionSchema = require("./schemas/msc-definition")
const termsEnglishSchema = require("./schemas/msc-termsEnglish")
const termsOtherSchema = require("./schemas/msc-termsOther")

var Schema = mongoose.Schema;

var definition = mongoose.model
("Definition", definitionSchema, "Definition");

var termsEnglish = mongoose.model
("TermsEnglish", termsEnglishSchema, "TermsEnglish");

var termsOther = mongoose.model
("TermsOther", termsOtherSchema, "TermsOther");

const initDBConnection =()=>
{
    return new Promise((resolve, reject)=>{
             mongoose.connect("mongodb+srv://admin:Prettym3@cluster0-kvhsk.mongodb.net/db-a2?retryWrites=true&w=majority",
            {
                useNewUrlParser: true,
                useUnifiedTopology: true
            }).then((data)=>{
                resolve("Connection to MongoDB is successful!!!");
            }
            ).catch((error)=>{
                reject(error);
            })
    })
}

// ~~~~~~~~~~~~~~~~~ English Terms ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

const getAllEnglishTerms = () =>{
    return new Promise((resolve,reject) =>{
        termsEnglish.find()
            .sort({ wordEnglish: 'asc'})
            .exec((error, items) => {
                if (error) {
                  return reject(error.message);
                }
                return resolve(items);
              });
    })
    
}

const getAllEnglishTermsByWord = (word) =>{
    return new Promise((resolve,reject) =>{
    
        termsEnglish.find()
            .sort({ wordEnglish: 'asc'})
            .exec((error, items) => {
                if (error) {
                  return reject(error.message);
                }   
            return resolve( items.filter(item => item.wordEnglish.toUpperCase().startsWith(word.toUpperCase())));
        });
    })   
}

const findEnglishTermsByWord = (word) =>{
    return new Promise((resolve, reject)=>{
        if(word){
            termsEnglish.findOne({wordEnglish : word}).then((data)=>{
                    resolve(data);
            }).catch((err)=>{
                reject(err);
            });  
        }
     });
}


const findEnglishTermsById = (id) =>{
    return new Promise ((resolve, reject)=>{
        if(id){
            termsEnglish.findById(id).then((data)=>{
                resolve(data);
            }).catch((err)=>{
                reject(err);
            });
        } 
     });   
}

 const addEnglishTerms = (newWord) =>{
    return new Promise((resolve, reject) => {
        termsEnglish.create(newWord).then((data)=>{
            resolve(data);
        }).catch((err)=>{
            reject(err);
        })
    })   
}

const updateEnglishTerms = (word) => {
    return new Promise((resolve, reject) =>{
        termsEnglish.findByIdAndUpdate(word._id, word, { new: true }).then((data)=>{
            resolve(data);
        }).catch((err)=>{reject(err)})
     })
}

const removeEnglishTerms = (id) => {
    return new Promise((resolve, reject)=>{
        termsEnglish.findByIdAndDelete(id).then((data)=>{
            resolve(data);
        }).catch((err)=>{
            reject(err);
        })

    })
}

const incrmentHelpYesEnglish = (id)=>{
    return new Promise((resolve, reject)=>{
        findEnglishTermsById(id).then((word)=>{
            word.helpYes++;
            updateEnglishTerms(word).then((data)=>{
                resolve(data);
            }).catch((err)=>{
                reject(err);
            })
        })
    })
}

const incrmentHelpNoEnglish = (id)=>{
    return new Promise((resolve, reject)=>{
        findEnglishTermsById(id).then((word)=>{
            word.helpNo++;
            updateEnglishTerms(word).then((data)=>{
                resolve(data);
            }).catch((err)=>{
                reject(err);
            })
        })
    })
}

const addEnglishDefinition = (newDefn, termId)=>{
    
    return new Promise((resolve, reject)=>{
        findEnglishTermsById(termId).then((term)=>{
            if (term === null){
                reject("Id does not exist, thus defintiion to term cannot be added");
            }
            else{
                console.log(newDefn);
               term.definitions.push(newDefn);
               updateEnglishTerms(term).then((data)=>{resolve(data)}).catch((err)=>{reject(err)})
            }
        }).catch((err)=>{reject(err)});
    })
}

const incrementLikesOnEnglishDefinition = async (defId) => {
    let term = await termsEnglish.findOne({ "definitions._id": defId });
    if (term) {
      let def = term.definitions.id(defId);
      def.likes++;
      await term.save();
      return term;
    }
    else {
      throw "Not found";
    }
  }
    
// ~~~~~~~~~~~~~~~~~ Non English Terms ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const getAllNonEnglishTerms = () =>{
    return new Promise((resolve,reject) =>{
        termsOther.find()
            .limit(20)
            .sort({ wordEnglish: 'asc'})
            .exec((error, items) => {
                if (error) {
                  return reject(error.message);
                }
                return resolve(items);
              });
    })
    
}

const findNonEnglishTermsByWord = (word) =>{
    return new Promise((resolve, reject)=>{
        if(word){
            termsOther.findOne({wordNonEnglish : word}).then((data)=>{
                    resolve(data);
            }).catch((err)=>{
                reject(err);
            });  
        }
     });
}

const findNonEnglishTermsById = (id) =>{
    return new Promise ((resolve, reject)=>{
        if(id){
            termsOther.findById(id).then((data)=>{
                resolve(data);
            }).catch((err)=>{
                reject(err);
            });
        } 
     });   
}

const addNonEnglishTerms = (newWord) =>{
    return new Promise((resolve, reject) => {
        termsOther.create(newWord).then((data)=>{
            resolve(data);
        }).catch((err)=>{
            reject(err);
        })
    })   
}

const updateNonEnglishTerms = (word) => {
    return new Promise((resolve, reject) =>{
        termsOther.findByIdAndUpdate(word._id, word, { new: true }).then((data)=>{
            resolve(data);
        }).catch((err)=>{reject(err)})
     })
}

const removeNonEnglishTerms = (id) => {
    return new Promise((resolve, reject)=>{
        termsOther.findByIdAndDelete(id).then((data)=>{
            resolve(data);
        }).catch((err)=>{
            reject(err);
        })

    })
}

const incrmentHelpYesNonEnglish = (id)=>{
    return new Promise((resolve, reject)=>{
        findNonEnglishTermsById(id).then((word)=>{
            word.helpYes++;
            updateNonEnglishTerms(word).then((data)=>{
                resolve(data);
            }).catch((err)=>{
                reject(err);
            })
        })
    })
}

const incrmentHelpNoNonEnglish = (id)=>{
    return new Promise((resolve, reject)=>{
        findNonEnglishTermsById(id).then((word)=>{
            console.log(word)
            word.helpNo++;
            console.log(word.helpNo)
            updateNonEnglishTerms(word).then((data)=>{
                resolve(data);
            }).catch((err)=>{
                reject(err);
            })
        })
    })
}

const addNonEnglishDefinition = (newDefn, termId)=>{
    return new Promise((resolve, reject)=>{
       findNonEnglishTermsById(termId).then((term)=>{
            if (term === null){
                reject("Id does not exist, thus defintiion to term cannot be added");
            }
            else{
               term.definitions.push(newDefn);
               updateNonEnglishTerms(term).then((data)=>{resolve(data)}).catch((err)=>{reject(err)})
            }
        }).catch((err)=>{reject(err)});
    })
}
const incrementLikesOnNonEnglishDefinition = async (defId) => {
    let term = await termsOther.findOne({ "definitions._id": defId });
    if (term) {
      let def = term.definitions.id(defId);
      def.likes++;
      await term.save();
      return term;
    }
    else {
      throw "Not found";
    }
  }
  
const getAllOtherTermsByEnglishId = (id) =>{
    return new Promise((resolve,reject) =>{
        termsOther.find({termEnglishId : id})
            .sort({ wordEnglish: 'asc'})
            .exec((error, items) => {
                if (error) {
                  return reject(error.message);
                }   
            return resolve( items);
        });
    })   
}

module.exports = {
    initDBConnection,
    getAllEnglishTerms,
    findEnglishTermsByWord,
    findEnglishTermsById,
    addEnglishTerms,
    updateEnglishTerms,
    removeEnglishTerms,
    incrmentHelpNoEnglish,
    incrmentHelpYesEnglish,
    addEnglishDefinition,
    incrementLikesOnEnglishDefinition,
    getAllNonEnglishTerms,
    findNonEnglishTermsByWord,
    findNonEnglishTermsById,
    addNonEnglishTerms,
    updateNonEnglishTerms,
    removeNonEnglishTerms,
    incrmentHelpNoNonEnglish,
    incrmentHelpYesNonEnglish,
    addNonEnglishDefinition,
    incrementLikesOnNonEnglishDefinition,
    getAllEnglishTermsByWord,
    getAllOtherTermsByEnglishId
}