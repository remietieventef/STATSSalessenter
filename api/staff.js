// Simule une base de données en mémoire
let staffData = [
    { name: "Alexane Diez Rannou", calls: 0, callsReached: 0, pq: 0 },
    { name: "Anna Nguyen", calls: 0, callsReached: 0, pq: 0 },
    { name: "Anne Chevreux", calls: 0, callsReached: 0, pq: 0 },
    { name: "Carla Berlinches", calls: 0, callsReached: 0, pq: 0 },
    { name: "Chloe Anselme", calls: 0, callsReached: 0, pq: 0 },
    { name: "Emma Brault", calls: 0, callsReached: 0, pq: 0 },
    { name: "Guilhem Coulon", calls: 0, callsReached: 0, pq: 0 },
    { name: "Ines Darhi", calls: 0, callsReached: 0, pq: 0 },
    { name: "Kathia Corrales", calls: 0, callsReached: 0, pq: 0 },
    { name: "Leo Jaffrain", calls: 0, callsReached: 0, pq: 0 },
    { name: "Leonie Groebmueller", calls: 0, callsReached: 0, pq: 0 },
    { name: "LeoPaul Cazaudumec", calls: 0, callsReached: 0, pq: 0 },
    { name: "Maialen Roucheyrolle", calls: 0, callsReached: 0, pq: 0 },
    { name: "Manon Gascogne", calls: 0, callsReached: 0, pq: 0 },
    { name: "Marie Leger", calls: 0, callsReached: 0, pq: 0 },
    { name: "Martin Vandenheede", calls: 0, callsReached: 0, pq: 0 },
    { name: "Miriana Migliozzi", calls: 0, callsReached: 0, pq: 0 },
    { name: "Raphael Rigault", calls: 0, callsReached: 0, pq: 0 },
];

export default function handler(req, res) {
    if (req.method === "GET") {
        res.status(200).json(staffData);
    } else if (req.method === "POST") {
        const { name, calls, callsReached, pq } = req.body;
        const staff = staffData.find((s) => s.name === name);
        if (staff) {
            staff.calls = calls;
            staff.callsReached = callsReached;
            staff.pq = pq;
            res.status(200).json({ message: "Data updated successfully" });
        } else {
            res.status(404).json({ message: "Staff not found" });
        }
    } else {
        res.status(405).json({ message: "Method not allowed" });
    }
}


