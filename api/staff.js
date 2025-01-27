let staffData = [
    { id: "alexane.diezrannou", name: "Alexane Diez Rannou", calls: 0, callsReached: 0, pq: 0 },
    { id: "anna.nguyen", name: "Anna Nguyen", calls: 0, callsReached: 0, pq: 0 },
    { id: "anne.chevreux", name: "Anne Chevreux", calls: 0, callsReached: 0, pq: 0 },
    { id: "carla.berlinches", name: "Carla Berlinches", calls: 0, callsReached: 0, pq: 0 },
    { id: "chloe.anselme", name: "Chloe Anselme", calls: 0, callsReached: 0, pq: 0 },
    { id: "emma.brault", name: "Emma Brault", calls: 0, callsReached: 0, pq: 0 },
    { id: "guilhem.coulon", name: "Guilhem Coulon", calls: 0, callsReached: 0, pq: 0 },
    { id: "ines.darhi", name: "Ines Darhi", calls: 0, callsReached: 0, pq: 0 },
    { id: "kathia.corrales", name: "Kathia Corrales", calls: 0, callsReached: 0, pq: 0 },
    { id: "leo.jaffrain", name: "Leo Jaffrain", calls: 0, callsReached: 0, pq: 0 },
    { id: "leonie.groebmueller", name: "Leonie Groebmueller", calls: 0, callsReached: 0, pq: 0 },
    { id: "leopaul.cazaudumec", name: "LeoPaul Cazaudumec", calls: 0, callsReached: 0, pq: 0 },
    { id: "maialen.roucheyrolle", name: "Maialen Roucheyrolle", calls: 0, callsReached: 0, pq: 0 },
    { id: "manon.gascogne", name: "Manon Gascogne", calls: 0, callsReached: 0, pq: 0 },
    { id: "marie.leger", name: "Marie Leger", calls: 0, callsReached: 0, pq: 0 },
    { id: "martin.vandenheede", name: "Martin Vandenheede", calls: 0, callsReached: 0, pq: 0 },
    { id: "miriana.migliozzi", name: "Miriana Migliozzi", calls: 0, callsReached: 0, pq: 0 },
    { id: "raphael.rigault", name: "Raphael Rigault", calls: 0, callsReached: 0, pq: 0 },
];

export default function handler(req, res) {
    if (req.method === "GET") {
        return res.status(200).json(staffData);
    } else if (req.method === "POST") {
        const { id, calls, callsReached, pq } = req.body;

        const user = staffData.find((s) => s.id === id);
        if (user) {
            if (calls !== undefined) user.calls = calls;
            if (callsReached !== undefined) user.callsReached = callsReached;
            if (pq !== undefined) user.pq = pq;
            return res.status(200).json({ message: "Stats updated successfully.", user });
        } else {
            return res.status(404).json({ message: "User not found." });
        }
    } else {
        return res.status(405).json({ message: "Method not allowed." });
    }
}
