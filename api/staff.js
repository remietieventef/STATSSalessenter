let staffData = [
    { id: "alexane.diezrannou", name: "Alexane Diez Rannou", weeklyStats: [] },
    { id: "anna.nguyen", name: "Anna Nguyen", weeklyStats: [] },
    { id: "anne.chevreux", name: "Anne Chevreux", weeklyStats: [] },
    { id: "carla.berlinches", name: "Carla Berlinches", weeklyStats: [] },
    { id: "chloe.anselme", name: "Chloe Anselme", weeklyStats: [] },
    { id: "emma.brault", name: "Emma Brault", weeklyStats: [] },
    { id: "guilhem.coulon", name: "Guilhem Coulon", weeklyStats: [] },
    { id: "ines.darhi", name: "Ines Darhi", weeklyStats: [] },
    { id: "kathia.corrales", name: "Kathia Corrales", weeklyStats: [] },
    { id: "leo.jaffrain", name: "Leo Jaffrain", weeklyStats: [] },
    { id: "leonie.groebmueller", name: "Leonie Groebmueller", weeklyStats: [] },
    { id: "leopaul.cazaudumec", name: "LeoPaul Cazaudumec", weeklyStats: [] },
    { id: "maialen.roucheyrolle", name: "Maialen Roucheyrolle", weeklyStats: [] },
    { id: "manon.gascogne", name: "Manon Gascogne", weeklyStats: [] },
    { id: "marie.leger", name: "Marie Leger", weeklyStats: [] },
    { id: "martin.vandenheede", name: "Martin Vandenheede", weeklyStats: [] },
    { id: "miriana.migliozzi", name: "Miriana Migliozzi", weeklyStats: [] },
    { id: "raphael.rigault", name: "Raphael Rigault", weeklyStats: [] },
];

const WEEKLY_STORAGE = []; // Pour stocker les tableaux de chaque semaine

function getCurrentDate() {
    const today = new Date();
    return today.toISOString().split("T")[0]; // Format YYYY-MM-DD
}

function isMonday() {
    const today = new Date();
    return today.getDay() === 1; // Lundi
}

export default function handler(req, res) {
    if (req.method === "GET") {
        // Si c'est un lundi, démarrer une nouvelle semaine
        if (isMonday()) {
            const currentWeekData = JSON.parse(JSON.stringify(staffData));
            WEEKLY_STORAGE.push(currentWeekData);

            // Réinitialiser les données pour la nouvelle semaine
            staffData.forEach((staff) => {
                staff.weeklyStats = [];
            });
        }

        return res.status(200).json(staffData);
    }

    if (req.method === "POST") {
        const { id, calls, callsReached, pq } = req.body;
        const user = staffData.find((s) => s.id === id);

        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        const today = getCurrentDate();

        // Vérifier si une entrée pour aujourd'hui existe déjà
        const existingEntry = user.weeklyStats.find((stat) => stat.date === today);

        if (existingEntry) {
            // Mettre à jour les statistiques du jour
            existingEntry.calls = calls;
            existingEntry.callsReached = callsReached;
            existingEntry.pq = pq;
        } else {
            // Ajouter une nouvelle entrée pour aujourd'hui
            user.weeklyStats.push({
                date: today,
                calls,
                callsReached,
                pq,
            });
        }

        return res.status(200).json({ message: "Statistics updated successfully.", user });
    }

    return res.status(405).json({ message: "Method not allowed." });
}
