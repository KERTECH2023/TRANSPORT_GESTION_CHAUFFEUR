const mongoose = require('mongoose');
const cron = require('node-cron');
const RideRequest = require('../Models/AllRideRequest');
const Facture = require('../Models/Facture');
// MongoDB connection


// Define the aggregation pipeline
const aggregationPipeline = [
    {
        $lookup: {
            from: 'chauffeurs',
            localField: 'driverPhone',
            foreignField: 'phone',
            as: 'driverInfo'
        }
    },
    {
        $unwind: '$driverInfo'
    },
    {
        $addFields: {
            timestamp: {
                $toDate: '$time' // Changed $convert to $toDate for simplicity
            }
        }
    },
    {
        $addFields: {
            year: { $year: '$timestamp' },
            month: { $month: '$timestamp' }
        }
    },
    {
        $group: {
            _id: {
                driverPhone: '$driverPhone',
                driverId: '$driverInfo._id',
                year: '$year',
                month: '$month'
            },
            totalFareAmount: { $sum: '$fareAmount' },
            nbretrajet: { $sum: 1 }
        }
    },
    {
        $project: {
            driverPhone: '$_id.driverPhone',
            chauffeur: '$_id.driverId',
            Year: '$_id.year',
            Month: '$_id.month',
            totalFareAmount: 1,
            nbretrajet: 1,
            payd: { $literal: false },
            _id: 0,
            montantTva: { $multiply: ['$totalFareAmount', 0.05] }, // Calculating 5% of montant for montantTva
        }
    }
];

// Function to run aggregation and update Facture
async function runAggregation() {
  try {
      const result = await RideRequest.aggregate(aggregationPipeline);

      const factures = result.map(data => {
          const { chauffeur, Year, Month, totalFareAmount, nbretrajet, montantTva } = data;
          return {
              chauffeur,
              Year,
              Month,
              totalFareAmount,
              nbretrajet,
              montantTva,
              payd: false
          };
      });

      await Facture.insertMany(factures);

      console.log('Factures inserted successfully:', factures);
  } catch (error) {
      console.error('Error while aggregating and inserting data:', error);
  }
}

// Schedule the aggregation to run at the start of each month
cron.schedule('0 0 1 * *', () => {
    console.log('Running monthly aggregation...');
    runAggregation();
});

console.log('Scheduled monthly aggregation job.');

const saveRide = async (req, res) => {
    try {
        const {
            HealthStatus,
            
            destination,
            
            driverLocation,
            fareAmount,
            driverName,
            driverPhone,
            source,
            status,
            time,
            userName,
            userPhone,
        } = req.body;

        // Créer une nouvelle instance de RideRequest
        const newRideRequest = new RideRequest({
            HealthStatus: HealthStatus,
            destination: {
                latitude: destination.latitude,
                longitude: destination.longitude
            },
            driverLocationData: {
                latitude: driverLocation.latitude,
                longitude: driverLocation.longitude
            },
            fareAmount: fareAmount,
            driverPhone: driverPhone,
            source: {
                latitude: source.latitude,
                longitude: source.longitude
            },
            status: status,
            time: time,
            userName: userName,
            userPhone: userPhone
        });

        // Sauvegarder la demande de trajet dans la base de données
        await newRideRequest.save();

        res.status(201).json({ message: 'Demande de trajet sauvegardée avec succès.' });
    } catch (error) {
        console.error('Erreur lors de la sauvegarde de la demande de trajet :', error);
        res.status(500).json({ message: 'Erreur lors de la sauvegarde de la demande de trajet.' });
    }
};

  // const getfact = (req, res) => {
  //   RideRequest.aggregate(pipeline, (err, data) => {
  //     if (err) {
  //       res.status(500).send("Error during aggregation");
  //     } else {
  //       const factures = data.map((entry) => {
  //         return new Facture({
  //           chauffeur:entry.driverPhone,
  //           date: new Date(entry.time[0]), // assuming time is an array of dates
  //           montant: entry.totalFareAmount,
  //           description: "",
  //           isPaid: false,
  //         });
  //       });
  //       res.send(factures);
  //       console.log(factures);
  //     }
  //   });
  // };
  // Execute the aggregation pipeline
  // const result =  RideRequest.aggregate(pipeline)
  // console.log(result);

module.exports = { saveRide,runAggregation };
