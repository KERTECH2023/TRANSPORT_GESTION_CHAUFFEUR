const Reclamation = require ("../Models/Reclamation")
const Agent   = require('../Models/Agent')
const Chauffeur   = require('../Models/Chauffeur')
const Client   = require('../Models/Client')



exports.add = async (req, res) => {
    const {titre, daterec, objectrec,agent} = req.body

 

    let reclamation = await new Reclamation({
        titre,
        daterec,
        objectrec,
        status:"En_cours",
        agent,
        isActive : true,
    }).save()

    return res.status(200).send({message: "Reclamation added successfully", reclamation});
}

exports.adds = async (req, res) => {
    const { titre, daterec, objectrec, agent, CiN } = req.body;

    let submitter;
    let role;

    // Look up the submitter by CiN in either the Chauffeur or Client collection
    const chauffeur = await Chauffeur.findOne({ cnicNo: CiN });
    const client = await Client.findOne({ cnicNo: CiN });

    console.log("chauffeur:", chauffeur);
    console.log("client:", client);

    // If neither a chauffeur nor a client was found, return an error response
    if (!chauffeur && !client) {
        return res.status(404).send({ message: "No submitter found with the provided CiN" });
    }

    // Determine the submitter's role and set the submitter variable accordingly
    if (chauffeur) {
        submitter = chauffeur;
        role = "Chauffeur";
    } else {
        submitter = client;
        role = "Client";
    }
    const numrec = Math.floor(Math.random() * 1000000);
    console.log(numrec)
    // Create the new Reclamation object
    let reclamation = await new Reclamation({
        NumRec: numrec,
        titre,
        daterec,
        objectrec,
        status: "En_cours",
        agent,
        CiN,
        nom: submitter.Nom,
        prenom: submitter.Prenom,
        phone: submitter.phone,
        role,
        isActive: true,
    }).save();

    return res.status(200).send({ message: "Reclamation added successfully", reclamation });
}


// exports.getAll = async (req, res) => {
//     res.send({rec: await Reclamation.find()})
// }


exports.getAll = async (req, res) => {
    try {
      const reclamations = await Reclamation.find().lean();
      const reclamationsWithAgentNames = await Promise.all(
        reclamations.map(async (reclamation) => {
          const { _id, ...rest } = reclamation;
          const agent = await Agent.findById(reclamation.agent);
          const reclamationWithAgentName = {
            id: _id ? _id.toString() : null,
            ...rest,
            agentName: agent ? `${agent.Nom} ${agent.Prenom}` : "Unknown Agent",
          };
          return reclamationWithAgentName;
        })
      );
      res.send( reclamationsWithAgentNames );
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: "Internal server error" });
    }
  };

  
  
  exports.getAllbyagent = async (req, res) => {
    try {
      const reclamations = await Reclamation.find({agent: req.params.agent}).lean();
      const reclamationsWithAgentNames = await Promise.all(
        reclamations.map(async (reclamation) => {
          const { _id, ...rest } = reclamation;
          const agent = await Agent.findById(reclamation.agent);
          const reclamationWithAgentName = {
            id: _id ? _id.toString() : null,
            ...rest,
            agentName: agent ? `${agent.Nom} ${agent.Prenom}` : "Unknown Agent",
          };
          return reclamationWithAgentName;
        })
      );
      res.send( reclamationsWithAgentNames );
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: "Internal server error" });
    }
  };
  
  

exports.getByUser = async (req, res) => {
    res.send({
        rec: await Reclamation.find({agent: req.params.agent})
            
    })
}


exports.recuprec = async (req, res, data) => {
    Reclamation.find({ isActive: true, agent: req.params.agent }, (err, data) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.json(data);
        console.log(data);
      }
    });
  };
  
  exports.recuprecF = async (req, res, data) => {
    Reclamation.find({ isActive: false, agent: req.params.agent }, (err, data) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.json(data);
        console.log(data);
      }
    });
  };

  exports.searchrec = async(req,res) => {
    const id = req.params.id;
    Reclamation.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Reclamation introuvable pour id " + id });
        else res.send(data);
        console.log(data)
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Erreur recuperation Reclamation avec id=" + id });
      });

      
  }

  exports.updatestatus = async (req, res, next) => {
    const { id } = req.params;
  
    try {
      const ReclamationUpdated = await Reclamation.findByIdAndUpdate(
        id,
        { $set: { isActive: false, status: "terminé" } },
        { new: true }
      );
      console.log(ReclamationUpdated);
  
      return res.status(200).send({
        message: "Reclamation was updated successfully!",
      });
    } catch (error) {
      return res.status(500).send({ err: error });
    }
  };
  
